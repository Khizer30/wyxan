import { VisitEntity } from "@modules/visit/domain/visit.entity";
import { VisitRepository } from "@modules/visit/domain/visit.repository";
import { VisitMapper } from "@modules/visit/infrastructure/visit.mapper";
import { VisitModel } from "@modules/visit/infrastructure/visit.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class VisitMongoRepository extends VisitRepository {
  constructor(@InjectModel(VisitModel.name) private readonly visitModel: Model<VisitModel>) {
    super();
  }

  async create(visit: VisitEntity): Promise<VisitEntity> {
    const doc = await this.visitModel.create(VisitMapper.toPersistence(visit));
    return VisitMapper.toDomain(doc.toObject());
  }

  async findById(id: string): Promise<VisitEntity | null> {
    const doc = await this.visitModel.findById(id).lean();
    return doc ? VisitMapper.toDomain(doc) : null;
  }

  async listByPerson(personId: string, options: { limit: number; before?: Date }): Promise<VisitEntity[]> {
    const filter = options.before ? { personId, visitedAt: { $lt: options.before } } : { personId };
    const docs = await this.visitModel.find(filter).sort({ visitedAt: -1 }).limit(options.limit).lean();
    return docs.map((doc) => VisitMapper.toDomain(doc));
  }
}
