import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private ws!: WebSocket;
  private messages$ = new Subject<any>();

  private apiUrl = 'http://localhost:9090/chat';
  private wsUrl = 'ws://localhost:9090/ws-chat'; // backend

  constructor(private http: HttpClient) {}

  // ================================
  // 🔌 Conectar WebSocket
  // ================================
  connect(userId: string): void {
    this.ws = new WebSocket(`${this.wsUrl}/${userId}`);

    this.ws.onopen = () => console.log('🟢 WS conectado como', userId);

    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        this.messages$.next(msg);
      } catch {
        console.warn('Mensaje WS (texto plano):', event.data);
      }
    };

    this.ws.onerror = (e) => console.error('❌ WS error:', e);
    this.ws.onclose = () => console.warn('🔴 WS cerrado');
  }

  // ================================
  // 🟦 Enviar mensaje por REST (BD)
  // ================================
  sendMessage(receiverId: string, content: string) {
    return this.http.post(
      `${this.apiUrl}/send`,
      { receiverId, content },
      { withCredentials: true, responseType: 'text' }
    );
  }

  // ================================
  // 🟩 Enviar TIEMPO REAL (WS)
  // ================================

  sendWS(receiverId: string, content: string) {
    const msg = {
      receiverId,
      content,
      timestamp: new Date().toISOString(),
    };

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  // ================================
  // 📥 Obtener historial
  // ================================
  getChat(friendId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/${friendId}`, {
      withCredentials: true,
    });
  }

  // ================================
  // 📒 Obtener contactos
  // ================================
  getContacts() {
    return this.http.get<string[]>(`${this.apiUrl}/contacts`, {
      withCredentials: true,
    });
  }

  // ================================
  // 🟢 Iniciar nuevo chat
  // ================================
  startChat(email: string, content: string) {
    return this.http.post(
      `${this.apiUrl}/start/${email}`,
      { content },
      { withCredentials: true, responseType: 'text' }
    );
  }

  // ================================
  // 📡 Stream en tiempo real
  // ================================
  getMessages(): Observable<any> {
    return this.messages$.asObservable();
  }
}
