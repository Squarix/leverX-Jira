import {
  Body,
  Controller, Delete,
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
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import {constructExclusionsMap} from "tslint/lib/rules/completed-docs/exclusions";
import {extname} from "path";

@Controller('projects')
export class ProjectsController {
  constructor( private readonly projectService:ProjectsService) {}

  @Get('/new')
  @Render('projects/views/new')
  public async new() {
    return {
      form: 'projects/views/_form'
    }
  }

  @Post('/new')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: '../../../public/project_avatars',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null)
          .map(() => (Math.round(Math.random() * 16))
            .toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  public async create(@UploadedFile() image, @Body(new ValidationPipe()) project: Project) {
    // Upload file
    // project.owner = current_user;
    return this.projectService.create(project);
  }


  @Get('/')
  public async myProjects() {
    let id = 15;
    return { projects: await this.projectService.myProjects(id) };
  }

  @Get('/:id')
  public async show(@Param('id') id: number) {
    return { project: await this.projectService.findOne({id: id}) };
  }

  @Delete('/:id')
  public async delete(@Param('id') id: number) {
    this.projectService.delete(id);
  }

}