import { Module } from '@nestjs/common';
//import { JwtStrategy } from './passport/jwt.strategy';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import {RedisModule} from "nestjs-redis";


@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [],
  exports: []
})

export class ProjectsModule { }