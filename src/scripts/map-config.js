import mapboxgl from 'mapbox-gl';

export class MapBoxConfig {
  constructor() {
    this.defaultMapStyle = 'mapbox://styles/mapbox/streets-v11';
    this.defaultMapCenter = [-98, 38.88]; // starting position [lng, lat]
    this.defaultMapZoom = 3; // starting zoom
    this.defaultMapContainer = 'map';
    this.darkMapStyle = 'mapbox://styles/daveism/cjwrrdfd20uic1dnzsti2owlk';
    this.mapboxgl = mapboxgl;
    this.mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';
  }

  // Sets an individual mapbox map
  //
  // @param mapContainer - string
  // @return new mapbox map object
  makeMap(mapContainer = this.defaultMapContainer) {
    return new this.mapboxgl.Map({
      container: mapContainer,
      style: this.defaultMapStyle,
      center: this.defaultMapCenter,
      zoom: this.defaultMapZoom,
      showZoom: true,
      touchEnabled: true,
      keybindings: true
    });
  }

  addNav() {
    return new this.mapboxgl.NavigationControl();
  }
}
