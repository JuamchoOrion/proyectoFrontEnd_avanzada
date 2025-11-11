import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-sidebar-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-profile.html',
  styleUrls: ['./sidebar-profile.css'],
})
export class SidebarProfileComponent implements OnInit {
  host: { id: string; name: string; email: string; phone: string; photoUrl?: string } | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (profile) => (this.host = profile),
      error: (err) => console.error('❌ Error al cargar el perfil del anfitrión:', err),
    });
  }
}