export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: 'GUEST' | 'HOST'; // o los roles válidos de tu backend
  dateBirth: string; // o Date si tu backend acepta ISO-8601
}
