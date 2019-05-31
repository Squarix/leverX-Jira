import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length:40 })
  name: string;

  @Column()
  image: string;

  @ManyToOne(type => User, user => user.projects)
  user: User;
}
