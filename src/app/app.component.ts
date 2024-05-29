import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZipCodeComponent } from './zip-code/zip-code.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ZipCodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZipCodeApp';
}
