import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.services';
import { EditAccommodationDTO } from '../../models/edit-accommodation-dto';

@Component({
  selector: 'app-edit-accommodation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-accommodation-form.html',
  styleUrls: ['./edit-accommodation-form.css']
})
export class EditAccommodationFormComponent implements OnInit {
  dto: EditAccommodationDTO = {} as EditAccommodationDTO;
  loading = true;
  error = '';

  constructor(
    private accommodationService: AccommodationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID de alojamiento no proporcionado';
      this.loading = false;
      return;
    }

    this.accommodationService.getAccommodationById(id).subscribe({
      next: (data) => {
        this.dto = {
          title: data.description,
          description: data.description,
          city: data.city,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          pricePerNight: data.pricePerNight,
          maxGuests: data.maxGuests,
          images: this.dto.images || [],
          services: data.accommodationServiceTypes || [], // ✅ nunca null
          mainImage: data.mainImage || ''               // ✅ nunca null
        };
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar alojamiento';
        this.loading = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!this.dto || form.invalid) return;

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID de alojamiento no válido';
      return;
    }

    // Asegurarse de que services y mainImage nunca sean null antes de enviar
    const payload: EditAccommodationDTO = {
      ...this.dto,
      services: this.dto.services || [],
      mainImage: this.dto.mainImage || ''
    };

    this.accommodationService.updateAccommodation(id, payload).subscribe({
      next: () => this.router.navigate(['/profile-host']),
      error: () => this.error = 'Error al actualizar alojamiento'
    });
  }

  toggleService(service: string, checked: boolean) {
    const value = service.toUpperCase();
    if (checked && !this.dto.services.includes(value)) {
      this.dto.services.push(value);
    } else if (!checked) {
      this.dto.services = this.dto.services.filter(s => s !== value);
    }
  }

  cancel() {
    this.router.navigate(['/profile-host']);
  }
}
