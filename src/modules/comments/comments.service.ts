import {Injectable, Logger} from "@nestjs/common";
import {Connection} from "typeorm";
import {Comment} from "./comment.entity";
import {MailerService} from "@nest-modules/mailer";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {TasksService} from "../tasks/tasks.service";

@Injectable()
export class CommentsService {
  constructor(private readonly connection: Connection,
              private readonly mailerService: MailerService,
              private readonly userService: UsersService,
              private readonly taskService: TasksService) {
  }

  private readonly commentRepository = this.connection.getRepository(Comment);
  private readonly logger = new Logger();

  public async create(comment: Comment, userId: number, taskId: number) {
    comment.task = await this.taskService.findOne(taskId);
    comment.user = await this.userService.findOne({id: userId});

    /*Reply*/
    let reply = comment.body.match('<reply>(.*)</reply>');
    if (reply) {
      let email = reply[1];
      let user: User = await this.userService.findOne({email: email});
      let name = 'UNKNOWN USER';
      if (user) {
        name = user.name;
        comment.body = comment.body.replace('<reply>' + email + '</reply>', name);
        this.sendMail(email, comment.task.id, 'task')
          .catch(err => this.logger.log(err));
      }
    }
    /**/
    return await this.commentRepository.save(comment)
  }


  private async sendMail(email: string, commentableId: number, commentableType: string) {
    this
      .mailerService
      .sendMail({
        to: email, // sender address
        subject: 'Jira Notification ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>You have been mentioned here: <a href="//jiraleverx.heroku.com/'+ commentableType +
          's/' + commentableId + '">Link</a></b>', // HTML body content
      })
      .then((res) => { this.logger.log(res) })
      .catch((err) => { this.logger.log(err) });
  }
}