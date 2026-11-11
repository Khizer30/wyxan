import { PersonEntity } from "@modules/person/domain/person.entity";
import { PersonNotFoundError } from "@modules/person/domain/person.errors";
import { PersonRepository } from "@modules/person/domain/person.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PersonService {
  constructor(private readonly personRepo: PersonRepository) {}

  list(): Promise<PersonEntity[]> {
    return this.personRepo.list();
  }

  async findById(id: string): Promise<PersonEntity> {
    const person = await this.personRepo.findById(id);
    if (!person) {
      throw new PersonNotFoundError({ personId: id });
    }

    return person;
  }
}
