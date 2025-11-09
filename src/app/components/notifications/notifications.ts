import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css'],
})
export class Notifications {
  @Input() notificaciones: any[] = [];
  @Output() limpiar = new EventEmitter<void>();

  limpiarLista() {
    this.limpiar.emit();
  }
}
