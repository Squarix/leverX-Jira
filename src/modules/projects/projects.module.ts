import { Module } from '@nestjs/common';
//import { JwtStrategy } from './passport/jwt.strategy';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import {RedisModule} from "nestjs-redis";
import {UsersService} from "../users/users.service";
import {CryptographerService} from "../auth/cryptographer.service";


@Module({
  providers: [ProjectsService, UsersService, CryptographerService],
  controllers: [ProjectsController],
  imports: [],
  exports: []
})

export class ProjectsModule { }