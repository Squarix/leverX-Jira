import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render, Req,
  UploadedFile, UseGuards,
  UseInterceptors,
  ValidationPipe
} from "@nestjs/common";
import {Project} from "./project.entity";
import {ProjectsService} from "./projects.service";
import {Status} from "../tasks/task.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";
import {AuthGuard} from "@nestjs/passport";

@Controller('projects')
export class ProjectsController {
  constructor( private readonly projectService:ProjectsService) {}

  @Get('/new')
  @UseGuards(AuthGuard('jwt'))
  @Render('projects/views/new')
  public async new(@Req() req) {
    console.log(req.user.id);
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


  @Get('/:id')
  @Render('projects/views/show')
  public async show(@Param('id') id: number) {
    await this.projectService.sendMail();
    let project:Project = await this.projectService.findOne({id: id});
    return { project: project,
      openTasks: project.tasks.filter(t => t.status == Status.Open),
      pendingTasks: project.tasks.filter(t => t.status == Status.Active),
      closedTasks: project.tasks.filter(t => t.status == Status.Closed)
    };
  }

  @Delete('/:id')
  public async delete(@Param('id') id: number) {
    return await this.projectService.delete(id);
  }

  @Put('/:id')
  public async update() {

  }

}