import { BrowseSessionEntity } from "@modules/browse/domain/browseSession.entity";
import { BrowseSessionModel } from "@modules/browse/infrastructure/browseSession.model";

export class BrowseSessionMapper {
  static toDomain(doc: BrowseSessionModel): BrowseSessionEntity {
    return new BrowseSessionEntity(
      doc._id,
      doc.personId,
      doc.entries.map((entry) => ({
        id: entry.id,
        kind: entry.kind,
        address: entry.address ?? null,
        query: entry.query ?? null,
        revisionId: entry.revisionId ?? null,
        outcome: entry.outcome ?? null,
        scrollY: entry.scrollY,
        visitId: entry.visitId ?? null
      })),
      doc.cursor,
      doc.version,
      doc.updatedAt
    );
  }

  static toPersistence(entity: BrowseSessionEntity) {
    return {
      _id: entity.id,
      personId: entity.personId,
      entries: entity.entries.map((entry) => ({ ...entry })),
      cursor: entity.cursor,
      version: entity.version,
      updatedAt: entity.updatedAt
    };
  }
}
