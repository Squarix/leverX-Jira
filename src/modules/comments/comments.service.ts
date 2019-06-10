import {Injectable} from "@nestjs/common";
import {Connection} from "typeorm";
import {Comment} from "./comment.entity";


@Injectable()
export class ProjectsService {
  constructor(private readonly connection: Connection) {
  }

  private readonly commentRepository = this.connection.getRepository(Comment);

  public async allComments(id: number):Promise<Comment[]> {
    let comments = await this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.comments', 'comment', 'comment.id = comment.id')
      .getMany();
    comments.forEach((comment) => {
      //comment.comments =  this.allComments(comment.id)
    });

    return comments;
  }
}