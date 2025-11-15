export interface EditAccommodationDTO {
  title: string;
  description: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  maxGuests: number;
  services: string[];
  mainImage: string;
  images: string[];
}
