import { PersonRepository } from "@modules/person/domain/person.repository";
import { PersonModel, PersonSchema } from "@modules/person/infrastructure/person.model";
import { PersonMongoRepository } from "@modules/person/infrastructure/personMongo.repository";
import { PersonController } from "@modules/person/presentation/person.controller";
import { PersonService } from "@modules/person/services/person.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: PersonModel.name, schema: PersonSchema }])],
  controllers: [PersonController],
  providers: [PersonService, { provide: PersonRepository, useClass: PersonMongoRepository }],
  exports: [PersonService]
})
export class PersonModule {}
