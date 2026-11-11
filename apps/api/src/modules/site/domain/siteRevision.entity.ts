import { sanitizePage } from "@modules/site/domain/htmlSanitizer";
import { createId } from "@paralleldrive/cuid2";

export class SiteRevisionEntity {
  constructor(
    public readonly id: string,
    public readonly siteId: string,
    public readonly version: number,
    public readonly title: string,
    public readonly safeHtml: string,
    public readonly text: string,
    public readonly createdAt: Date
  ) {}

  static create(props: { id?: string; siteId: string; version: number; title: string; html: string; createdAt?: Date }): SiteRevisionEntity {
    const { safeHtml, text } = sanitizePage(props.html);
    return new SiteRevisionEntity(props.id ?? createId(), props.siteId, props.version, props.title.trim(), safeHtml, text, props.createdAt ?? new Date());
  }
}
