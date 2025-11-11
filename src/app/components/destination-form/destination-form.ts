import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.services';
import { CreateAccommodationDTO } from '../../models/create-accommodation-dto';

@Component({
  selector: 'app-destination-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './destination-form.html',
  styleUrls: ['./destination-form.css']
})
export class AccommodationFormComponent {
  dto: CreateAccommodationDTO = {
    title: '',
    description: '',
    city: '',
    address: '',
    latitude: null,
    longitude: null,
    pricePerNight: 0,
    maxCapacity: 1,
    services: [],
    images: []
  };

  constructor(private accommodationService: AccommodationService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
   this.dto.latitude = this.dto.latitude ? parseFloat(this.dto.latitude as any) : null;
this.dto.longitude = this.dto.longitude ? parseFloat(this.dto.longitude as any) : null;

    this.accommodationService.createAccommodation(this.dto).subscribe({
      next: (res) => {
        alert('Alojamiento creado correctamente');
        form.resetForm();
      },
      error: (err) => {
        console.error('Error al crear alojamiento:', err);
        alert('Error al guardar alojamiento');
      }
    });
  }

 toggleService(service: string, checked: boolean) {
  const value = service.toUpperCase();
  if (checked && !this.dto.services.includes(service)) {
    this.dto.services.push(service);
  } else if (!checked) {
    this.dto.services = this.dto.services.filter(s => s !== service);
  }
}

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.dto.images = Array.from(input.files);
    }
  }
}