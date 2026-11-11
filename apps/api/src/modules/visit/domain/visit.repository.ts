import { VisitEntity } from "@modules/visit/domain/visit.entity";

export abstract class VisitRepository {
  abstract create(visit: VisitEntity): Promise<VisitEntity>;
  abstract findById(id: string): Promise<VisitEntity | null>;
  abstract listByPerson(personId: string, options: { limit: number; before?: Date }): Promise<VisitEntity[]>;
}
