import { LocationDTO } from './accommodation-dto';
export interface DestinationDTO {
  id: string;
  city: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  location: LocationDTO;
}
