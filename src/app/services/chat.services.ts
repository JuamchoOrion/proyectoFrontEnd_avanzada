import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient!: Client;

  private socketUrl = `http://localhost:9090/chat-websocket`; // http://localhost:9090/chat-websocket
  private tokenUrl = `http://localhost:9090/api/auth/socket-token`; // obtiene el JWT desde la cookie

  constructor(private http: HttpClient) {}

  /** 🔹 Conecta el WebSocket autenticado con el JWT */
  connect(onMessage: (msg: any) => void): void {
    this.http
      .get<{ error: boolean; content: string }>(this.tokenUrl, { withCredentials: true })
      .subscribe({
        next: (res) => {
          const jwt = res.content;
          if (!jwt) {
            console.error('❌ No se pudo obtener el token para el socket');
            return;
          }

          // Crear conexión con SockJS
          const socket = new SockJS(this.socketUrl);
          this.stompClient = new Client({
            webSocketFactory: () => socket,
            connectHeaders: { Authorization: `Bearer ${jwt}` },
            debug: (str) => console.log(str),
          });

          this.stompClient.onConnect = () => {
            console.log('🟢 WebSocket conectado');
            // Te suscribes al canal personal del usuario
            this.stompClient.subscribe(
              `/topic/chat/${this.getUserId(jwt)}`,
              (message: IMessage) => {
                const msgBody = JSON.parse(message.body);
                onMessage(msgBody);
              }
            );
          };

          this.stompClient.activate();
        },
        error: (err) => console.error('❌ Error al obtener token del socket:', err),
      });
  }

  /** 📤 Envía un mensaje */
  sendMessage(receiverId: string, content: string): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error('⚠️ No hay conexión activa al chat');
      return;
    }
    const payload = { receiverId, content };
    this.stompClient.publish({ destination: '/app/send', body: JSON.stringify(payload) });
  }

  /** 🔌 Desconectar */
  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('🔴 WebSocket desconectado');
    }
  }

  /** 🧩 Extrae el "sub" (id del usuario) del JWT */
  private getUserId(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch {
      return 'desconocido';
    }
  }
}
