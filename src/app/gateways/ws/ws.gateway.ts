import { WebSocketGateway, OnGatewayConnection, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import * as dotenv from 'dotenv';

dotenv.config();
const wsPort = parseInt(process.env.APP_WS_PORT, 10) || 5001;

@WebSocketGateway(wsPort)
export class WsGateway implements OnGatewayConnection {
  @WebSocketServer()
  ws: Socket;

  handleConnection(@ConnectedSocket() client: Socket) {
    client.emit('handshake', { message: 'Dibbbre websocket server handshake' });
  }
}
