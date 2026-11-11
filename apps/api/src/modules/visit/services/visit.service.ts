import { VisitEntity } from "@modules/visit/domain/visit.entity";
import { VisitRepository } from "@modules/visit/domain/visit.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VisitService {
  constructor(private readonly visitRepo: VisitRepository) {}

  record(visit: VisitEntity): Promise<VisitEntity> {
    return this.visitRepo.create(visit);
  }
}
