import {Connection} from "typeorm";
import {Status, Task} from "./task.entity";
import {Injectable, Logger, UseGuards} from "@nestjs/common";
import {IAddTask} from "./interfaces/IAddTask";
import {ProjectsService} from "../projects/projects.service";
import {IUpdateTask} from "./interfaces/IUpdateTask";
import {SearchService} from "../search/search.service";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class TasksService {
  constructor(private readonly connection: Connection,
              private readonly projectService: ProjectsService,
              private readonly searchService: SearchService) {}

  private readonly taskRepository = this.connection.getRepository(Task);
  private readonly logger = new Logger();

  public async findOne(id: number): Promise<any> {
    return await this.taskRepository.findOne({id: id}, { relations: ['comments', 'user', 'comments.user']})
  }

  public async changeStatus(id: number, newStatus: Status) {
    return this.taskRepository.findOne({id: id})
      .then(task => {
        task.status = newStatus;
        return task;
      })
      .then(task => this.taskRepository.save(task));
  }

  public async delete(id: number) {
    return await this.taskRepository.delete({id: id});
  }

  public async create(task: IAddTask) {
    let newTask = new Task();
    newTask.status = Status.Open;
    newTask.description = task.description;
    newTask.project = await this.projectService.findOne({id: task.projectId});
    newTask.title = task.title;

    await this.taskRepository.save(newTask)
      .then(task => this.searchService.taskIndex(task))
      .catch(err => this.logger.log(err));
    return newTask;
  }



  public async update(task: IUpdateTask) {
    return await this.taskRepository.createQueryBuilder().update('Task').where({ id: task.id })
      .set({title: task.title, description: task.description});
  }
}