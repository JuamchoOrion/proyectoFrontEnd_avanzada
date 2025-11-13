import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.services';
import { UserProfileDTO } from '../../models/user-dto';

@Component({
  selector: 'app-sidebar-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-profile.html',
  styleUrls: ['./sidebar-profile.css'],
})
export class SidebarProfileComponent implements OnInit {

  host: UserProfileDTO | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (profile) => this.host = profile,
      error: (err) => console.error('❌ Error al cargar perfil', err),
    });
  }

  goToEdit() {
    this.router.navigate(['/edit-profile']);
  }
}