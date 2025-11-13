import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private ws?: WebSocket;
  private messages$ = new Subject<any>();
  private apiUrl = 'http://localhost:9090/chat';
  private wsUrl = 'ws://localhost:9090/chat-websocket';

  constructor(private http: HttpClient) {}

  // ============================
  // 🔌 Conectar con WebSocket
  // ============================
  connect(): void {
    // Evita reconectar si ya está activo
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('⚙️ Conexión WebSocket ya activa');
      return;
    }

    // Crea conexión WebSocket (usa cookie automáticamente si el backend está en el mismo dominio)
    this.ws = new WebSocket(this.wsUrl);

    this.ws.onopen = () => console.log('✅ Conectado al WebSocket');

    this.ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        console.log('📩 Mensaje recibido:', data);
        this.messages$.next(data);
      } catch (err) {
        console.warn('📩 Mensaje plano recibido:', msg.data);
      }
    };

    this.ws.onerror = (err) => console.error('⚠️ Error WebSocket:', err);
    this.ws.onclose = () => console.warn('🔴 Desconectado del WebSocket');
  }

  // ============================
  // 💬 Enviar mensaje
  // ============================
  // 💬 Enviar mensaje (REST + cookies)
  sendMessage(receiverId: string, content: string) {
    const payload = { receiverId, content, timestamp: new Date().toISOString() };

    console.log('📤 Enviando mensaje (REST):', payload);
    return this.http.post(`${this.apiUrl}/send`, payload, {
      withCredentials: true,
      responseType: 'text',
    });
  }

  // ============================
  // 📥 Obtener mensajes antiguos
  // ============================
  getChat(friendId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/${friendId}`, {
      withCredentials: true,
    });
  }

  // ============================
  // 📒 Obtener lista de contactos
  // ============================
  getContacts() {
    return this.http.get<string[]>(`${this.apiUrl}/contacts`, {
      withCredentials: true,
    });
  }

  // ============================
  // 🟢 Iniciar nuevo chat
  // ============================
  startChat(email: string, content: string) {
    return this.http.post(
      `${this.apiUrl}/start/${email}`,
      { content },
      { responseType: 'text', withCredentials: true }
    );
  }

  // ============================
  // 🧭 Obtener mensajes en vivo
  // ============================
  getMessages(): Observable<any> {
    return this.messages$.asObservable();
  }
}
