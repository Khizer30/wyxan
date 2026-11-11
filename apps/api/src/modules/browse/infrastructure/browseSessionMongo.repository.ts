import { isDuplicateKeyError } from "@common/mongo";
import { StaleSessionError } from "@modules/browse/domain/browse.errors";
import { BrowseSessionEntity } from "@modules/browse/domain/browseSession.entity";
import { BrowseSessionRepository } from "@modules/browse/domain/browseSession.repository";
import { BrowseSessionMapper } from "@modules/browse/infrastructure/browseSession.mapper";
import { BrowseSessionModel } from "@modules/browse/infrastructure/browseSession.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class BrowseSessionMongoRepository extends BrowseSessionRepository {
  constructor(@InjectModel(BrowseSessionModel.name) private readonly sessionModel: Model<BrowseSessionModel>) {
    super();
  }

  async findByPerson(personId: string): Promise<BrowseSessionEntity | null> {
    const doc = await this.sessionModel.findOne({ personId }).lean();
    return doc ? BrowseSessionMapper.toDomain(doc) : null;
  }

  async save(next: BrowseSessionEntity, expectedVersion: number): Promise<BrowseSessionEntity> {
    const { _id, ...fields } = BrowseSessionMapper.toPersistence(next);

    if (expectedVersion === 0) {
      try {
        await this.sessionModel.create({ _id, ...fields });
        return next;
      } catch (error) {
        if (isDuplicateKeyError(error)) {
          throw new StaleSessionError({ personId: next.personId });
        }
        throw error;
      }
    }

    const doc = await this.sessionModel.findOneAndUpdate({ _id, version: expectedVersion }, { $set: fields }, { new: true }).lean();
    if (!doc) {
      throw new StaleSessionError({ personId: next.personId });
    }
    return BrowseSessionMapper.toDomain(doc);
  }
}
