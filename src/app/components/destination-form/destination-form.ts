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
  styleUrls: ['./destination-form.css'],
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
    images: [],
  };

  /** Vista previa de imágenes */
  imagePreviews: string[] = [];

  /** Tipos permitidos */
  private allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/gif',
  ];

  constructor(private accommodationService: AccommodationService) {}

  /** 🧾 Enviar formulario */
  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    if (this.dto.images.length === 0) {
      alert('Debes subir al menos una imagen.');
      return;
    }

    // Convertir coordenadas si existen
    this.dto.latitude = this.dto.latitude ? parseFloat(this.dto.latitude as any) : null;
    this.dto.longitude = this.dto.longitude ? parseFloat(this.dto.longitude as any) : null;

    const formData = new FormData();
    for (let key in this.dto) {
      const value = (this.dto as any)[key];

       if (value === null || value === undefined) continue;
      if (key === 'images') {
        this.dto.images.forEach((file: File) => formData.append('images', file));
      } else if (key === 'services') {
        this.dto.services.forEach((s) => formData.append('services', s));
      } else {
        formData.append(key, (this.dto as any)[key]);
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
        console.error('❌ Error al crear alojamiento:', err);

        // Mostrar mensaje claro del backend si existe
        if (err.error?.content) {
          alert(`⚠️ ${err.error.content}`);
        } else {
          alert('Error al guardar alojamiento. Revisa los campos o el tamaño de las imágenes.');
        }
      },
    });
  }

  /** ✅ Agregar o quitar servicios */
  toggleService(service: string, checked: boolean) {
    const value = service.toUpperCase();
    if (checked && !this.dto.services.includes(value)) {
      this.dto.services.push(value);
    } else if (!checked) {
      this.dto.services = this.dto.services.filter((s) => s !== value);
    }
  }

  /** 📸 Manejar selección de archivos con validación y preview */
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    const maxFiles = 10;
    const maxFileSizeMB = 50;

    // ⚠️ Validar cantidad total
    if (files.length + this.dto.images.length > maxFiles) {
      alert(`Solo puedes subir un máximo de ${maxFiles} imágenes.`);
      input.value = '';
      return;
    }

    // ⚠️ Validar tipos MIME y tamaños
    for (const file of files) {
      if (!this.allowedTypes.includes(file.type)) {
        alert(`El archivo ${file.name} no es un formato de imagen válido (solo JPG, PNG, WEBP, GIF).`);
        input.value = '';
        return;
      }

      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxFileSizeMB) {
        alert(`El archivo ${file.name} excede los ${maxFileSizeMB} MB permitidos.`);
        input.value = '';
        return;
      }
    }

    // ✅ Agregar archivos al DTO
    this.dto.images.push(...files);

    // ✅ Crear vistas previas
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
      reader.readAsDataURL(file);
    });

    // 🔄 limpiar input (permite volver a abrir el selector)
    input.value = '';
  }

  /** 🧹 Eliminar imagen de la lista y vista previa */
  removeImage(index: number) {
    this.dto.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }
}