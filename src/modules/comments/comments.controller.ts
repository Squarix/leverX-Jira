import {Body, Controller, Post, Req, UseGuards, ValidationPipe} from "@nestjs/common";
import {CommentsService} from "./comments.service";
import {Comment} from "./comment.entity";
import {AuthGuard} from "@nestjs/passport";


@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post('/')
  async create(@Body(new ValidationPipe()) comment: Comment, @Req() req) {
    return await this.commentService.create(comment, req.user.id, req.body.commentableId);
  }
}