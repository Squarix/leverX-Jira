import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
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
import {UsersService} from "../users/users.service";

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor( private readonly projectService:ProjectsService,
               private readonly userService: UsersService) {}

  @Get('/new')
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
  public async create(@UploadedFile() image,
                      @Body(new ValidationPipe()) project: Project,
                      @Req() req) {
    // Upload file
    project.owner = await this.userService.findOne({id: req.user.id});
    return this.projectService.create(project);
  }


  @Get('/:id')
  @Render('projects/views/show')
  public async show(@Param('id') id: number, @Req() req) {
    //await this.projectService.sendMail();
    let project:Project = await this.projectService.findForUser(req.user.id, id);
    if (!project)
      throw new BadRequestException('You picked the wrong house fool');
    console.log(project);
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