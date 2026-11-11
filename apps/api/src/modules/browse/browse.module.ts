import { BrowseSessionModel, BrowseSessionSchema } from "@modules/browse/infrastructure/browseSession.model";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: BrowseSessionModel.name, schema: BrowseSessionSchema }])],
  exports: [MongooseModule]
})
export class BrowseModule {}
