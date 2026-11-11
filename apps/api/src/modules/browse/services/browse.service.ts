import { BrowseSessionEntity, type NavEntry } from "@modules/browse/domain/browseSession.entity";
import { BrowseSessionRepository } from "@modules/browse/domain/browseSession.repository";
import { PersonService } from "@modules/person/services/person.service";
import { SearchService } from "@modules/site/services/search.service";
import { SiteService } from "@modules/site/services/site.service";
import { VisitEntity, type VisitTransition } from "@modules/visit/domain/visit.entity";
import { VisitService } from "@modules/visit/services/visit.service";
import { Injectable } from "@nestjs/common";
import { normalizeAddress } from "@repo/dtos/address";
import { type BrowseView } from "@repo/dtos/browse";

type Body = BrowseView["view"];
type Direction = "back" | "forward";

@Injectable()
export class BrowseService {
  constructor(
    private readonly personService: PersonService,
    private readonly siteService: SiteService,
    private readonly visitService: VisitService,
    private readonly sessionRepo: BrowseSessionRepository,
    private readonly searchService: SearchService
  ) {}

  async view(personId: string): Promise<BrowseView> {
    const session = await this.load(personId);
    return (await this.render(session)).view;
  }

  async navigate(personId: string, input: string, transition: Exclude<VisitTransition, "back" | "forward">, scrollY?: number): Promise<BrowseView> {
    const loaded = await this.load(personId);
    const session = this.leaving(loaded, scrollY);

    const address = normalizeAddress(input) ?? input.trim().toLowerCase().slice(0, 253);
    const site = await this.siteService.findByAddress(address);
    const revisionId = site?.currentRevisionId ?? null;

    const visit = VisitEntity.create({
      personId,
      address,
      siteId: revisionId ? site!.id : null,
      revisionId,
      transition,
      fromVisitId: session.current?.visitId ?? null
    });

    const next = session.navigate({ kind: "page", address, query: null, revisionId, outcome: visit.outcome, visitId: visit.id });
    const { view } = await this.render(next);

    await this.sessionRepo.save(next, loaded.version);
    await this.visitService.record(visit);
    return view;
  }

  async search(personId: string, query: string, scrollY?: number): Promise<BrowseView> {
    const loaded = await this.load(personId);
    const session = this.leaving(loaded, scrollY);
    const next = session.navigate({ kind: "search", address: null, query, revisionId: null, outcome: null, visitId: null });
    const { view } = await this.render(next);

    await this.sessionRepo.save(next, loaded.version);
    return view;
  }

  async move(personId: string, direction: Direction, scrollY?: number): Promise<BrowseView> {
    const session = await this.load(personId);
    const left = this.leaving(session, scrollY);
    const next = direction === "back" ? left.back() : left.forward();

    if (!next) {
      return (await this.render(session)).view;
    }

    const { view, siteId } = await this.render(next);
    await this.sessionRepo.save(next, session.version);

    const entry = next.current;
    if (entry?.kind === "page" && entry.address) {
      await this.visitService.record(
        VisitEntity.create({
          personId,
          address: entry.address,
          siteId,
          revisionId: siteId ? entry.revisionId : null,
          transition: direction,
          fromVisitId: session.current?.visitId ?? null
        })
      );
    }

    return view;
  }

  private leaving(session: BrowseSessionEntity, scrollY?: number): BrowseSessionEntity {
    return scrollY === undefined ? session : session.saveScroll(scrollY);
  }

  private async load(personId: string): Promise<BrowseSessionEntity> {
    await this.personService.findById(personId);

    return (await this.sessionRepo.findByPerson(personId)) ?? BrowseSessionEntity.create({ personId });
  }

  private async render(session: BrowseSessionEntity): Promise<{ view: BrowseView; siteId: string | null }> {
    const entry = session.current;
    const { body, siteId } = entry ? await this.renderEntry(entry) : { body: null, siteId: null };

    return {
      view: { view: body, canGoBack: session.canGoBack, canGoForward: session.canGoForward, scrollY: entry?.scrollY ?? 0, version: session.version },
      siteId
    };
  }

  private async renderEntry(entry: NavEntry): Promise<{ body: Body; siteId: string | null }> {
    if (entry.kind === "search") {
      const query = entry.query ?? "";
      return { body: { kind: "search", query, results: await this.searchService.search(query) }, siteId: null };
    }

    const address = entry.address ?? "";
    const nowhere = { body: { kind: "page" as const, address, outcome: "missing" as const, site: null }, siteId: null };
    if (entry.outcome !== "found" || !entry.revisionId) {
      return nowhere;
    }

    const revision = await this.siteService.findRevision(entry.revisionId);
    const site = revision ? await this.siteService.findById(revision.siteId) : null;
    if (!revision || !site) {
      return nowhere;
    }

    const author = await this.personService.findById(site.authorId);
    return {
      body: {
        kind: "page",
        address,
        outcome: "found",
        site: { title: revision.title, safeHtml: revision.safeHtml, authorName: author.name, version: revision.version, revisionId: revision.id }
      },
      siteId: site.id
    };
  }
}
