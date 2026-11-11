import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const PublishSiteSchema = z.object({
  personId: z.string().min(1),
  address: z.string().trim().min(1).max(300),
  title: z.string().trim().min(1).max(200),
  html: z.string().min(1).max(100_000)
});

export class PublishSiteDto extends createZodDto(PublishSiteSchema) {}

export const SearchQuerySchema = z.object({
  q: z.string().trim().max(200).default("")
});

export class SearchQueryDto extends createZodDto(SearchQuerySchema) {}
