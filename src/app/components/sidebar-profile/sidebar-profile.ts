import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.services';
import { UserProfileDTO } from '../../models/user-dto';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-profile.html',
  styleUrls: ['./sidebar-profile.css'],
})
export class SidebarProfileComponent implements OnInit {
  host: UserProfileDTO | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (profile: UserProfileDTO) => {
        this.host = profile;
        console.log('🟢 Perfil del anfitrión cargado:', profile);
      },
      error: (err) => console.error('❌ Error al cargar el perfil del anfitrión:', err),
    });
  }
}
