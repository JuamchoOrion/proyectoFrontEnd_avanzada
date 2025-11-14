import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-host',
  standalone: true,
  templateUrl: './sidebar-host.html',
  styleUrls: ['./sidebar-host.css'],
})
export class SidebarHostComponent {
  nombre = 'María López';
  correo = 'marialopez@mail.com';
  telefono = '3109876543';
  fotoPerfil = '';

  nuevoAlojamiento() {
    console.log('Nuevo alojamiento');
  }

  verMetricas() {
    console.log('Ver métricas');
  }
}
