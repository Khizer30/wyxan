import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const HistoryQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(50),
  before: z.coerce.date().optional()
});
export class HistoryQueryDto extends createZodDto(HistoryQuerySchema) {}
