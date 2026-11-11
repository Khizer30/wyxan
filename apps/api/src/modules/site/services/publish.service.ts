import { PersonService } from "@modules/person/services/person.service";
import { SiteEntity } from "@modules/site/domain/site.entity";
import { InvalidAddressError, SiteAlreadyExistsError } from "@modules/site/domain/site.errors";
import { SiteRepository, SiteRevisionRepository } from "@modules/site/domain/site.repository";
import { SiteRevisionEntity } from "@modules/site/domain/siteRevision.entity";
import { Injectable } from "@nestjs/common";
import { normalizeAddress } from "@repo/dtos/address";
import { type PublishedSite } from "@repo/dtos/site";

export interface PublishInput {
  personId: string;
  address: string;
  title: string;
  html: string;
}

@Injectable()
export class PublishService {
  constructor(
    private readonly personService: PersonService,
    private readonly siteRepo: SiteRepository,
    private readonly revisionRepo: SiteRevisionRepository
  ) {}

  async publish(input: PublishInput): Promise<PublishedSite> {
    const person = await this.personService.findById(input.personId);

    const address = normalizeAddress(input.address);
    if (!address) {
      throw new InvalidAddressError({ address: input.address });
    }

    const existing = await this.siteRepo.findByAddress(address);
    if (existing && existing.authorId !== person.id) {
      throw new SiteAlreadyExistsError({ address });
    }

    const site = existing ?? SiteEntity.create({ address, authorId: person.id });
    const version = existing ? (await this.revisionRepo.findLatestVersion(site.id)) + 1 : 1;
    const revision = SiteRevisionEntity.create({ siteId: site.id, version, title: input.title, html: input.html });

    const saved = await this.siteRepo.publishRevision(site.withRevision(revision), revision);
    return { address: saved.address, title: saved.title, version };
  }
}
