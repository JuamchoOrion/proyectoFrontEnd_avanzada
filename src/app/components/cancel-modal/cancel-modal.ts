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
  @Input() reserva: any;
  @Output() confirmar = new EventEmitter<void>();

  confirmarAccion() {
    this.confirmar.emit();
  }
}
