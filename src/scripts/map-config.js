import mapboxgl from 'mapbox-gl';
import MapboxCompare from 'mapbox-gl-compare';
// import { featureEach } from '@turf/meta';
import { polygon, featureCollection } from '@turf/helpers';
// import squareGrid from '@turf/square-grid';
import { Store } from './store';
import SquareGridGeoJSON from './square-grid-geojson.json';
// import syncMove from 'mapbox-gl-sync-move';

const store = new Store({});

export class MapBoxConfig {
  constructor() {
    this.defaultMapStyle = 'mapbox://styles/mapbox/streets-v11';
    this.defaultMapCenter = [-82.570, 35.560]; // starting position [lng, lat]
    this.defaultMapZoom = 10; // starting zoom
    this.defaultMapContainer = 'map';
    this.darkMapStyle = 'mapbox://styles/daveism/cjwrrdfd20uic1dnzsti2owlk';
    this.mapboxgl = mapboxgl;
    this.MapboxCompare = MapboxCompare;
    this.mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';
    this.quiet = true;
    this.map1 = null;
    this.map2 = null;
    this.defaultGreyBox = '#555555';
    this.squareGridGeoJSON = SquareGridGeoJSON; // squareGridGeoJSON.getSquareGridGeoJSON();
    store.setStateItem('squareGridGeoJSON', this.squareGridGeoJSON);
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

    // map.on('moveend', () => {
    //   console.log( JSON.stringify(map.getBounds()) );
    //   console.log( JSON.stringify(map.getCenter()) );
    //   console.log( JSON.stringify(map.getZoom()) );
    // });

    map.on('load', (e) => {
      map.addLayer(this.makeGridLayer());
      this.addGridClick(map);
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
      beforeMap.addLayer(this.makeGridLayer());
      this.addGridClick(beforeMap);
      beforeMap.resize();
      compare.setSlider(150);
    });

    afterMap.on('load', (e) => {
      afterMap.resize();
      afterMap.addLayer(this.makeGridLayer());
      this.addGridClick(afterMap);
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
    // {"_sw":{"lng":-82.69918436136798,"lat":35.5006993752381},
    // "_ne":{"lng":-82.43593385567635,"lat":35.61967467603169}
    // }
    // const bbox = [-82.650, 35.508 ,-82.485, 35.623]; // side to side fits small

    // uncomment if need to redoo the qrid
    // const bbox = [-82.650, 35.505 ,-82.485, 35.615];
    // const cellSide = 0.6;
    // const options = {units: 'miles'};
    // const squareGridGeoJSON = squareGrid(bbox, cellSide, options);
    // console.log('squareGridGeoJSON', JSON.stringify(squareGridGeoJSON))
    return {
      id: 'change-grid',
      type: 'fill',
      source: {
        type: 'geojson',
        data: this.squareGridGeoJSON
      },
      layout: {},
      paint: {
        'fill-color': [
          'match',
          ['get', 'selected'],
          1, '#fbb03b',
          /* other */ this.defaultGreyBox
        ],
        'fill-opacity': 0.5
      }
    };
  }

  // adds click of grid box to capture which grid the user
  // thinks change happend in orginal from:
  // https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
  //
  // @param map = mapbox map object to update zoom and center to
  // @return null
  addGridClick(map) {
    // const makeGridLayer = this.makeGridLayer();
    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('mouseenter', 'change-grid', (e) => {
      map.getCanvas().style.cursor = 'pointer'; // eslint-disable-line
    });

    map.on('mouseleave', 'change-grid', (e) => {
      map.getCanvas().style.cursor = ''; // eslint-disable-line
    });

    map.on('click', 'change-grid', (e) => {
      const feature = e.features[0];
      const id = Number(feature.properties.id);

      // udpates selected geojson properites.selected 0 or 1 depeneding
      // if user selected polygon
      const newFeature = MapBoxConfig.toggleSelectedFeature(feature);

      // create a new feature collection from selected feature
      const selectedFeatures = MapBoxConfig.makeSelectedFeatureGeoJSON(newFeature);

      // updates squareGridGeoJSON with new geojson
      const newSquareGridGeoJSON = MapBoxConfig.updateSquareGridWithSelectedFeatures(selectedFeatures); // eslint-disable-line

      // store new square grid with slected boxes
      this.storeSquareGrid(newSquareGridGeoJSON);

      // only updates one map how do get every map
      map.getSource('change-grid').setData(newSquareGridGeoJSON);

      // update state with selected feature
      MapBoxConfig.storeSelectedFeature(id);
    });
  }

  static toggleSelectedFeature(feature) {
    if (feature.properties.selected === 0) {
      feature.properties.selected = 1; // eslint-disable-line
    } else {
      feature.properties.selected = 0; // eslint-disable-line
    }
    return feature;
  }

  static storeSelectedFeature(id) {
    const gridName = 'grid-box-';
    // zero out "toggle off" if grid id exists state item
    if (store.getStateItem(`${gridName}${id}`) > 0) {
      store.setStateItem(`${gridName}${id}`, 0);
    // add "toggle on" if  state item > 0 or not selected
    } else {
      store.setStateItem(`${gridName}${id}`, Number(id));
    }
  }

  static makeSelectedFeatureGeoJSON(feature) {
    return featureCollection([polygon(feature.geometry.coordinates, feature.properties)]);
  }

  static updateSquareGridWithSelectedFeatures(selectedFeatures) {
    const currentSquareGridGeoJSON = store.getStateItem('squareGridGeoJSON');
    const currentFeatureIds = selectedFeatures.features.map(feature => feature.properties.id);
    return featureCollection(selectedFeatures.features.concat(currentSquareGridGeoJSON.features.filter(feature => !currentFeatureIds.includes(feature.properties.id)))); // eslint-disable-line
  }

  storeSquareGrid(NewSquareGridGeoJSON) {
    this.squareGridGeoJSON = NewSquareGridGeoJSON;
    store.setStateItem('squareGridGeoJSON', NewSquareGridGeoJSON);
    return null;
  }
}
