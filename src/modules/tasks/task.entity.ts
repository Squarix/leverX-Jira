import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "../users/user.entity";
import { Project } from "../projects/project.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column('text')
  description: string;

  @Column('string')
  status: Status;

  @ManyToOne(type => User, user => user.tasks)
  user: User;

  @ManyToOne(type => Project, project => project.tasks)
  project: Project;
}

enum Status {
  Open = 'open',
  Closed = 'closed',
  Active = 'active'
}