import {BadRequestException, Injectable, Logger, NotFoundException} from "@nestjs/common";
import { Project } from "./project.entity";
import { Connection } from "typeorm";
import {User} from "../users/user.entity";
import {MailerService} from "@nest-modules/mailer";
import {RedisService} from "nestjs-redis";
import {RedisClient} from "nestjs-redis/dist/redis-client.provider";

@Injectable()
export class ProjectsService {
  constructor(private readonly connection: Connection,
              private readonly mailerService: MailerService) {}

  private readonly projectRepository = this.connection.getRepository(Project);
  private readonly userRepository = this.connection.getRepository(User);

  private readonly logger = new Logger();

  public async findOne(params): Promise<any> {
    return await this.projectRepository.findOne(params, {relations: ['tasks', 'users', 'owner']})
      .then(project => {
        return (project)
          ? Promise.resolve(project)
          : Promise.reject('Project not exist')
      })
      .catch(err => Promise.reject(new NotFoundException(err)))
  }

  public async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  public async create(project: Project) {
    return this.projectRepository.save(project)
      .then(project => Promise.resolve(project))
      .catch(err =>
        Promise.reject(new BadRequestException(err.toString()))
      )
  }


  public async update(project: Project) {
    return await this.projectRepository.update({id: project.id}, project);
  }

  public async delete(id: number) {
    return await this.projectRepository.delete({ id: id});
  }

  public async sendMail() {
//    let client = this.redisService.getClient();

  //  this.redisService.getClient('new');

    //client.hset('hkey', 'ht1', 123);
    //client.hset('hkey', 'ht2', 321);

    //client.hkeys('hkey', (err, replies) => {
      //console.log(replies.length + " replies:");
      //replies.forEach(function (reply, i) {
       // console.log("    " + i + ": " + reply + reply.value);
      //});
      //client.quit();
    //});


    /*this
      .mailerService
      .sendMail({
        to: 'vlas2305@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then((res) => { this.logger.log(res) })
      .catch((err) => { this.logger.log(err) });*/
  }
}