import { PersonEntity } from "@modules/person/domain/person.entity";
import { PersonModel } from "@modules/person/infrastructure/person.model";

export class PersonMapper {
  static toDomain(doc: PersonModel): PersonEntity {
    return new PersonEntity(doc._id, doc.name, doc.createdAt, doc.updatedAt);
  }

  static toPersistence(entity: PersonEntity) {
    return { _id: entity.id, name: entity.name };
  }
}
