import mapboxgl from 'mapbox-gl';
import MapboxCompare from 'mapbox-gl-compare';
import { polygon, featureCollection } from '@turf/helpers';
import { Utility } from './utility';
// import squareGrid from '@turf/square-grid';
import { Store } from './store';
import SquareGridGeoJSONOne from './square-grid-geojson.json';
import SquareGridGeoJSONSecond from './square-grid-geojson-second.json';
import SquareGridGeoJSONThird from './square-grid-geojson-third.json';

const syncMove = require('@mapbox/mapbox-gl-sync-move');

const store = new Store({});
const utility = new Utility();

// avl
// 0:
// [-82.64750279625561,35.50789745200741]
// 1:
// [-82.49816302416521,35.50789745200741]
// 2:
// [-82.49816302416521,35.61210237015567]
// 3:
// [-82.64750279625561,35.61210237015567]
// 4:
// [-82.64750279625561,35.50789745200741]

// avl buffer
// [-82.70284788178019,35.462903122329635]
// 1:
// [-82.4428179386373,35.462903122329635]
// 2:
// [-82.4428179386373,35.65709670004187]
// 3:
// [-82.70284788178019,35.65709670004187]
// 4:
// [-82.70284788178019,35.462903122329635]


// hstn
// 0:
// [-95.94039512075331,29.67075135527005]
// 1:
// [-95.7910509634671,29.67075135527005]
// 2:
// [-95.7910509634671,29.7749562491426]
// 3:
// [-95.94039512075331,29.7749562491426]
// 4:
// [-95.94039512075331,29.67075135527005]


// hstn buffer
// [-95.99223294201447,29.62575702556433]
// 1:
// [-95.7392131422034,29.62575702556433]
// 2:
// [-95.7392131422034,29.81995057904633]
// 3:
// [-95.99223294201447,29.81995057904633]
// 4:
// [-95.99223294201447,29.62575702556433]

// lv
// 0:
// [-114.89989978765914,36.07957205493418]
// 1:
// [-114.75056002016422,36.07957205493418]
// 2:
// [-114.75056002016422,36.18378142051415]
// 3:
// [-114.89989978765914,36.18378142051415]
// 4:
// [-114.89989978765914,36.07957205493418]

// lv buff
// [-114.95564603205906,36.034577725246685]
// 1:
// [-114.69481377573592,36.034577725246685]
// 2:
// [-114.69481377573592,36.228775750398455]
// 3:
// [-114.95564603205906,36.228775750398455]
// 4:
// [-114.95564603205906,36.034577725246685]

export class MapBoxConfig {
  constructor() {
    const mapVersion = store.getStateItem('map-version');    
    switch (mapVersion) {
      case 1:
        this.squareGridGeoJSON = SquareGridGeoJSONOne;
        break;
      case 2:
        this.squareGridGeoJSON = SquareGridGeoJSONSecond;
        break;
      case 3:
        this.squareGridGeoJSON = SquareGridGeoJSONThird;
        break;
      default:
        this.squareGridGeoJSON = SquareGridGeoJSONOne;
        break;
    }

    this.defaultMapStyle = 'mapbox://styles/mapbox/streets-v11';
    this.defaultMapCenter = [-82.570, 35.560]; // starting position [lng, lat]
    this.defaultMaxBounds = [-82.702, 35.463, -82.442, 35.657];
    this.defaultMapZoom = 10; // starting zoom
    this.defaultMapContainer = 'map';
    this.darkMapStyle = 'mapbox://styles/mapbox/dark-v10';
    this.lightMapStyle = 'mapbox://styles/mapbox/light-v10';
    this.mapboxgl = mapboxgl;
    this.MapboxCompare = MapboxCompare;
    this.mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';
    this.quiet = true;
    this.map1 = null;
    this.map2 = null;
    this.defaultGreyBox = '#555555';
    this.selectedBox = '#FBB03B';
    this.mapChangeLayers = {
      layers: [
        [
          {
            url: 'https://daveism.github.io/change-research/dist/maps/nlcd-2016-30/{z}/{x}/{y}.png',
            minzoom: 1,
            maxzoom: 14,
            scheme: 'tms',
            tileSize: 256,
            bounds: [-82.647, -82.498, 35.507, 35.612],
            maxbounds: [-82.702, 35.463, -82.442, 35.657]
          },
          {
            url: 'https://daveism.github.io/change-research/dist/maps/nlcd-2001-30/{z}/{x}/{y}.png',
            minzoom: 1,
            maxzoom: 14,
            scheme: 'tms',
            tileSize: 256,
            bounds: [-82.647, -82.498, 35.507, 35.612],
            maxbounds: [-82.702, 35.463, -82.442, 35.657]
          },
        ]
      ]
    }

    this.mapChangeLayersOne = [
      'https://daveism.github.io/change-research/dist/maps/nlcd-2016-30/{z}/{x}/{y}.png',
      'https://daveism.github.io/change-research/dist/maps/nlcd-2001-30/{z}/{x}/{y}.png'
    ];
    store.setStateItem('squareGridGeoJSON', this.squareGridGeoJSON);
  }

  // Sets an individual mapbox map test
  //
  // @param mapContainer - string
  // @return new mapbox map object
  makeMap(mapContainer = this.defaultMapContainer, mapIndex = 0) {
    const mapVersion = store.getStateItem('map-version');
    //  replace mapVersion latter
    const mapSetup = this.mapChangeLayers.layers[0][mapIndex]
    const map = new this.mapboxgl.Map({
      container: mapContainer,
      style: this.lightMapStyle,
      // center: this.defaultMapCenter,
      zoom: this.defaultMapZoom,
      showZoom: true,
      touchEnabled: true,
      keybindings: true,
      maxBounds: mapSetup.maxbounds
    });

    map.on('load', (e) => {
      MapBoxConfig.fitMyBounds(map);
      map.addLayer(this.makeTMSLayer(this.mapChangeLayersOne, mapIndex));
      map.addLayer(this.makeGridOutLineLayer());
      map.addLayer(this.makeGridLayer());
      this.addGridClick(map);
      map.resize();
    });

    window.onload = (e) => {
      map.resize();
    };

    return map;
  }

  // Sets up animated map
  //
  // @param mapContainer - string
  // @return new mapbox map object
  makeAnimateMap(mapContainer = this.defaultMapContainer) {
    const mapVersion = store.getStateItem('map-version');
    //  replace mapVersion latter
    const mapSetup = this.mapChangeLayers.layers[0][0]

    const map = new this.mapboxgl.Map({
      container: mapContainer,
      style: this.lightMapStyle,
      center: this.defaultMapCenter,
      zoom: this.defaultMapZoom,
      showZoom: true,
      touchEnabled: true,
      keybindings: true,
      maxBounds: mapSetup.maxbounds
    });

    map.on('load', (e) => {
      MapBoxConfig.fitMyBounds(map);
      map.addLayer(this.makeTMSLayer(this.mapChangeLayersOne, 0));
      map.addLayer(this.makeTMSLayer(this.mapChangeLayersOne, 1));
      map.addLayer(this.makeGridOutLineLayer());
      map.addLayer(this.makeGridLayer());
      this.addGridClick(map);
      map.resize();

      const indexCount = 2;
      let index = 0;

      setInterval(() => {
        index = (index + 1) % indexCount;
        if (index === 1) {
          map.setLayoutProperty('map-change-1', 'visibility', 'visible');
          map.setLayoutProperty('map-change-0', 'visibility', 'none');
        } else {
          map.setLayoutProperty('map-change-0', 'visibility', 'visible');
          map.setLayoutProperty('map-change-1', 'visibility', 'none');
        }
      }, 1000);
    });

    window.onload = (e) => {
      map.resize();
    };
    return map;
  }

  // makeCompareMap Sets an comparing map "swiping" mapbox map
  //
  // @param mapContainer - string
  // @return array of maps new mapbox map object
  makeCompareMap(mapBeforeContainer, mapAfterContainer, mapCompareWrapperID) {
    const mapVersion = store.getStateItem('map-version');
    //  replace mapVersion latter
    const mapSetup1 = this.mapChangeLayers.layers[0][0]
    const mapSetup2 = this.mapChangeLayers.layers[0][1]

    const beforeMap = new this.mapboxgl.Map({
      container: mapBeforeContainer,
      style: this.lightMapStyle,
      center: this.defaultMapCenter,
      zoom: this.defaultMapZoom,
      showZoom: true,
      touchEnabled: true,
      keybindings: true,
      maxBounds: mapSetup1.maxbounds
    });

    const afterMap = new this.mapboxgl.Map({
      container: mapAfterContainer,
      style: this.lightMapStyle,
      center: this.defaultMapCenter,
      zoom: this.defaultMapZoom,
      showZoom: true,
      touchEnabled: true,
      keybindings: true,
      maxBounds: mapSetup2.maxbounds
    });
    const compare = new this.MapboxCompare(beforeMap, afterMap, `#${mapCompareWrapperID}`);

    beforeMap.on('load', (e) => {
      MapBoxConfig.fitMyBounds(beforeMap);
      beforeMap.addLayer(this.makeTMSLayer(this.mapChangeLayersOne, 1)); // needs update
      beforeMap.addLayer(this.makeGridOutLineLayer());
      beforeMap.addLayer(this.makeGridLayer());
      this.addGridClick(beforeMap);
      beforeMap.resize();
      compare.setSlider(150);
    });

    afterMap.on('load', (e) => {
      MapBoxConfig.fitMyBounds(afterMap);
      afterMap.addLayer(this.makeTMSLayer(this.mapChangeLayersOne, 0)); // needs update
      afterMap.addLayer(this.makeGridOutLineLayer());
      afterMap.addLayer(this.makeGridLayer());
      this.addGridClick(afterMap);
      afterMap.resize();
      compare.setSlider(150);
    });

    window.onload = (e) => {
      afterMap.resize();
      beforeMap.resize();
      compare.setSlider(150);
    };
    return [beforeMap, afterMap];
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
  synMaps(map1, map2) { // eslint-disable-line
    syncMove(map1, map2);
  }

  makeTMSLayer(mapChange, mapIndex) {
    const mapVersion = store.getStateItem('map-version');
    //  replace mapVersion latter
    const mapSetup = this.mapChangeLayers.layers[0][mapIndex]

    return {
      id: `map-change-${mapIndex}`,
      type: 'raster',
      source: {
        type: 'raster',
        tiles: [mapSetup.url],
        minzoom: mapSetup.minzoom,
        maxzoom: mapSetup.maxzoom,
        scheme: 'tms',
        tileSize: 256,
        bounds:  mapSetup.bounds
      },
      paint: {
        'raster-fade-duration': 0
      }
    };
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
          1, this.selectedBox,
          /* other */ this.defaultGreyBox
        ],
        'fill-opacity': 0.5
      }
    };
  }

  // makes change grid layer on map
  //
  // @param null
  // @return null
  makeGridOutLineLayer() {
    return {
      id: 'change-grid-outline',
      type: 'line',
      source: {
        type: 'geojson',
        data: this.squareGridGeoJSON
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': this.defaultGreyBox,
        'line-width': 4
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

      // update state with selected feature
      MapBoxConfig.storeSelectedFeature(id);

      // tigger event so all data sources update
      utility.triggerEvent('grid-update', id);
    });
  }

  // toggles value the properties (attribute) selected
  //    when a user clicks the grid box > 0 when selected
  //    0 when selecte
  //
  // @param feature = geojson feature (poperties and geom)
  // @return feature = geojson feature
  static toggleSelectedFeature(feature) {
    if (feature.properties.selected === 0) {
      feature.properties.selected = 1; // eslint-disable-line
    } else {
      feature.properties.selected = 0; // eslint-disable-line
    }
    return feature;
  }

  // sets the selected feature in state > 0 when selected
  //    0 when selecte
  //
  // @param id = number which represents the feature id
  // @return null
  static storeSelectedFeature(id) {
    const gridName = 'grid-box-';
    // zero out "toggle off" if grid id exists state item
    if (store.getStateItem(`${gridName}${id}`) > 0) {
      store.setStateItem(`${gridName}${id}`, 0);
    // add "toggle on" if  state item > 0 or not selected
    } else {
      store.setStateItem(`${gridName}${id}`, Number(id));
    }
    return null;
  }

  // makes the selected feature a new feature collection
  //
  // @param feature = geojson feature (poperties and geom)
  // @return featureCollection (from turf.js)
  static makeSelectedFeatureGeoJSON(feature) {
    return featureCollection([polygon(feature.geometry.coordinates, feature.properties)]);
  }

  // updates the SquareGridGeoJSON after merging and reconciling
  //    with the selected feautures
  //
  // @param selectedFeatures = geojson featurecollecton representing the selected
  //        features (poperties and geom)
  // @return featureCollection (from turf.js)
  static updateSquareGridWithSelectedFeatures(selectedFeatures) {
    const currentSquareGridGeoJSON = store.getStateItem('squareGridGeoJSON');
    const currentFeatureIds = selectedFeatures.features.map(feature => feature.properties.id);
    return featureCollection(selectedFeatures.features.concat(currentSquareGridGeoJSON.features.filter(feature => !currentFeatureIds.includes(feature.properties.id)))); // eslint-disable-line
  }

  // updates state with the new version of SquareGridGeoJSON
  //    contains selected features also (if any selected)
  //
  // @param NewSquareGridGeoJSON = geojson featurecollecton representing
  //                the new features (poperties and geom)
  // @return null
  storeSquareGrid(NewSquareGridGeoJSON) {
    this.squareGridGeoJSON = NewSquareGridGeoJSON;
    store.setStateItem('squareGridGeoJSON', NewSquareGridGeoJSON);
    return null;
  }

  static fitMyBounds(map) {
    const bounds = [-82.647, 35.507, -82.498, 35.612];
    map.fitBounds(bounds, { padding: 20 });
  }
}
