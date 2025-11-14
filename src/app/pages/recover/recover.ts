import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.services';
import { ResetPasswordDTO } from '../../models/reset-password-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './recover.html',
  styleUrls: ['./recover.css'],
})
export class Recover {
  email = '';
  code = '';
  newPassword = '';
  step: 'send' | 'confirm' = 'send';

  constructor(private authService: AuthService) {}

  // 1️⃣ ENVIAR CÓDIGO
  sendCode() {
    if (!this.email.trim()) {
      Swal.fire('Advertencia', 'Debes ingresar un correo', 'warning');
      return;
    }

    this.authService.recoverPassword(this.email).subscribe({
      next: () => {
        Swal.fire('Código enviado', 'Revisa tu correo electrónico', 'success');
        this.step = 'confirm';
      },
      error: (err) => {
        const msg = err.error?.content || err.error || 'No se pudo enviar el código';
        Swal.fire('Error', msg, 'error');
      },
    });
  }

  // 2️⃣ CONFIRMAR Y CAMBIAR CONTRASEÑA
  changePassword() {
    if (!this.code.trim() || !this.newPassword.trim()) {
      Swal.fire('Advertencia', 'Completa todos los campos', 'warning');
      return;
    }

    const dto: ResetPasswordDTO = {
      email: this.email,
      code: this.code,
      newPassword: this.newPassword,
    };

    this.authService.confirmPasswordReset(dto).subscribe({
      next: () => {
        Swal.fire('Contraseña actualizada', 'Ya puedes iniciar sesión', 'success');
      },
      error: (err) => {
        const msg = err.error?.content || err.error || 'Error al cambiar la contraseña';
        Swal.fire('Error', msg, 'error');
      },
    });
  }
}
