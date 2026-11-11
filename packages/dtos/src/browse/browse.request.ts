import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const scrollY = z.number().min(0).optional();

export const NavigateSchema = z.object({
  input: z.string().trim().min(1).max(300),
  transition: z.enum(["typed", "link", "history", "search"]),
  scrollY
});
export class NavigateDto extends createZodDto(NavigateSchema) {}

export const BrowseSearchSchema = z.object({
  query: z.string().trim().min(1).max(200),
  scrollY
});
export class BrowseSearchDto extends createZodDto(BrowseSearchSchema) {}

export const MoveSchema = z.object({ scrollY });
export class MoveDto extends createZodDto(MoveSchema) {}
