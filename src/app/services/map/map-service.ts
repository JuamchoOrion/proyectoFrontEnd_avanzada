import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import mapboxgl, { LngLatLike, Map, Marker, MapMouseEvent } from 'mapbox-gl';
import { MarkerDTO } from '../../models/marker-dto';

@Injectable({
  providedIn: 'root',
})
export class MapService implements OnDestroy {
  private map?: Map;
  private markers: Marker[] = [];
  private currentLocation: LngLatLike = [-75.6727, 4.53252];
  private readonly MAPBOX_TOKEN =
    'pk.eyJ1IjoianVhbmNob2RldiIsImEiOiJjbWh2ZGh4bTUwOWQxMnhvZWh4cnd2NGhzIn0.vL5Nre4T2IXDaerZunrJJQ';
  private destroy$ = new Subject<void>();

  constructor() {
    mapboxgl.accessToken = this.MAPBOX_TOKEN;
  }

  /** Inicializa el mapa dentro del contenedor especificado */
  public create(containerId: string = 'map'): void {
    if (this.map) {
      this.map.remove(); // Evita fugas si se recrea el mapa
    }

    this.map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/standard',
      center: this.currentLocation,
      zoom: 6,
      pitch: 0,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      })
    );
  }

  public clearMarkers(): void {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
  }

  /** Dibuja varios marcadores con popup */
  public drawMarkers(places: MarkerDTO[]): void {
    if (!this.map) return;

    places.forEach(({ id, title, photoUrl, location }) => {
      const popupHtml = `
        <strong>${title}</strong>
        <div>
          <img src="${photoUrl}" alt="Imagen" style="width: 100px; height: 100px;">
        </div>
        <a href="/place/${id}">Ver más</a>
      `;

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([location.longitude, location.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(popupHtml))
        .addTo(this.map!);
    });
  }

  /** Devuelve el mapa actual (si existe) */
  public get mapInstance(): Map | undefined {
    return this.map;
  }

  /** Limpieza al destruir el servicio */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  public addMarker(): Observable<mapboxgl.LngLat> {
    return new Observable((observer) => {
      if (!this.map) {
        observer.error('Mapa no inicializado');
        return;
      }

      // Limpia los marcadores existentes y agrega uno nuevo en la posición del click
      const onClick = (e: MapMouseEvent) => {
        this.clearMarkers();
        const marker = new mapboxgl.Marker({ color: 'red' }).setLngLat(e.lngLat).addTo(this.map!);

        this.markers.push(marker);
        // Emite las coordenadas del marcador al observador
        observer.next(marker.getLngLat());
      };

      this.map.on('click', onClick);

      // Limpieza al desuscribirse
      return () => {
        this.map?.off('click', onClick);
      };
    });
  }
}
