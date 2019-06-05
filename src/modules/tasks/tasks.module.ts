import { Module } from '@nestjs/common';
//import { JwtStrategy } from './passport/jwt.strategy';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';


@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [],
  exports: []
})

export class TasksModule { }