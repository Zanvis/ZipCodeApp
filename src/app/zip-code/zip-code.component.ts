import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZipCodeService } from './zip-code.service';

@Component({
  selector: 'zip-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zip-code.component.html',
  styleUrl: './zip-code.component.css'
})
export class ZipCodeComponent {
  code: string = "";
  codeData: any = !{};
  country_codes: { [key: string]: string } = {
    "Andorra": "AD",
    "Argentina": "AR",
    "American Samoa": "AS",
    "Austria": "AT",
    "Australia": "AU",
    "Bangladesh": "BD",
    "Belgium": "BE",
    "Bulgaria": "BG",
    "Brazil": "BR",
    "Canada": "CA",
    "Switzerland": "CH",
    "Czech Republic": "CZ",
    "Germany": "DE",
    "Denmark": "DK",
    "Dominican Republic": "DO",
    "Spain": "ES",
    "Finland": "FI",
    "Faroe Islands": "FO",
    "France": "FR",
    "Great Britain": "GB",
    "French Guyana": "GF",
    "Guernsey": "GG",
    "Greenland": "GL",
    "Guadeloupe": "GP",
    "Guatemala": "GT",
    "Guam": "GU",
    "Guyana": "GY",
    "Croatia": "HR",
    "Hungary": "HU",
    "Isle of Man": "IM",
    "India": "IN",
    "Iceland": "IS",
    "Italy": "IT",
    "Jersey": "JE",
    "Japan": "JP",
    "Liechtenstein": "LI",
    "Sri Lanka": "LK",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "Monaco": "MC",
    "Moldavia": "MD",
    "Marshall Islands": "MH",
    "Macedonia": "MK",
    "Northern Mariana Islands": "MP",
    "Martinique": "MQ",
    "Mexico": "MX",
    "Malaysia": "MY",
    "Holland": "NL",
    "Norway": "NO",
    "New Zealand": "NZ",
    "Phillippines": "PH",
    "Pakistan": "PK",
    "Poland": "PL",
    "Saint Pierre and Miquelon": "PM",
    "Puerto Rico": "PR",
    "Portugal": "PT",
    "French Reunion": "RE",
    "Russia": "RU",
    "Sweden": "SE",
    "Slovenia": "SI",
    "Svalbard & Jan Mayen Islands": "SJ",
    "Slovak Republic": "SK",
    "San Marino": "SM",
    "Thailand": "TH",
    "Turkey": "TR",
    "United States": "US",
    "Vatican": "VA",
    "Virgin Islands": "VI",
    "Mayotte": "YT",
    "South Africa": "ZA"
  }
  
  constructor(private zipService: ZipCodeService) { }

  country: string = "PL";
  fetchValue(value: any) {
    this.country = value;
  }
  @Output() 
  onData: EventEmitter<any> = new EventEmitter<any>();
  fetchZipCode(code: string) {
    this.zipService.getData(this.country, code).subscribe({
      next: (data: any) => {
        this.codeData = data;
        this.onData.emit(this.codeData);
      },
      error: (error: any) => {
        alert(error.message);
      },
      complete: () => {
        console.log('Data fetch complete');
      }
    });
  }
  getLink(codeData: any, map : string) {
    this.codeData = codeData;
    if (map === "google")
      return `https://www.google.com/maps/place/${this.codeData['post code']}+${this.codeData['places'][0]['place name']}/@${this.codeData['places'][0]['latitude']}.${this.codeData['places'][0]['longitude']}`
    return `https://www.openstreetmap.org/search?query=${this.codeData['post code']}#map=${this.codeData['places'][0]['latitude']}/${this.codeData['places'][0]['longitude']}`
  }
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
