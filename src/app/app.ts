import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/auth.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  isLoginPage = false;
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        this.isLoginPage =
          url.includes('/login') || url.includes('/register') || url.includes('/recover');
      });

    // ✅ Verifica el estado de sesión directamente (sin subscribe)
    this.isLoggedIn = this.authService.isAuthenticated();
    console.log('🟢 Usuario logueado:', this.isLoggedIn);
  }
}
