import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import { Project } from "./project.entity";
import { Connection } from "typeorm";
import {User} from "../users/user.entity";

@Injectable()
export class ProjectsService {
  constructor(private readonly connection: Connection) {}

  private readonly projectRepository = this.connection.getRepository(Project);
  private readonly userRepository = this.connection.getRepository(User);

  public async findOne(params): Promise<any> {
    return await this.projectRepository.findOne(params)
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

  public async myProjects(id: number): Promise<any> {
    return await this.userRepository.findOne({id: id})
      .then(user => Promise.resolve(user.projects));
  }

  public async update(project: Project) {
    return await this.projectRepository.update({id: project.id}, project);
  }

  public async delete(id: number) {
    return await this.projectRepository.delete({ id: id});
  }
}