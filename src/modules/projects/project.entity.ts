import {Entity, ManyToMany, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable} from "typeorm";
import { User } from "../users/user.entity";
import {Task} from "../tasks/task.entity";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length:40 })
  @IsNotEmpty()
  name: string;

  @Column()
  image: string;

  @ManyToOne(type => User, user => user.ownProjects)
  @JoinTable()
  owner: User;

  @OneToMany(type => Task, task => task.project)
  tasks: Task[];

  @ManyToMany(type => User, user => user.projects)
  @JoinTable()
  users: User[];

}
