import {Connection} from "typeorm";
import {Status, Task} from "./task.entity";
import {Injectable} from "@nestjs/common";
import {IAddTask} from "./interfaces/IAddTask";
import {ProjectsService} from "../projects/projects.service";
import {IUpdateTask} from "./interfaces/IUpdateTask";
import {SearchService} from "../search/search.service";

@Injectable()
export class TasksService {
  constructor(private readonly connection: Connection,
              private readonly projectService: ProjectsService,
              private readonly searchService: SearchService) {}

  private readonly taskRepository = this.connection.getRepository(Task);

  public async findOne(id: number): Promise<any> {
    return await this.taskRepository.findOne(id);
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
    this.searchService.taskIndex(newTask);
    return await this.taskRepository.save(newTask);
  }

  public async update(task: IUpdateTask) {
    await this.searchService.countIndex('tasks', 'task');
    await this.searchService.searchTasks();
    return await this.taskRepository.createQueryBuilder().update('Task').where({ id: task.id })
      .set({title: task.title, description: task.description});
  }
}