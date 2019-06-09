import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit, SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { IChangeStatus } from "./interfaces/IChangeStatus";
import { IAddTask } from "./interfaces/IAddTask";
import { IUpdateTask } from "./interfaces/IUpdateTask";
import {IDeleteTask} from "./interfaces/IDeleteTask";


@WebSocketGateway({ namespace: 'tasks' })
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect{
  private readonly logger = new Logger();

  constructor(private readonly tasksService: TasksService) {}

  @WebSocketServer()
  wss;

  @SubscribeMessage('joinRoom')
  joinRoom(socket: Socket, room: string) {
    socket.join(room);
    this.wss.to(room).emit('joined', { user: socket.id, room: room });
    socket.to(room).emit('roomJoined', { room: room });
  }

  @SubscribeMessage('changeStatus')
  onChange(socket: Socket, data: IChangeStatus) {
    this.logger.log('changingStatus: ' + data.room + data.taskId + data.newStatus);
    this.tasksService.changeStatus(data.taskId, data.newStatus).then(
      () =>
    this.wss.to(data.room).emit('changeStatus', {id:  data.taskId, status: data.newStatus}));
  }

  @SubscribeMessage('addTask')
  onAdd(socket: Socket, task: IAddTask) {
    console.log(task);
    this.tasksService.create(task)
      .then(newTask => {
        console.log('here');
        this.wss.to(task.room).emit('addTask', newTask);
      });
  }

  @SubscribeMessage('deleteTask')
  onDelete(socket: Socket, data: IDeleteTask) {
    this.tasksService.delete(data.taskId).then(
      () => this.wss.to(data.room).emit('removeTask', data.taskId)
    );
  }

  @SubscribeMessage('updateTask')
  onUpdate(socket: Socket, task: IUpdateTask) {
    this.logger.log('Updating task'+ task.id);
    this.tasksService.update(task).then(() => {
      this.wss.to(task.room).emit('updateTask', task)
    });
  }

  handleConnection(socket: Socket): any {
    this.logger.log('Client ' + socket.id + ' connected');
    socket.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(socket: Socket): any {
    this.logger.log('Client ' + socket.id + ' disconnected');
  }
}