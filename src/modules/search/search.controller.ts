import {Controller, Get, Query, Render} from "@nestjs/common";
import {SearchService} from "./search.service";

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get('/')
  @Render('search/views/show')
  async search(@Query('q') query: string) {
    return { tasks: await this.searchService.searchTasks(query),
             projects: await this.searchService.searchProjects(query)};
  }

  @Get('/autocomplete')
  async getTips(@Query('q') query: string) {
    return { tasks: await this.searchService.searchTasks(query),
             projects: await this.searchService.searchProjects(query)};
  }
}