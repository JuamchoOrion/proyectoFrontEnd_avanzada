export interface AccommodationDTO {
  id: number;
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
export interface LocationDTO {
  latitude: number;
  longitude: number;
}
