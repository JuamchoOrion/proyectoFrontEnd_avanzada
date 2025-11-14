import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.services';
import { UserService } from '../../services/user.services';
import { UserProfileDTO } from '../../models/user-dto';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Footer } from '../../components/footer/footer';

interface Contact extends UserProfileDTO {
  displayName?: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, Footer],
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

  me!: UserProfileDTO;

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit(): void {
    // 1) Obtener perfil y conectar WS
    this.userService.getUserProfile().subscribe((me) => {
      this.me = me;
      this.chatService.connect(me.id);
    });

    // 2) Cargar contactos
    this.loadContacts();

    this.chatService.getMessages().subscribe((msg) => {
      // Si no hay chat abierto, no hacemos nada
      if (!this.selectedContact) return;

      const friendId = this.selectedContact.id;

      // Casos que deben actualizar el chat:
      // 1. Yo envío -> senderId = yo, receiverId = amigo
      // 2. Me escriben -> senderId = amigo, receiverId = yo

      const isForThisChat =
        (msg.senderId === this.me.id && msg.receiverId === friendId) ||
        (msg.senderId === friendId && msg.receiverId === this.me.id);

      if (isForThisChat) {
        this.messages.push(msg);
      }
    });
  }

  // ================================
  loadContacts(): void {
    this.chatService.getContacts().subscribe({
      next: (contactIds) => {
        const reqs = contactIds.map((id) =>
          this.userService.getUserById(id).pipe(
            catchError(() =>
              of({
                id,
                username: id,
                email: id,
                phone: null,
                photoUrl: null,
              } as UserProfileDTO)
            )
          )
        );

        forkJoin(reqs).subscribe((users) => {
          this.contacts = users.map((u) => ({
            ...u,
            displayName: u.username || u.email || u.id,
          }));
        });
      },
    });
  }

  // ================================
  openChat(contact: Contact): void {
    this.selectedContact = contact;

    this.chatService.getChat(contact.id).subscribe((data) => {
      this.messages = data;
    });
  }

  // ================================
  send(): void {
    if (!this.newMessage.trim() || !this.selectedContact) return;

    const receiverId = this.selectedContact.id;

    // 1️⃣ Guardar en BD
    this.chatService.sendMessage(receiverId, this.newMessage).subscribe();

    // 2️⃣ Enviar en tiempo real
    this.chatService.sendWS(receiverId, this.newMessage);

    this.newMessage = '';
  }

  // ================================
  startNewChat(): void {
    if (!this.newEmail.trim() || !this.firstMessage.trim()) return;

    this.chatService.startChat(this.newEmail, this.firstMessage).subscribe(() => {
      alert('Chat iniciado');
      this.loadContacts();
      this.newEmail = '';
      this.firstMessage = '';
    });
  }

  getContactDisplayName(c: Contact): string {
    return c.displayName!;
  }

  trackByContactId(index: number, c: Contact): string {
    return c.id;
  }
}
