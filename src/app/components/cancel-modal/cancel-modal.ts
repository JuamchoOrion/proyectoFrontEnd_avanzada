import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancel-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel-modal.html',
  styleUrls: ['./cancel-modal.css'],
})
export class CancelModal {

  @Input() reserva: any;   // ← ESTE FALTABA
  @Output() confirmar = new EventEmitter<void>(); // ← ESTE FALTABA

  confirmarAccion() {
    this.confirmar.emit();
  }
}