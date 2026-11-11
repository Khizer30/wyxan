import { SiteRepository } from "@modules/site/domain/site.repository";
import { Injectable } from "@nestjs/common";
import { type SearchResult } from "@repo/dtos/site";

const RESULT_LIMIT = 20;
const SNIPPET_BEFORE = 60;
const SNIPPET_AFTER = 100;

export function makeSnippet(text: string, query: string): string {
  const lower = text.toLowerCase();
  const hits = query
    .toLowerCase()
    .split(/\s+/)
    .map((word) => lower.indexOf(word.replace(/^-+/, "")))
    .filter((index) => index >= 0);

  const at = hits.length ? Math.min(...hits) : 0;
  const start = Math.max(0, at - SNIPPET_BEFORE);
  const end = Math.min(text.length, at + SNIPPET_AFTER);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`;
}

@Injectable()
export class SearchService {
  constructor(private readonly siteRepo: SiteRepository) {}

  async search(query: string): Promise<SearchResult[]> {
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      return [];
    }

    const hits = await this.siteRepo.search(trimmed, RESULT_LIMIT);
    return hits.map(({ site, score }) => ({ address: site.address, title: site.title, snippet: makeSnippet(site.text, trimmed), score }));
  }
}
