import {Connection} from "typeorm";
import {Task} from "./task.entity";

export class TasksService {
  constructor(private readonly connection: Connection) {}

  private readonly taskRepository = this.connection.getRepository(Task);

  public async findOne(id: number): Promise<any> {
    return this.taskRepository.findOne(id);
  }
}