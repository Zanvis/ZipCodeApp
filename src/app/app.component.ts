import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZipCodeComponent } from './zip-code/zip-code.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ZipCodeComponent, GoogleMapsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZipCodeApp';
  AllData: any;
  setData(value : any) {
    this.AllData = value
  }
}
