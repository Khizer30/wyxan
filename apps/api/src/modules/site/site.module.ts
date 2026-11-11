import { SiteModel, SiteSchema } from "@modules/site/infrastructure/site.model";
import { SiteRevisionModel, SiteRevisionSchema } from "@modules/site/infrastructure/siteRevision.model";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SiteModel.name, schema: SiteSchema },
      { name: SiteRevisionModel.name, schema: SiteRevisionSchema }
    ])
  ],
  exports: [MongooseModule]
})
export class SiteModule {}
