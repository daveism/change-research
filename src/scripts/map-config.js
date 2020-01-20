import mapboxgl from 'mapbox-gl';
import MapboxCompare from 'mapbox-gl-compare';
// import syncMove from 'mapbox-gl-sync-move';
import squareGrid from '@turf/square-grid';

export class MapBoxConfig {
  constructor() {
    this.defaultMapStyle = 'mapbox://styles/mapbox/streets-v11';
    this.defaultMapCenter = [-98, 38.88]; // starting position [lng, lat]
    this.defaultMapZoom = 3; // starting zoom
    this.defaultMapContainer = 'map';
    this.darkMapStyle = 'mapbox://styles/daveism/cjwrrdfd20uic1dnzsti2owlk';
    this.mapboxgl = mapboxgl;
    this.MapboxCompare = MapboxCompare;
    this.mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';
    this.quiet = true;
    this.map1 = null;
    this.map2 = null;
    this.defaultGreyBox = '#555555';
  }

  // Sets an individual mapbox map
  //
  // @param mapContainer - string
  // @return new mapbox map object
  makeMap(mapContainer = this.defaultMapContainer) {
    const map = new this.mapboxgl.Map({
      container: mapContainer,
      style: this.defaultMapStyle,
      center: this.defaultMapCenter,
      zoom: this.defaultMapZoom,
      showZoom: true,
      touchEnabled: true,
      keybindings: true
    });

    map.on('load', (e) => {
      map.addLayer(this.makeGridLayer());
      map.resize();
    });

    window.onload = (e) => {
      map.resize();
    };

    return map;
  }

  // makeCompareMap Sets an comparing map "swiping" mapbox map
  //
  // @param mapContainer - string
  // @return new mapbox map object
  makeCompareMap(mapBeforeContainer, mapAfterContainer, mapCompareWrapperID) {
    const beforeMap = new this.mapboxgl.Map({
      container: mapBeforeContainer,
      style: this.defaultMapStyle,
      center: this.defaultMapCenter,
      zoom: this.defaultMapZoom,
      showZoom: true,
      touchEnabled: true,
      keybindings: true
    });

    const afterMap = new this.mapboxgl.Map({
      container: mapAfterContainer,
      style: this.darkMapStyle,
      center: this.defaultMapCenter,
      zoom: this.defaultMapZoom,
      showZoom: true,
      touchEnabled: true,
      keybindings: true
    });
    const compare = new this.MapboxCompare(beforeMap, afterMap, `#${mapCompareWrapperID}`);

    beforeMap.on('load', (e) => {
      beforeMap.resize();
      compare.setSlider(150);
    });

    afterMap.on('load', (e) => {
      afterMap.resize();
      compare.setSlider(150);
    });

    window.onload = (e) => {
      afterMap.resize();
      beforeMap.resize();
      compare.setSlider(150);
    };
    return compare;
  }

  // instantiates a navigation bar on the map
  //
  // @param null
  // @return null
  addNav() {
    return new this.mapboxgl.NavigationControl();
  }

  // syncs two maps zoom and pan
  // modifed from https://docs.mapbox.com/mapbox.js/example/v1.0.0/sync-layer-movement/
  //
  // @param map1 = first mapbox map object
  // @param map2  = second mapbox map object
  // @return null
  synMaps(map1, map2) {
    // follow calback
    const follow = (e) => {
      // https://docs.mapbox.com/mapbox.js/example/v1.0.0/sync-layer-movement/
      // quiet is a cheap and dirty way of avoiding a problem in which one map
      // syncing to another leads to the other map syncing to it, and so on
      // ad infinitum. this says that while we are calling sync, do not try to
      // loop again and sync other maps
      if (this.quiet) return;
      this.quiet = true;
      if (e.target === map1) MapBoxConfig.sync(map2, e);
      if (e.target === map2) MapBoxConfig.sync(map1, e);
      this.quiet = false;
    };

    // when either map finishes moving, trigger an update on the other one.
    this.quiet = false;
    map1.on('moveend', follow).on('zoomend', follow);
    map2.on('moveend', follow).on('zoomend', follow);
  }

  // sync event callback
  // https://docs.mapbox.com/mapbox.js/example/v1.0.0/sync-layer-movement/
  //
  // @param map = mapbox map object to update zoom and center to
  // @param e = event from follow called after zoomend (pan/zoom) completes
  // @return null
  static sync(map, e) {
    // sync simply steals the settings from the moved map (e.target)
    // and applies them to the other map.
    map.setCenter(e.target.getCenter());
    map.setZoom(e.target.getZoom());
  }
  // makes change grid layer on map
  //
  // @param null
  // @return null
  makeGridLayer() {
    const bbox = [-95, 30 ,-85, 40];
    const cellSide = 50;
    const options = {units: 'miles'};
    const squareGridGeoJSON = squareGrid(bbox, cellSide, options);

    return {
      'id': 'change-grid',
      'type': 'fill',
      'source': {
        'type': 'geojson',
        'data': squareGridGeoJSON
      },
      'layout': {},
      'paint': {
        'fill-color': this.defaultGreyBox,
        'fill-opacity': 0.8
      }
    };
  }
}
