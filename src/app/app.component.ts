import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZipCodeComponent } from './zip-code/zip-code.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { CommonModule } from '@angular/common';
import { OpenStreetMapComponent } from './open-street-map/open-street-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ZipCodeComponent, GoogleMapsComponent, CommonModule, OpenStreetMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'ZipCodeApp';
  AllData: any;
  showGoogleMap: boolean = false;
  setData(value : any) {
    this.AllData = value;
  }

  OpenStreetMap() {
    this.showGoogleMap = false;
  }
  OpenGoogleMaps() {
    this.showGoogleMap = true;
  }
}
