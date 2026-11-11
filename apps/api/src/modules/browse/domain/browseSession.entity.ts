import { createId } from "@paralleldrive/cuid2";

export interface NavEntry {
  id: string;
  kind: "page" | "search";
  address: string | null;
  query: string | null;
  revisionId: string | null;
  outcome: "found" | "missing" | null;
  scrollY: number;
  visitId: string | null;
}

export type NewNavEntry = Omit<NavEntry, "id" | "scrollY"> & { id?: string; scrollY?: number };

export class BrowseSessionEntity {
  constructor(
    public readonly id: string,
    public readonly personId: string,
    public readonly entries: readonly NavEntry[],
    public readonly cursor: number,
    public readonly version: number,
    public readonly updatedAt: Date
  ) {}

  static create(props: { id?: string; personId: string; entries?: NavEntry[]; cursor?: number; version?: number; updatedAt?: Date }): BrowseSessionEntity {
    const entries = props.entries ?? [];
    return new BrowseSessionEntity(
      props.id ?? createId(),
      props.personId,
      entries,
      props.cursor ?? entries.length - 1,
      props.version ?? 0,
      props.updatedAt ?? new Date()
    );
  }

  get current(): NavEntry | null {
    return this.entries[this.cursor] ?? null;
  }

  get canGoBack(): boolean {
    return this.cursor > 0;
  }

  get canGoForward(): boolean {
    return this.cursor >= 0 && this.cursor < this.entries.length - 1;
  }

  navigate(entry: NewNavEntry): BrowseSessionEntity {
    const kept = this.entries.slice(0, this.cursor + 1);
    const next: NavEntry = { ...entry, id: entry.id ?? createId(), scrollY: entry.scrollY ?? 0 };
    return this.with([...kept, next], kept.length);
  }

  back(): BrowseSessionEntity | null {
    return this.canGoBack ? this.with(this.entries, this.cursor - 1) : null;
  }

  forward(): BrowseSessionEntity | null {
    return this.canGoForward ? this.with(this.entries, this.cursor + 1) : null;
  }

  saveScroll(scrollY: number): BrowseSessionEntity {
    const current = this.current;
    if (!current) {
      return this;
    }

    const entries = this.entries.map((entry, index) => (index === this.cursor ? { ...entry, scrollY: Math.max(0, scrollY) } : entry));
    return this.with(entries, this.cursor);
  }

  private with(entries: readonly NavEntry[], cursor: number): BrowseSessionEntity {
    return new BrowseSessionEntity(this.id, this.personId, entries, cursor, this.version + 1, new Date());
  }
}
