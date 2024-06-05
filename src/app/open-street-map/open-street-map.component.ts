import { Component, Input, OnChanges, SimpleChanges, OnInit, AfterViewInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { CommonModule } from '@angular/common';
import { AngularOpenlayersModule } from 'ng-openlayers';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { marker } from './marker.image';

@Component({
  selector: 'open-street-map',
  standalone: true,
  imports: [CommonModule, AngularOpenlayersModule],
  templateUrl: './open-street-map.component.html',
  styleUrls: ['./open-street-map.component.css']
})
export class OpenStreetMapComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() latitude: string = "0";
  @Input() longitude: string = "0";

  private map!: Map;
  private vectorSource: VectorSource = new VectorSource();
  markerImage = marker

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    this.updateMapCenter();
    this.addMarker();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude'] || changes['longitude']) {
      this.updateMapCenter();
      this.addMarker();
    }
  }

  private initMap(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: this.vectorSource,
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
        maxZoom: 18,
      }),
    });
  }

  private updateMapCenter(): void {
    const lat = parseFloat(this.latitude);
    const lng = parseFloat(this.longitude);

    if (!isNaN(lat) && !isNaN(lng) && this.map) {
      const view = this.map.getView();
      const transformedCoords = fromLonLat([lng, lat]);
      view.setCenter(transformedCoords);
      view.setZoom(14);
    }
  }

  private addMarker(): void {
    const lat = parseFloat(this.latitude);
    const lng = parseFloat(this.longitude);

    if (!isNaN(lat) && !isNaN(lng)) {
      const coordinates = fromLonLat([lng, lat]);
      const marker = new Feature({
        geometry: new Point(coordinates),
      });

      marker.setStyle(new Style({
        image: new Icon({
          src: this.markerImage,
          anchor: [0.5, 1],
        }),
      }));

      this.vectorSource.clear();
      this.vectorSource.addFeature(marker);
    }
  }
}
