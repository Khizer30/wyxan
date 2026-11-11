import { z } from "zod";

export const PublishedSiteSchema = z.object({
  address: z.string(),
  title: z.string(),
  version: z.number().int()
});
export type PublishedSite = z.infer<typeof PublishedSiteSchema>;

export const SearchResultSchema = z.object({
  address: z.string(),
  title: z.string(),
  snippet: z.string(),
  score: z.number()
});
export type SearchResult = z.infer<typeof SearchResultSchema>;
