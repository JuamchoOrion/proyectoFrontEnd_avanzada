export interface CreateAccommodationDTO {
  title: string;
  description: string;
  city: string;
  address: string;
    latitude: string | number | null;
  longitude: string | number | null;
  pricePerNight: number;
  maxCapacity: number;
  services: string[]; // Ej: ["WiFi", "Cocina", "Piscina"]
  images: File[];
}