import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);

    
    client.conn.on('error', (err: any) => {
      console.error('Connection error:', {
        request: err.req,
        code: err.code,
        message: err.message,
        context: err.context,
      });
    });
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, room: string): void {
    socket.join(room);
    console.log(`Client ${socket.id} joined room: ${room}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(socket: Socket, data: { content: string, user_id: number, roomTitle: string }): void {
    const { content, user_id, roomTitle } = data;

    this.server.to(roomTitle).emit('receiveMessage', {
      sender: socket.id,
      content,
    });
    console.log(roomTitle);
    console.log(`Message sent to room ${roomTitle}: ${content}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(socket: Socket, room: string): void {
    socket.leave(room);
    console.log(`Client ${socket.id} left room: ${room}`);
  }
}
