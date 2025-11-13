import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { SidebarHostComponent } from '../../components/sidebar-host/sidebar-host';
import { Notifications } from '../../components/notifications/notifications';
import { Footer } from '../../components/footer/footer';
import { UserService } from '../../services/user.services';
import { UserProfileDTO } from '../../models/user-dto';

@Component({
  selector: 'app-profile-host',
  standalone: true,
  imports: [CommonModule, Navbar, SidebarHostComponent, Notifications, Footer],
  templateUrl: './profile-host.html',
  styleUrls: ['./profile-host.css'],
})
export class ProfileHost implements OnInit {
  hostData?: UserProfileDTO;
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.hostData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el perfil del anfitrión:', err);
        this.loading = false;
      },
    });
  }
}
