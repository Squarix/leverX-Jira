import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {TasksGateway} from "./tasks.gateway";
import {ProjectsService} from "../projects/projects.service";
import {SearchService} from "../search/search.service";
import {SearchModule} from "../search/search.module";


@Module({
  providers: [TasksService, TasksGateway, ProjectsService, SearchService],
  controllers: [TasksController],
  imports: [SearchModule],
  exports: []
})

export class TasksModule { }