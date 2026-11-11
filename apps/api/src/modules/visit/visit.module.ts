import { VisitModel, VisitSchema } from "@modules/visit/infrastructure/visit.model";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: VisitModel.name, schema: VisitSchema }])],
  exports: [MongooseModule]
})
export class VisitModule {}
