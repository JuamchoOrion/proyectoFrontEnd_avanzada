import { LocationDTO } from './accommodation-dto';

export interface MarkerDTO {
  id: number | string;
  location: LocationDTO;
  title: string;
  photoUrl: string;
}
