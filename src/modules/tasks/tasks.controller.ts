import {Controller, Delete, Get, Param, Put} from "@nestjs/common";
import {TasksService} from "./tasks.service";

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Get('/:id')
  async show(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Delete('/:id')
  async delete() {
  }

  @Put('/:id')
  async update() {

  }


}