import { BrowseService } from "@modules/browse/services/browse.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BrowseSearchDto, type BrowseView, MoveDto, NavigateDto } from "@repo/dtos/browse";

@Controller("people/:personId/browse")
export class BrowseController {
  constructor(private readonly browseService: BrowseService) {}

  @Get()
  view(@Param("personId") personId: string): Promise<BrowseView> {
    return this.browseService.view(personId);
  }

  @Post("navigate")
  navigate(@Param("personId") personId: string, @Body() dto: NavigateDto): Promise<BrowseView> {
    return this.browseService.navigate(personId, dto.input, dto.transition, dto.scrollY);
  }

  @Post("search")
  search(@Param("personId") personId: string, @Body() dto: BrowseSearchDto): Promise<BrowseView> {
    return this.browseService.search(personId, dto.query, dto.scrollY);
  }

  @Post("back")
  back(@Param("personId") personId: string, @Body() dto: MoveDto): Promise<BrowseView> {
    return this.browseService.move(personId, "back", dto.scrollY);
  }

  @Post("forward")
  forward(@Param("personId") personId: string, @Body() dto: MoveDto): Promise<BrowseView> {
    return this.browseService.move(personId, "forward", dto.scrollY);
  }
}
