import {Controller, Delete, Get, Param, Put, Render} from "@nestjs/common";
import {TasksService} from "./tasks.service";

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Get('/:id')
  @Render('tasks/views/show')
  async show(@Param('id') id: number) {
    return {task: await this.taskService.findOne(id)};
  }

  @Get('/info/:id')
  async info(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Delete('/:id')
  async delete() {

  }

  @Put('/:id')
  async update() {

  }


}