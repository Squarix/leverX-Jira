import { Module } from '@nestjs/common';
//import { JwtStrategy } from './passport/jwt.strategy';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {TasksGateway} from "./tasks.gateway";
import {Connection} from "typeorm";
import {ProjectsService} from "../projects/projects.service";


@Module({
  providers: [TasksService, TasksGateway, ProjectsService],
  controllers: [TasksController],
  imports: [],
  exports: []
})

export class TasksModule { }