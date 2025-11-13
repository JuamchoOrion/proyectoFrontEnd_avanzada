import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileFormComponent } from '../../components/edit-profile-form/edit-profile-form';
import { SidebarProfileComponent } from '../../components/sidebar-profile/sidebar-profile';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, SidebarProfileComponent, EditProfileFormComponent],
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.css'],
})
export class EditProfilePage {}