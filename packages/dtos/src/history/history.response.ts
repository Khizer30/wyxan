import { z } from "zod";

export const HistoryItemSchema = z.object({
  id: z.string(),
  address: z.string(),
  title: z.string().nullable(),
  outcome: z.enum(["found", "missing"]),
  transition: z.enum(["typed", "link", "back", "forward", "history", "search"]),
  visitedAt: z.date()
});
export type HistoryItem = z.infer<typeof HistoryItemSchema>;
