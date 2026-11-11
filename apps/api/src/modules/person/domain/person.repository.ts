import { PersonEntity } from "@modules/person/domain/person.entity";

export abstract class PersonRepository {
  abstract findById(id: string): Promise<PersonEntity | null>;
  abstract findByName(name: string): Promise<PersonEntity | null>;
  abstract list(): Promise<PersonEntity[]>;
  abstract upsert(person: PersonEntity): Promise<PersonEntity>;
}
