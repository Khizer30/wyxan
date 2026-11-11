import { VisitEntity } from "@modules/visit/domain/visit.entity";
import { VisitModel } from "@modules/visit/infrastructure/visit.model";

export class VisitMapper {
  static toDomain(doc: VisitModel): VisitEntity {
    return new VisitEntity(
      doc._id,
      doc.personId,
      doc.address,
      doc.siteId ?? null,
      doc.revisionId ?? null,
      doc.outcome,
      doc.transition,
      doc.fromVisitId ?? null,
      doc.visitedAt
    );
  }

  static toPersistence(entity: VisitEntity) {
    return {
      _id: entity.id,
      personId: entity.personId,
      address: entity.address,
      siteId: entity.siteId,
      revisionId: entity.revisionId,
      outcome: entity.outcome,
      transition: entity.transition,
      fromVisitId: entity.fromVisitId,
      visitedAt: entity.visitedAt
    };
  }
}
