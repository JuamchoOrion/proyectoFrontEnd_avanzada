import { Role } from './role-enum';

export interface EditUserDTO {
  name: string;
  phone?: string;
  photoUrl?: string;
  dateBirth: string; // formato 'YYYY-MM-DD'
  role: Role;
}