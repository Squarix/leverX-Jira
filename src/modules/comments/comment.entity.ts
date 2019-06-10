import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "../users/user.entity";
import { Task } from "../tasks/task.entity";
import {Project} from "../projects/project.entity";

export enum Commentable {
  Project = 'Project',
  Comment = 'Comment',
  Task    = 'Task'
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(type => User, user => user.comments)
  user: User;
  
  @Column()
  commentableType: string;
  
  @Column()
  commentableId: number;

  comments: Comment[] | null;

}
