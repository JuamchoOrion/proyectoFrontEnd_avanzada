export interface UserProfileDTO {
  id: string;
  username: string;
  email: string;
  phone?: string | null;
  photoUrl?: string | null;
}
