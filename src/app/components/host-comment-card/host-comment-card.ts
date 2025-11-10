import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewCard } from '../review-card/review-card';

@Component({
  selector: 'app-host-comment-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReviewCard],
  templateUrl: './host-comment-card.html',
  styleUrls: ['./host-comment-card.css']
})
export class HostCommentCardComponent {
  @Input() comment: any; // Comentario con posibles campos: author, rating, comment, reply
  @Output() replySent = new EventEmitter<string>();

  replyText: string = '';

  sendReply() {
    if (this.replyText.trim()) {
      this.replySent.emit(this.replyText);
      this.replyText = '';
    }
  }
}
