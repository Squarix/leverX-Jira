import {Project} from "../../projects/project.entity";

export interface IAddTask {
  description: string;
  title: string;
  projectId: number;
}