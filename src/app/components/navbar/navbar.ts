import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.validateToken().subscribe({
      next: (response) => {
        this.isLoggedIn = response.content === true;
        console.log('🔐 Sesión activa:', this.isLoggedIn);
      },
      error: (err) => {
        console.error('❌ Error validando token:', err);
        this.isLoggedIn = false;
      },
    });

    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.custom-navbar');
      if (window.scrollY > 20) navbar?.classList.add('scrolled');
      else navbar?.classList.remove('scrolled');
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('❌ Error al cerrar sesión:', err),
    });
  }
}
