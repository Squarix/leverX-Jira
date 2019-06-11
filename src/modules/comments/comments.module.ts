import {Module} from "@nestjs/common";
import {CommentsController} from "./comments.controller";
import {CommentsService} from "./comments.service";
import {MailerService} from "@nest-modules/mailer";
import {UsersService} from "../users/users.service";
import {CryptographerService} from "../auth/cryptographer.service";
import {TasksService} from "../tasks/tasks.service";
import {TasksModule} from "../tasks/tasks.module";
import {ProjectsService} from "../projects/projects.service";
import {SearchModule} from "../search/search.module";
import {SearchService} from "../search/search.service";

@Module({
  providers: [CommentsService, UsersService, CryptographerService,
    TasksService, ProjectsService, SearchService],
  controllers: [CommentsController],
  imports: [SearchModule],
})

export class CommentsModule {}