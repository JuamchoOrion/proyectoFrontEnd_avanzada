import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarProfileComponent } from '../../components/sidebar-profile/sidebar-profile';
import { EditAccommodationFormComponent } from '../../components/edit-accommodation-form/edit-accommodation-form';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-edit-accommodation',
  standalone: true,
  imports: [CommonModule, SidebarProfileComponent, EditAccommodationFormComponent, Navbar],
  templateUrl: './edit-accommodation.html',
  styleUrls: ['./edit-accommodation.css'],
})
export class EditAccommodationComponent {}
