// import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { GameLogicService } from './game-logic.service';
// import { PlayerMoveDto } from './dto/player-move.dto';
// import { BallMoveDto } from './dto/ball-move.dto';

// @WebSocketGateway()
// export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   constructor(private gameLogicService: GameLogicService) {}

//   handleConnection(client: Socket) {
//     // Handle new player connection
    
//     // Assign player to a game room
//   }

//   handleDisconnect(client: Socket) {
//     // Handle player disconnection
//     // Remove player from game room
//   }

//   @SubscribeMessage('playerMove')
//   handlePlayerMove(@ConnectedSocket() client: Socket, @MessageBody() data: PlayerMoveDto) {
//     // Update player position in the game state
//     // Broadcast the updated player position to all clients in the room
//   }

//   @SubscribeMessage('ballMove')
//   handleBallMove(@ConnectedSocket() client: Socket, @MessageBody() data: BallMoveDto) {
//     // Update ball position in the game state
//     // Perform game logic calculations
//     // Broadcast the updated ball position and score to all clients in the room
//   }
// }