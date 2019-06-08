import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty, MaxLength} from "class-validator";
import { User } from "../users/user.entity";
import { Project } from "../projects/project.entity";
import { Comment} from "../comments/comment.entity";

export enum Status {
  Open = 'open',
  Closed = 'closed',
  Active = 'active'
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @MaxLength(50)
  title: string;

  @Column('text')
  @IsNotEmpty()
  description: string;

  @Column()
  status: Status;

  @ManyToOne(type => User, user => user.tasks)
  user: User;

  @ManyToOne(type => Project, project => project.tasks)
  project: Project;
}
