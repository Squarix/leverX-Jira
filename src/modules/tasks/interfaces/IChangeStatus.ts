import {Status} from "../task.entity";

export interface IChangeStatus {
  taskId: number;
  room: string;
  newStatus: Status;
}