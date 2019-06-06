import { Module } from '@nestjs/common';
//import { JwtStrategy } from './passport/jwt.strategy';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {TasksGateway} from "./tasks.gateway";


@Module({
  providers: [TasksService, TasksGateway],
  controllers: [TasksController],
  imports: [],
  exports: []
})

export class TasksModule { }