import type { BrowseView } from "@repo/dtos/browse";

export type { BrowseView };
export type PageView = Extract<NonNullable<BrowseView["view"]>, { kind: "page" }>;
export type SearchView = Extract<NonNullable<BrowseView["view"]>, { kind: "search" }>;

export interface Person {
  id: string;
  name: string;
}

export interface HistoryItem {
  id: string;
  address: string;
  title: string | null;
  outcome: "found" | "missing";
  transition: "typed" | "link" | "back" | "forward" | "history" | "search";
  visitedAt: string;
}

export interface HistoryPage {
  items: HistoryItem[];
  nextBefore: string | null;
}

export type Transition = "typed" | "link" | "history" | "search";

export interface PublishInput {
  personId: string;
  address: string;
  title: string;
  html: string;
}
