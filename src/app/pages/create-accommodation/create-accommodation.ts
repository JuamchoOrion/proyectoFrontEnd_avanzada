import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarProfileComponent } from '../../components/sidebar-profile/sidebar-profile';
import { AccommodationFormComponent } from '../../components/destination-form/destination-form';
import { Navbar } from '../../components/navbar/navbar'; // 👈 tu navbar

@Component({
  selector: 'app-create-accommodation',
  standalone: true,
  imports: [CommonModule, SidebarProfileComponent, AccommodationFormComponent, Navbar],
  templateUrl: './create-accommodation.html',
  styleUrls: ['./create-accommodation.css'],
})
export class CreateAccommodationComponent {}