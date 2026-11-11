import { PersonModule } from "@modules/person/person.module";
import { SiteRepository, SiteRevisionRepository } from "@modules/site/domain/site.repository";
import { SiteModel, SiteSchema } from "@modules/site/infrastructure/site.model";
import { SiteMongoRepository } from "@modules/site/infrastructure/siteMongo.repository";
import { SiteRevisionModel, SiteRevisionSchema } from "@modules/site/infrastructure/siteRevision.model";
import { SiteRevisionMongoRepository } from "@modules/site/infrastructure/siteRevisionMongo.repository";
import { SiteController } from "@modules/site/presentation/site.controller";
import { PublishService } from "@modules/site/services/publish.service";
import { SearchService } from "@modules/site/services/search.service";
import { SiteService } from "@modules/site/services/site.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    PersonModule,
    MongooseModule.forFeature([
      { name: SiteModel.name, schema: SiteSchema },
      { name: SiteRevisionModel.name, schema: SiteRevisionSchema }
    ])
  ],
  controllers: [SiteController],
  providers: [
    PublishService,
    SearchService,
    SiteService,
    { provide: SiteRepository, useClass: SiteMongoRepository },
    { provide: SiteRevisionRepository, useClass: SiteRevisionMongoRepository }
  ],
  exports: [SiteService, SearchService]
})
export class SiteModule {}
