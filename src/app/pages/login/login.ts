import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone // ✅ añade esto
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log('Datos enviados:', this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        Swal.fire('Éxito', 'Login exitoso', 'success');

        this.ngZone.run(() => this.router.navigate(['/landing']));
      },
      error: (error) => {
        const backendMsg = error.error?.content || error.error?.message || 'Ha ocurrido un error';
        Swal.fire('Error', backendMsg, 'error');
      },
    });
  }
}
