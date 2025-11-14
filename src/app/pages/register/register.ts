import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.services';
import { CreateUserDTO } from '../../models/createUser-dto';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private NgZone: NgZone
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['GUEST', Validators.required],
      dateBirth: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const userData: CreateUserDTO = this.registerForm.value;
    console.log('📦 Datos enviados:', userData);

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('✅ Registro exitoso, Por favor inicia sesion', response);
        alert('Registro exitoso, Por favor inicia sesion');
        this.NgZone.run(() => this.router.navigate(['/login']));
        this.registerForm.reset();
      },
      error: (error) => {
        console.error('❌ Error en el registro', error);
        alert('Error en el registro');
      },
    });
  }
}
