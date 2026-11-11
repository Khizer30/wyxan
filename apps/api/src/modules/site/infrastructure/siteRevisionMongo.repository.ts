import { SiteRevisionRepository } from "@modules/site/domain/site.repository";
import { SiteRevisionEntity } from "@modules/site/domain/siteRevision.entity";
import { SiteRevisionMapper } from "@modules/site/infrastructure/site.mapper";
import { SiteRevisionModel } from "@modules/site/infrastructure/siteRevision.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class SiteRevisionMongoRepository extends SiteRevisionRepository {
  constructor(@InjectModel(SiteRevisionModel.name) private readonly revisionModel: Model<SiteRevisionModel>) {
    super();
  }

  async findById(id: string): Promise<SiteRevisionEntity | null> {
    const doc = await this.revisionModel.findById(id).lean();
    return doc ? SiteRevisionMapper.toDomain(doc) : null;
  }

  async findByIds(ids: string[]): Promise<SiteRevisionEntity[]> {
    const docs = await this.revisionModel.find({ _id: { $in: ids } }).lean();
    return docs.map((doc) => SiteRevisionMapper.toDomain(doc));
  }

  async findLatestVersion(siteId: string): Promise<number> {
    const doc = await this.revisionModel.findOne({ siteId }).sort({ version: -1 }).select({ version: 1 }).lean();
    return doc?.version ?? 0;
  }
}
