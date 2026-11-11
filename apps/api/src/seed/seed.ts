import { createHash } from "node:crypto";
import { BrowseSessionEntity, type NavEntry } from "@modules/browse/domain/browseSession.entity";
import { BrowseSessionMapper } from "@modules/browse/infrastructure/browseSession.mapper";
import { BrowseSessionModel } from "@modules/browse/infrastructure/browseSession.model";
import { PersonEntity } from "@modules/person/domain/person.entity";
import { PersonMapper } from "@modules/person/infrastructure/person.mapper";
import { PersonModel } from "@modules/person/infrastructure/person.model";
import { SiteEntity } from "@modules/site/domain/site.entity";
import { SiteRevisionEntity } from "@modules/site/domain/siteRevision.entity";
import { SiteMapper, SiteRevisionMapper } from "@modules/site/infrastructure/site.mapper";
import { SiteModel } from "@modules/site/infrastructure/site.model";
import { SiteRevisionModel } from "@modules/site/infrastructure/siteRevision.model";
import { VisitEntity, type VisitTransition } from "@modules/visit/domain/visit.entity";
import { VisitMapper } from "@modules/visit/infrastructure/visit.mapper";
import { VisitModel } from "@modules/visit/infrastructure/visit.model";
import { NestFactory } from "@nestjs/core";
import { getModelToken } from "@nestjs/mongoose";
import { normalizeAddress } from "@repo/dtos/address";
import { AppModule } from "@src/app.module";
import { Model } from "mongoose";
import { PEOPLE, SITES } from "./data";
import { TRAILS, type Step } from "./trails";

const BASE = new Date("2026-01-15T09:00:00.000Z");
const minutes = (n: number) => new Date(BASE.getTime() + n * 60_000);
const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const hash = (value: string) => createHash("sha1").update(value).digest("hex").slice(0, 16);

const personId = (name: string) => `person-${slug(name)}`;
const siteId = (address: string) => `site-${hash(address)}`;
const revisionId = (address: string, version: number) => `rev-${hash(address)}-v${version}`;

interface World {
  siteByAddress: Map<string, SiteEntity>;
  revisions: Map<string, { entity: SiteRevisionEntity; html: string; address: string }>;
  history: Map<string, SiteRevisionEntity[]>;
}

function buildWorld() {
  const people = PEOPLE.map((name) => PersonEntity.create({ id: personId(name), name, createdAt: minutes(-4000), updatedAt: minutes(-4000) }));
  const world: World = { siteByAddress: new Map(), revisions: new Map(), history: new Map() };
  const revisionList: SiteRevisionEntity[] = [];

  for (const seed of SITES) {
    const id = siteId(seed.address);
    let site = SiteEntity.create({ id, address: seed.address, authorId: personId(seed.author), createdAt: minutes(seed.revisions[0].publishedAt) });
    const versions: SiteRevisionEntity[] = [];

    seed.revisions.forEach((rev, index) => {
      const entity = SiteRevisionEntity.create({
        id: revisionId(seed.address, index + 1),
        siteId: id,
        version: index + 1,
        title: rev.title,
        html: rev.html,
        createdAt: minutes(rev.publishedAt)
      });
      versions.push(entity);
      revisionList.push(entity);
      world.revisions.set(entity.id, { entity, html: rev.html, address: seed.address });
      site = site.withRevision(entity);
    });

    world.siteByAddress.set(seed.address, site);
    world.history.set(seed.address, versions);
  }

  return { people, world, revisionList };
}

function revisionAt(world: World, address: string, at: Date): SiteRevisionEntity | null {
  const published = (world.history.get(address) ?? []).filter((rev) => rev.createdAt <= at);
  return published.at(-1) ?? null;
}

function walk(person: string, startsAt: number, steps: Step[], world: World) {
  const key = slug(person);
  const visits: VisitEntity[] = [];
  let session = BrowseSessionEntity.create({ id: `session-${key}`, personId: personId(person), updatedAt: BASE });
  let clock = minutes(startsAt).getTime();

  const record = (entry: NavEntry, transition: VisitTransition, previous: NavEntry | null, id: string) => {
    const rev = entry.revisionId ? world.revisions.get(entry.revisionId) : undefined;
    const visit = VisitEntity.create({
      id,
      personId: personId(person),
      address: entry.address ?? "",
      siteId: rev ? rev.entity.siteId : null,
      revisionId: rev ? rev.entity.id : null,
      transition,
      fromVisitId: previous?.visitId ?? null,
      visitedAt: new Date(clock)
    });
    visits.push(visit);
    return visit;
  };

  steps.forEach((step, n) => {
    clock += (65 + ((n * 37) % 41)) * 1000;
    const here = session.current;
    const id = `visit-${key}-${String(n).padStart(3, "0")}`;
    const at = new Date(clock);

    if (step.k === "back" || step.k === "fwd") {
      const next = step.k === "back" ? session.back() : session.forward();
      if (!next?.current) {
        throw new Error(`${person}: step ${n} (${step.k}) has nowhere to go`);
      }
      if (next.current.kind === "page") {
        record(next.current, step.k === "back" ? "back" : "forward", here, id);
      }
      session = next;
      return;
    }

    if (step.k === "search") {
      session = session.navigate({ id: `entry-${key}-${n}`, kind: "search", address: null, query: step.q, revisionId: null, outcome: null, visitId: null });
      return;
    }

    const address = normalizeAddress(step.to) ?? step.to.toLowerCase();
    if (step.k === "link") {
      const shown = here?.revisionId ? world.revisions.get(here.revisionId) : undefined;
      if (!shown || !shown.html.includes(`href="${address}"`)) {
        throw new Error(`${person}: step ${n} follows a link to ${address} that ${here?.address ?? "nothing"} (as shown) does not have`);
      }
    }

    const rev = revisionAt(world, address, at);
    const transition: VisitTransition = step.k === "hit" ? "search" : step.k;
    const entryBase = {
      id: `entry-${key}-${n}`,
      kind: "page" as const,
      address,
      query: null,
      revisionId: rev?.id ?? null,
      outcome: rev ? ("found" as const) : ("missing" as const)
    };
    const visit = record({ ...entryBase, scrollY: 0, visitId: id }, transition, here, id);
    session = session.navigate({ ...entryBase, visitId: visit.id });
  });

  session = new BrowseSessionEntity(session.id, session.personId, session.entries, session.cursor, session.version, new Date(clock));
  return { visits, session, endedAt: new Date(clock) };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsertAll<T extends { _id: string }>(model: Model<any>, docs: T[]) {
  if (docs.length === 0) {
    return;
  }
  await model.bulkWrite(
    docs.map((doc) => ({ replaceOne: { filter: { _id: doc._id }, replacement: doc, upsert: true } })),
    { timestamps: false }
  );
}

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ["error", "warn"] });
  try {
    const { people, world, revisionList } = buildWorld();
    const trails = TRAILS.map((trail) => ({ trail, ...walk(trail.person, trail.startsAt, trail.steps, world) }));

    const peopleModel = app.get<Model<PersonModel>>(getModelToken(PersonModel.name));
    const siteModel = app.get<Model<SiteModel>>(getModelToken(SiteModel.name));
    const revisionModel = app.get<Model<SiteRevisionModel>>(getModelToken(SiteRevisionModel.name));
    const visitModel = app.get<Model<VisitModel>>(getModelToken(VisitModel.name));
    const sessionModel = app.get<Model<BrowseSessionModel>>(getModelToken(BrowseSessionModel.name));

    await upsertAll(
      peopleModel,
      people.map((p) => ({ ...PersonMapper.toPersistence(p), createdAt: p.createdAt, updatedAt: p.updatedAt }))
    );
    await upsertAll(
      revisionModel,
      revisionList.map((r) => ({ ...SiteRevisionMapper.toPersistence(r), createdAt: r.createdAt }))
    );
    await upsertAll(
      siteModel,
      [...world.siteByAddress.values()].map((s) => ({ ...SiteMapper.toPersistence(s), createdAt: s.createdAt, updatedAt: s.updatedAt }))
    );
    await upsertAll(
      visitModel,
      trails.flatMap((t) => t.visits.map((v) => VisitMapper.toPersistence(v)))
    );
    await upsertAll(
      sessionModel,
      trails.map((t) => BrowseSessionMapper.toPersistence(t.session))
    );

    const visitCount = trails.reduce((sum, t) => sum + t.visits.length, 0);
    console.info(`Seeded ${people.length} people, ${world.siteByAddress.size} sites (${revisionList.length} revisions), ${visitCount} visits.`);
    for (const t of trails) {
      console.info(
        `  ${t.trail.person.padEnd(14)} ${String(t.visits.length).padStart(2)} visits, ${t.trail.startsAt}m to ${Math.round((t.endedAt.getTime() - BASE.getTime()) / 60000)}m`
      );
    }
  } finally {
    await app.close();
  }
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
