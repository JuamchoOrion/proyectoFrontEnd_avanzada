import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.services';
import { UserService } from '../../services/user.services';
import { UserProfileDTO } from '../../models/user-dto';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Contact extends UserProfileDTO {
  displayName?: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class Chat implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  messages: any[] = [];
  newMessage = '';

  newEmail = '';
  firstMessage = '';

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit(): void {
    // 🔌 Conectar WebSocket con cookies (sesión activa)
    this.chatService.connect();

    // 🔄 Cargar lista de contactos
    this.loadContacts();

    // 📩 Escuchar mensajes en tiempo real
    this.chatService.getMessages().subscribe((msg) => {
      const selectedId = this.selectedContact?.id || this.selectedContact?.email;
      if (msg.receiverId === selectedId || msg.senderId === selectedId) {
        this.messages.push(msg);
      }
    });
  }

  // =========================
  // 📜 Cargar lista de contactos
  // =========================
  loadContacts(): void {
    this.chatService.getContacts().subscribe({
      next: (data) => {
        console.log('📦 Datos recibidos del backend:', data);

        const userIds = Array.isArray(data) ? data : [];
        if (userIds.length === 0) {
          this.contacts = [];
          console.log('⚠️ No hay contactos');
          return;
        }

        // Obtener info de cada usuario
        const userRequests = userIds.map((userId: string) =>
          this.userService.getUserById(userId).pipe(
            catchError(() => {
              return of({
                id: userId,
                username: userId,
                email: userId,
                photoUrl: null,
              } as UserProfileDTO);
            })
          )
        );

        forkJoin(userRequests).subscribe({
          next: (users: UserProfileDTO[]) => {
            this.contacts = users.map((user) => ({
              id: user.id,
              username: user.username,
              email: user.email,
              phone: user.phone,
              photoUrl: user.photoUrl,
              displayName: user.username || user.email || user.id,
            }));
          },
          error: (err) => console.error('❌ Error al cargar usuarios:', err),
        });
      },
      error: (err) => console.error('❌ Error al cargar contactos:', err),
    });
  }

  // =========================
  // 💬 Abrir un chat
  // =========================
  openChat(contact: Contact): void {
    console.log('📱 Abriendo chat con:', contact);
    this.selectedContact = { ...contact };

    const contactId = contact.id || contact.email;
    this.chatService.getChat(contactId).subscribe({
      next: (data) => {
        console.log('💬 Mensajes cargados:', data);
        this.messages = data;
      },
      error: (err) => console.error('❌ Error al cargar mensajes:', err),
    });
  }

  // =========================
  // ✉️ Enviar mensaje
  // =========================
  send(): void {
    if (!this.newMessage.trim() || !this.selectedContact) return;

    const contactId = this.selectedContact.id || this.selectedContact.email;

    // 🚀 Llamar API para enviar y guardar el mensaje
    this.chatService.sendMessage(contactId, this.newMessage).subscribe({
      next: () => {
        this.messages.push({
          senderId: 'Yo',
          receiverId: contactId,
          content: this.newMessage,
          timestamp: new Date().toISOString(),
        });
        this.newMessage = '';
      },
      error: (err) => console.error('❌ Error al enviar mensaje:', err),
    });
  }

  // =========================
  // 🟢 Iniciar nuevo chat
  // =========================
  startNewChat(): void {
    if (!this.newEmail.trim() || !this.firstMessage.trim()) return;

    this.chatService.startChat(this.newEmail, this.firstMessage).subscribe({
      next: () => {
        alert('✅ Chat iniciado correctamente');
        this.newEmail = '';
        this.firstMessage = '';
        this.loadContacts();
      },
      error: (err) => {
        console.error('❌ Error al iniciar chat:', err);
        alert('Error: no se pudo iniciar el chat (correo no válido o backend caído).');
      },
    });
  }

  // =========================
  // 🧾 Utilidades
  // =========================
  getContactDisplayName(contact: Contact): string {
    return contact.displayName || contact.username || contact.email || contact.id;
  }

  trackByContactId(index: number, contact: Contact): string {
    return contact.id;
  }
}
