import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
  ValidationPipe
} from "@nestjs/common";
import { Project } from "./project.entity";
import { ProjectsService } from "./projects.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {constructExclusionsMap} from "tslint/lib/rules/completed-docs/exclusions";

@Controller('projects')
export class ProjectsController {
  @Get('/new')
  @Render('projects/views/new')
  public async new() {
    return {
      form: 'projects/views/_form'
    }
  }

  @Post('/new')
  @UseInterceptors(FileInterceptor('image'))
  public async create(@Body(new ValidationPipe()) project: Project, @UploadedFile() image) {
    console.log(image);
    console.log(project);
  }

  @Get('/:id')
  public async show(@Param('id') id: number) {

  }


}