import { PersonService } from "@modules/person/services/person.service";
import { SiteService } from "@modules/site/services/site.service";
import { VisitRepository } from "@modules/visit/domain/visit.repository";
import { Injectable } from "@nestjs/common";
import { type HistoryItem } from "@repo/dtos/history";

@Injectable()
export class HistoryService {
  constructor(
    private readonly personService: PersonService,
    private readonly visitRepo: VisitRepository,
    private readonly siteService: SiteService
  ) {}

  async list(personId: string, limit: number, before?: Date): Promise<{ items: HistoryItem[]; nextBefore: Date | null }> {
    await this.personService.findById(personId);

    const visits = await this.visitRepo.listByPerson(personId, { limit, before });
    const revisionIds = [...new Set(visits.map((visit) => visit.revisionId).filter((id): id is string => id !== null))];
    const titles = new Map((await this.siteService.findRevisions(revisionIds)).map((revision) => [revision.id, revision.title]));

    const items = visits.map((visit) => ({
      id: visit.id,
      address: visit.address,
      title: visit.revisionId ? (titles.get(visit.revisionId) ?? null) : null,
      outcome: visit.outcome,
      transition: visit.transition,
      visitedAt: visit.visitedAt
    }));

    return { items, nextBefore: visits.length === limit ? visits[visits.length - 1].visitedAt : null };
  }
}
