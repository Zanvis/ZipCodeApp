import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild  } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'google-maps',
  standalone: true,
  imports: [CommonModule, GoogleMap, MapMarker],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.css'
})
export class GoogleMapsComponent {
  @ViewChild('myGoogleMap') map!: GoogleMap;

  @Input()
  longitude: string = "";
  @Input()
  latitude: string = "";

  mapOptions: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 14,
  };

  selectedLocation: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['longitude'] || changes['latitude']) {
      this.updateMapCenter();
    }
  }

  async updateMapCenter(): Promise<void> {
    const lat = parseFloat(this.latitude);
    const lng = parseFloat(this.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      this.mapOptions = {
        ...this.mapOptions,
        center: { lat, lng }
      };

      this.selectedLocation = { lat, lng };
      if (this.map && this.map.googleMap) {
        await this.map.googleMap.panTo(this.selectedLocation);
      }
    }
  }
}
