import { PersonEntity } from "@modules/person/domain/person.entity";
import { PersonRepository } from "@modules/person/domain/person.repository";
import { PersonMapper } from "@modules/person/infrastructure/person.mapper";
import { PersonModel } from "@modules/person/infrastructure/person.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PersonMongoRepository extends PersonRepository {
  constructor(@InjectModel(PersonModel.name) private readonly personModel: Model<PersonModel>) {
    super();
  }

  async findById(id: string): Promise<PersonEntity | null> {
    const doc = await this.personModel.findById(id).lean();
    return doc ? PersonMapper.toDomain(doc) : null;
  }

  async findByName(name: string): Promise<PersonEntity | null> {
    const doc = await this.personModel.findOne({ name }).lean();
    return doc ? PersonMapper.toDomain(doc) : null;
  }

  async list(): Promise<PersonEntity[]> {
    const docs = await this.personModel.find().sort({ name: 1 }).lean();
    return docs.map((doc) => PersonMapper.toDomain(doc));
  }

  async upsert(person: PersonEntity): Promise<PersonEntity> {
    const { _id, ...fields } = PersonMapper.toPersistence(person);
    const doc = await this.personModel.findOneAndUpdate({ _id }, { $set: fields }, { upsert: true, new: true }).lean();
    return PersonMapper.toDomain(doc);
  }
}
