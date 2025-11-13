import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { Role } from '../../models/role-enum';
import { UserService } from '../../services/user.services';
import { EditUserDTO } from '../../models/editUser-dto';
import { UserProfileDTO } from '../../models/user-dto';

@Component({
  selector: 'app-edit-profile-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-form.html',
  styleUrls: ['./edit-profile-form.css'],
})
export class EditProfileFormComponent implements OnInit {
  Role = Role;

  /** 🟦 FORM: datos que se enviarán */
  user: EditUserDTO & {
    photo?: File | null;
    photoPreview?: string;
  } = {
    name: '',
    phone: '',
    photoUrl: '',
    dateBirth: '',
    role: Role.GUEST,
    photo: null,
    photoPreview: '',
  };

  /** 🟣 Tipos permitidos */
  private readonly allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
  ];
  private readonly maxSizeMB = 5;

  constructor(private userService: UserService) {}

  /** 🟢 Cargar datos reales del usuario al iniciar */
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (profile: UserProfileDTO) => {
        this.user.name = profile.username;      // backend envía "username", frontend usa "name"
        this.user.phone = profile.phone || '';
        this.user.photoUrl = profile.photoUrl || '';
        this.user.photoPreview = profile.photoUrl || '';
        this.user.dateBirth = '';               // si el backend lo envía, lo llenas aquí
        this.user.role = Role.GUEST;            // user no cambia su propio rol

        console.log('📌 Datos cargados en formulario:', this.user);
      },
      error: (err) => {
        console.error('❌ Error obteniendo perfil:', err);
        Swal.fire('Error', 'No se pudo cargar tu perfil.', 'error');
      },
    });
  }

  /** 📸 Subir / reemplazar imagen */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const sizeMB = file.size / (1024 * 1024);

    if (!this.allowedTypes.includes(file.type)) {
      Swal.fire('Formato no válido', 'Solo JPG, PNG o WEBP.', 'warning');
      return;
    }

    if (sizeMB > this.maxSizeMB) {
      Swal.fire(
        'Archivo demasiado grande',
        `Máximo ${this.maxSizeMB} MB permitidos.`,
        'warning'
      );
      return;
    }

    this.user.photo = file;

    const reader = new FileReader();
    reader.onload = (e: any) => (this.user.photoPreview = e.target.result);
    reader.readAsDataURL(file);
  }

  /** 🧹 Eliminar imagen */
  removeImage() {
    this.user.photo = null;
    this.user.photoPreview = '';
    this.user.photoUrl = '';
  }

  /** 💾 Guardar cambios */
 onSubmit(form: NgForm) {
  if (form.invalid) {
    Swal.fire("Campos incompletos", "Por favor llena todos los campos.", "warning");
    return;
  }

  const formData = new FormData();

  // 📌 Enviar el JSON como Blob porque es multipart/form-data
  const userJson = {
    name: this.user.name,
    phone: this.user.phone,
    dateBirth: this.user.dateBirth,
    role: this.user.role
  };

  formData.append(
    "user",
    new Blob([JSON.stringify(userJson)], { type: "application/json" })
  );

  // 📸 Imagen (opcional)
  if (this.user.photo) {
    formData.append("photo", this.user.photo);
  }

  this.userService.editUser(formData).subscribe({
    next: () => {
      Swal.fire({
        icon: "success",
        title: "Perfil actualizado 🎉",
        confirmButtonColor: "#007bff"
      });
      form.resetForm();
    },
    error: (err) => {
      console.error("❌ Error al actualizar perfil:", err);
      Swal.fire("Error", "No se pudo actualizar el perfil.", "error");
    }
  });
}

  /** ↩️ Cancelar */
  cancel() {
    Swal.fire({
      icon: 'question',
      title: '¿Cancelar cambios?',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Volver',
    }).then((res) => {
      if (res.isConfirmed) window.history.back();
    });
  }
}