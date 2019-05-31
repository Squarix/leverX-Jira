import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany} from "typeorm";
import { Project } from "../projects/project.entity";
import { Task }    from "../tasks/task.entity";
import { Comment } from "../comments/comment.entity";
import { IsDate, IsEmail, IsNotEmpty, MaxLength} from "class-validator";

enum Status {
  Confirmed = 'confirmed',
  NotConfirmed = 'notConfirmed',
  Banned = 'banned'
}

enum Role {
  Admin = 'admin',
  User  = 'user'
}

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

  @Column({ type: 'string', default: Role.User })
  role: Role;

  @Column({ type: 'string', default: Status.NotConfirmed })
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
