import { SiteEntity } from "@modules/site/domain/site.entity";
import { SiteRevisionEntity } from "@modules/site/domain/siteRevision.entity";
import { SiteModel } from "@modules/site/infrastructure/site.model";
import { SiteRevisionModel } from "@modules/site/infrastructure/siteRevision.model";

export class SiteMapper {
  static toDomain(doc: SiteModel): SiteEntity {
    return new SiteEntity(doc._id, doc.address, doc.authorId, doc.currentRevisionId ?? null, doc.title, doc.text, doc.createdAt, doc.updatedAt);
  }

  static toPersistence(entity: SiteEntity) {
    return {
      _id: entity.id,
      address: entity.address,
      authorId: entity.authorId,
      currentRevisionId: entity.currentRevisionId,
      title: entity.title,
      text: entity.text
    };
  }
}

export class SiteRevisionMapper {
  static toDomain(doc: SiteRevisionModel): SiteRevisionEntity {
    return new SiteRevisionEntity(doc._id, doc.siteId, doc.version, doc.title, doc.safeHtml, doc.text, doc.createdAt);
  }

  static toPersistence(entity: SiteRevisionEntity) {
    return {
      _id: entity.id,
      siteId: entity.siteId,
      version: entity.version,
      title: entity.title,
      safeHtml: entity.safeHtml,
      text: entity.text
    };
  }
}
