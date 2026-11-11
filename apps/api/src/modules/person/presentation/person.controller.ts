import { PersonService } from "@modules/person/services/person.service";
import { Controller, Get } from "@nestjs/common";
import { type PersonDto } from "@repo/dtos/person";

@Controller("people")
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async list(): Promise<{ people: PersonDto[] }> {
    const people = await this.personService.list();
    return { people: people.map(({ id, name }) => ({ id, name })) };
  }
}
