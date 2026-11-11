import { PersonModel, PersonSchema } from "@modules/person/infrastructure/person.model";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: PersonModel.name, schema: PersonSchema }])],
  exports: [MongooseModule]
})
export class PersonModule {}
