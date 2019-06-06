import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit, SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import {Task} from "./task.entity";

@WebSocketGateway(3001, { namespace: 'tasks' })
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  private readonly logger = new Logger();

  @WebSocketServer()
  wss;

  @SubscribeMessage('joinRoom')
  joinRoom(socket: Socket, room: string) {
    socket.join(room);
    this.wss.to(room).emit('joined', { user: socket.id, room: room });
    socket.to(room).emit('roomJoined', { room: room });
  }

  @SubscribeMessage('data')
  onData(socket:Socket, room: string) {
    this.wss.to(room).emit();
  }

  @SubscribeMessage('changeStatus')
  onChange(socket: Socket, room: string, taskId: number, newStatus: string) {
    this.wss.to(room).emit('changeStatus', {taskId:  taskId, status: newStatus});
  }

  afterInit(server): any {
    this.logger.log('Room init');
  }

  handleConnection(socket: Socket): any {
    this.logger.log('Client ' + socket.id + ' connected');
    socket.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(socket: Socket): any {
    this.logger.log('Client ' + socket.id + ' disconnected');
  }
}