import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.services';
import { CreateAccommodationDTO } from '../../models/create-accommodation-dto';
import { MapService } from '../../services/map/map-service';

@Component({
  selector: 'app-destination-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './destination-form.html',
  styleUrls: ['./destination-form.css'],
})
export class AccommodationFormComponent implements OnInit {
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
    images: [],
  };

  imagePreviews: string[] = [];

  private allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

  constructor(private accommodationService: AccommodationService, private mapService: MapService) {}

  ngOnInit(): void {
    //  Crear el mapa cuando carga el formulario
    setTimeout(() => {
      this.mapService.create('map');

      // Escuchar clicks para obtener las coordenadas
      this.mapService.addMarker().subscribe((lngLat) => {
        this.dto.latitude = lngLat.lat;
        this.dto.longitude = lngLat.lng;
      });
    }, 300);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    if (!this.dto.latitude || !this.dto.longitude) {
      alert('Debes seleccionar la ubicación en el mapa.');
      return;
    }

    if (this.dto.images.length === 0) {
      alert('Debes subir al menos una imagen.');
      return;
    }

    const formData = new FormData();

    for (let key in this.dto) {
      const value = (this.dto as any)[key];

      if (value === null || value === undefined) continue;

      if (key === 'images') {
        this.dto.images.forEach((file: File) => formData.append('images', file));
      } else if (key === 'services') {
        this.dto.services.forEach((s) => formData.append('services', s));
      } else {
        formData.append(key, value);
      }
    }

    this.accommodationService.createAccommodation(formData).subscribe({
      next: () => {
        alert('✅ Alojamiento creado correctamente.');
        form.resetForm();
        this.imagePreviews = [];
        this.dto.images = [];
      },
      error: (err) => {
        console.error('❌ Error:', err);
        alert(err.error?.content || 'Error al guardar alojamiento.');
      },
    });
  }

  toggleService(service: string, checked: boolean) {
    const value = service.toUpperCase();
    if (checked && !this.dto.services.includes(value)) {
      this.dto.services.push(value);
    } else if (!checked) {
      this.dto.services = this.dto.services.filter((s) => s !== value);
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    const maxFiles = 10;
    const maxFileSizeMB = 50;

    if (files.length + this.dto.images.length > maxFiles) {
      alert(`Solo puedes subir un máximo de ${maxFiles} imágenes.`);
      input.value = '';
      return;
    }

    for (const file of files) {
      if (!this.allowedTypes.includes(file.type)) {
        alert(`Formato inválido: ${file.name}`);
        input.value = '';
        return;
      }

      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxFileSizeMB) {
        alert(`El archivo ${file.name} excede ${maxFileSizeMB} MB.`);
        input.value = '';
        return;
      }
    }

    this.dto.images.push(...files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  removeImage(index: number) {
    this.dto.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }
}
