import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-profile',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  @Input() nombre?: string;
  @Input() telefono?: string;
  @Input() correo?: string;
  @Input() foto?: string;
}
