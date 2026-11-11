import { SiteEntity } from "@modules/site/domain/site.entity";
import { SiteRevisionEntity } from "@modules/site/domain/siteRevision.entity";

export interface SearchHit {
  site: SiteEntity;
  score: number;
}

export abstract class SiteRepository {
  abstract findById(id: string): Promise<SiteEntity | null>;
  abstract findByAddress(address: string): Promise<SiteEntity | null>;
  abstract listByAuthor(authorId: string): Promise<SiteEntity[]>;
  abstract search(query: string, limit: number): Promise<SearchHit[]>;
  abstract publishRevision(site: SiteEntity, revision: SiteRevisionEntity): Promise<SiteEntity>;
}

export abstract class SiteRevisionRepository {
  abstract findById(id: string): Promise<SiteRevisionEntity | null>;
  abstract findLatestVersion(siteId: string): Promise<number>;
}
