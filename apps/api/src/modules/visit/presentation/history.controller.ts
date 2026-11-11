import { HistoryService } from "@modules/visit/services/history.service";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { HistoryQueryDto, type HistoryItem } from "@repo/dtos/history";

@Controller("people/:personId/history")
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async list(@Param("personId") personId: string, @Query() query: HistoryQueryDto): Promise<{ items: HistoryItem[]; nextBefore: Date | null }> {
    return this.historyService.list(personId, query.limit, query.before);
  }
}
