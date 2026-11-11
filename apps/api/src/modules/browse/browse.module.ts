import { BrowseSessionRepository } from "@modules/browse/domain/browseSession.repository";
import { BrowseSessionModel, BrowseSessionSchema } from "@modules/browse/infrastructure/browseSession.model";
import { BrowseSessionMongoRepository } from "@modules/browse/infrastructure/browseSessionMongo.repository";
import { BrowseController } from "@modules/browse/presentation/browse.controller";
import { BrowseService } from "@modules/browse/services/browse.service";
import { PersonModule } from "@modules/person/person.module";
import { SiteModule } from "@modules/site/site.module";
import { VisitModule } from "@modules/visit/visit.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [PersonModule, SiteModule, VisitModule, MongooseModule.forFeature([{ name: BrowseSessionModel.name, schema: BrowseSessionSchema }])],
  controllers: [BrowseController],
  providers: [BrowseService, { provide: BrowseSessionRepository, useClass: BrowseSessionMongoRepository }],
  exports: []
})
export class BrowseModule {}
