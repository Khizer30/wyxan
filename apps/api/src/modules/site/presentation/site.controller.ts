import { PublishService } from "@modules/site/services/publish.service";
import { SearchService } from "@modules/site/services/search.service";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PublishSiteDto, type PublishedSite, SearchQueryDto, type SearchResult } from "@repo/dtos/site";

@Controller()
export class SiteController {
  constructor(
    private readonly publishService: PublishService,
    private readonly searchService: SearchService
  ) {}

  @Post("sites")
  async publish(@Body() dto: PublishSiteDto): Promise<{ site: PublishedSite }> {
    return { site: await this.publishService.publish(dto) };
  }

  @Get("search")
  async search(@Query() query: SearchQueryDto): Promise<{ results: SearchResult[] }> {
    return { results: await this.searchService.search(query.q) };
  }
}
