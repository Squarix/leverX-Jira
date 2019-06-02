import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany} from "typeorm";
import { Project } from "../projects/project.entity";
import { Task }    from "../tasks/task.entity";
import { Comment } from "../comments/comment.entity";
import { IsDate, IsEmail, IsNotEmpty, MaxLength} from "class-validator";
import { Role, Status } from "./enum";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @Column({ length: 50 })
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @Column('text')
  description: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsDate()
  createDate: Date;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ default: Role.USER })
  role: Role;

  @Column({ default: Status.NOTCONFIRMED })
  status: Status;

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(type => Task, task => task.user)
  tasks: Task[];

  @OneToMany(type => Project, project => project.owner)
  ownProjects: Project[];

  @ManyToMany(type => Project, project => project.users)
  projects: Project[];

}
