import { InvalidAddressError } from "@modules/site/domain/site.errors";
import { SiteRevisionEntity } from "@modules/site/domain/siteRevision.entity";
import { createId } from "@paralleldrive/cuid2";
import { normalizeAddress } from "@repo/dtos/address";

export class SiteEntity {
  constructor(
    public readonly id: string,
    public readonly address: string,
    public readonly authorId: string,
    public readonly currentRevisionId: string | null,
    public readonly title: string,
    public readonly text: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(props: { id?: string; address: string; authorId: string; createdAt?: Date; updatedAt?: Date }): SiteEntity {
    const address = normalizeAddress(props.address);
    if (!address) {
      throw new InvalidAddressError({ address: props.address });
    }

    return new SiteEntity(props.id ?? createId(), address, props.authorId, null, "", "", props.createdAt ?? new Date(), props.updatedAt ?? new Date());
  }

  withRevision(revision: SiteRevisionEntity): SiteEntity {
    return new SiteEntity(this.id, this.address, this.authorId, revision.id, revision.title, revision.text, this.createdAt, revision.createdAt);
  }
}
