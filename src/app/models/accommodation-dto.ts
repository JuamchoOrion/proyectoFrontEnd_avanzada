export interface AccommodationDTO {
  id: string;
  hostId: string;
  city: string;
  description: string;
  address: string;
  pricePerNight: number;
  latitude: number;
  longitude: number;
  maxGuests: number;
  accommodationServiceTypes: string[];
  images: string[];
  mainImage: string;
  status: string;
}
