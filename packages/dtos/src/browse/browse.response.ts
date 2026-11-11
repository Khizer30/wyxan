import { z } from "zod";
import { SearchResultSchema } from "../site/site.response.js";

export const PageViewSchema = z.object({
  kind: z.literal("page"),
  address: z.string(),
  outcome: z.enum(["found", "missing"]),
  site: z
    .object({
      title: z.string(),
      safeHtml: z.string(),
      authorName: z.string(),
      version: z.number().int(),
      revisionId: z.string()
    })
    .nullable()
});

export const SearchViewSchema = z.object({
  kind: z.literal("search"),
  query: z.string(),
  results: z.array(SearchResultSchema)
});

export const BrowseViewSchema = z.object({
  view: z.discriminatedUnion("kind", [PageViewSchema, SearchViewSchema]).nullable(),
  canGoBack: z.boolean(),
  canGoForward: z.boolean(),
  scrollY: z.number(),
  version: z.number().int()
});
export type BrowseView = z.infer<typeof BrowseViewSchema>;
