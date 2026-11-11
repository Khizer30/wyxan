import { isDuplicateKeyError } from "@common/mongo";
import { SiteEntity } from "@modules/site/domain/site.entity";
import { SiteAlreadyExistsError } from "@modules/site/domain/site.errors";
import { SearchHit, SiteRepository } from "@modules/site/domain/site.repository";
import { SiteRevisionEntity } from "@modules/site/domain/siteRevision.entity";
import { SiteMapper, SiteRevisionMapper } from "@modules/site/infrastructure/site.mapper";
import { SiteModel } from "@modules/site/infrastructure/site.model";
import { SiteRevisionModel } from "@modules/site/infrastructure/siteRevision.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class SiteMongoRepository extends SiteRepository {
  constructor(
    @InjectModel(SiteModel.name) private readonly siteModel: Model<SiteModel>,
    @InjectModel(SiteRevisionModel.name) private readonly revisionModel: Model<SiteRevisionModel>
  ) {
    super();
  }

  async findById(id: string): Promise<SiteEntity | null> {
    const doc = await this.siteModel.findById(id).lean();
    return doc ? SiteMapper.toDomain(doc) : null;
  }

  async findByAddress(address: string): Promise<SiteEntity | null> {
    const doc = await this.siteModel.findOne({ address }).lean();
    return doc ? SiteMapper.toDomain(doc) : null;
  }

  async listByAuthor(authorId: string): Promise<SiteEntity[]> {
    const docs = await this.siteModel.find({ authorId }).sort({ address: 1 }).lean();
    return docs.map((doc) => SiteMapper.toDomain(doc));
  }

  async search(query: string, limit: number): Promise<SearchHit[]> {
    const docs = await this.siteModel
      .find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .limit(limit)
      .lean();

    return docs.map((doc) => ({ site: SiteMapper.toDomain(doc), score: (doc as unknown as { score: number }).score }));
  }

  async publishRevision(site: SiteEntity, revision: SiteRevisionEntity): Promise<SiteEntity> {
    try {
      await this.revisionModel.create(SiteRevisionMapper.toPersistence(revision));
      const { _id, ...fields } = SiteMapper.toPersistence(site);
      const doc = await this.siteModel.findOneAndUpdate({ _id }, { $set: fields }, { upsert: true, new: true }).lean();
      return SiteMapper.toDomain(doc);
    } catch (error) {
      if (isDuplicateKeyError(error)) {
        throw new SiteAlreadyExistsError({ address: site.address });
      }
      throw error;
    }
  }
}
