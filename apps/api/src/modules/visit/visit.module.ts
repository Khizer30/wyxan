import { PersonModule } from "@modules/person/person.module";
import { SiteModule } from "@modules/site/site.module";
import { VisitRepository } from "@modules/visit/domain/visit.repository";
import { VisitModel, VisitSchema } from "@modules/visit/infrastructure/visit.model";
import { VisitMongoRepository } from "@modules/visit/infrastructure/visitMongo.repository";
import { HistoryController } from "@modules/visit/presentation/history.controller";
import { HistoryService } from "@modules/visit/services/history.service";
import { VisitService } from "@modules/visit/services/visit.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [PersonModule, SiteModule, MongooseModule.forFeature([{ name: VisitModel.name, schema: VisitSchema }])],
  controllers: [HistoryController],
  providers: [HistoryService, VisitService, { provide: VisitRepository, useClass: VisitMongoRepository }],
  exports: [VisitService]
})
export class VisitModule {}
