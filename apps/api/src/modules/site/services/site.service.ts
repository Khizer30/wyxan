import { SiteEntity } from "@modules/site/domain/site.entity";
import { SiteRepository, SiteRevisionRepository } from "@modules/site/domain/site.repository";
import { SiteRevisionEntity } from "@modules/site/domain/siteRevision.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SiteService {
  constructor(
    private readonly siteRepo: SiteRepository,
    private readonly revisionRepo: SiteRevisionRepository
  ) {}

  findByAddress(address: string): Promise<SiteEntity | null> {
    return this.siteRepo.findByAddress(address);
  }

  findById(id: string): Promise<SiteEntity | null> {
    return this.siteRepo.findById(id);
  }

  findRevision(id: string): Promise<SiteRevisionEntity | null> {
    return this.revisionRepo.findById(id);
  }

  findRevisions(ids: string[]): Promise<SiteRevisionEntity[]> {
    return this.revisionRepo.findByIds(ids);
  }
}
