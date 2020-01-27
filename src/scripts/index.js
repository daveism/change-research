// import dependencies
// TODOS
//   record data at end so its all in one row.... store it in store then get each element
//    record progress in state so when particpatant comes back or hist back button
//            they are back at state they left the study
//    MIGHT NOT BE ABLE TO DO THIS
//
// Back to grid button when on sus? maybe or use navgo to create page
// play pause on animation - maybe
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Store } from './store';
import { MapBoxConfig } from './map-config';
import { Utility } from './utility';
import { Handlers } from './handlers';

import blockStudyAggreement from '../content-blocks/block-study-aggreement.html';
import blockStudyDissaggree from '../content-blocks/block-study-dissaggree.html';
import blockStudyQuestion1 from '../content-blocks/block-study-question-1.html';
import blockStudyQuestion2 from '../content-blocks/block-study-question-2.html';
import blockStudyQuestion3 from '../content-blocks/block-study-question-3.html';
import blockStudySUS from '../content-blocks/block-study-sus.html';
import blockStudyCompleted from '../content-blocks/block-study-completed.html';

const store = new Store({});

// study constraints number of questions starts with 0
const studyMinOne = 0;
const studyMaxOne = 2;
const studyVersion = Math.floor(Math.random() * (studyMaxOne - studyMinOne + 1) + studyMinOne);
store.setStateItem('study-question', studyVersion);

// study constraints number of questions starts with 0
const mapMinOne = 0;
const mapMaxOne = 2;
const mapVersion = Math.floor(Math.random() * (mapMaxOne - mapMinOne + 1) + mapMinOne);
store.setStateItem('map-version', mapVersion);

const utility = new Utility();
const handlers = new Handlers();
const mapBoxConfig = new MapBoxConfig();

if (!utility.checkValidObject(store.getStateItem('uuid'))) {
  store.setStateItem('uuid', utility.uuid().toString());
}

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
library.add(fas, far);
dom.watch();

// load only the block needed
utility.loadHTMLBlock('block-study-aggreement-holder', blockStudyAggreement);
utility.loadHTMLBlock('block-study-dissaggree-holder', blockStudyDissaggree);
utility.loadHTMLBlock('block-study-sus-holder', blockStudySUS);
utility.loadHTMLBlock('block-study-completed-holder', blockStudyCompleted);

// create mapbox navigation control instance
const nav = mapBoxConfig.addNav();
let map1;
let map2a;
let map2b;
let map3Arr;
let mapdef;

switch (studyVersion) {
  case 0: // animate
    utility.loadHTMLBlock('block-study-question-1-holder', blockStudyQuestion1);
    map1 = mapBoxConfig.makeAnimateMap('map-1', 0);
    map1.addControl(nav, 'top-left');
    break;
  case 1: // side by side
    utility.loadHTMLBlock('block-study-question-2-holder', blockStudyQuestion2);
    map2a = mapBoxConfig.makeMap('map-2a', 0);
    map2b = mapBoxConfig.makeMap('map-2b', 1);
    map2a.addControl(nav, 'top-left');
    map2b.addControl(nav, 'top-left');
    mapBoxConfig.syncMaps(map2a, map2b);
    break;
  case 2: // slider
    utility.loadHTMLBlock('block-study-question-3-holder', blockStudyQuestion3);
    map3Arr = mapBoxConfig.makeCompareMap('map-3a', 'map-3b', 'compare-wrapper');
    map3Arr[0].addControl(nav, 'top-left');
    map3Arr[1].addControl(nav, 'top-left');
    mapBoxConfig.syncMaps(map3Arr[0], map3Arr[1]);
    break;
  default: // animate
    utility.loadHTMLBlock('block-study-question-1-holder', blockStudyQuestion1);
    mapdef = mapBoxConfig.makeAnimateMap('map-1', 0);
    mapdef.addControl(nav, 'top-left');
    break;
}

// create all the mapbox map objects
// const mapEndArr = mapBoxConfig.makeCompareMap('map-c-enda',
//  'map-c-endb', 'compare-end-wrapper', true, false);
//
const mapEnda = mapBoxConfig.makeMap('map-enda', 0, false, false);
const mapEndb = mapBoxConfig.makeMap('map-endb', 1, true, false);
// mapBoxConfig.syncMaps(mapEndArr[0], mapEndArr[1]);


// add navigatio to maps
// I may not need this if I do not let user zoom/pan
// mapEndArr[0].addControl(nav, 'top-left');
// mapEndArr[1].addControl(nav, 'top-left');
mapEnda.addControl(nav, 'top-left');
mapEndb.addControl(nav, 'top-left');

// sync maps
mapBoxConfig.syncMaps(mapEnda, mapEndb);

// // TODO only deal with map for study question
// // only load html block needed map objects will have generic names also
function resizeAllMaps() {
  switch (studyVersion) {
    case 0: // animate
      map1.resize();
      break;
    case 1: // side by side
      map2a.resize();
      map2b.resize();
      break;
    case 2: // slider
      map3Arr[0].resize();
      map3Arr[1].resize();
      break;
    default: // animate
      mapdef.resize();
      break;
  }
  // mapEndArr[0].resize();
  // mapEndArr[1].resize();
  mapEnda.resize();
  mapEndb.resize();
}

document.addEventListener('aggree-clicked', () => {
  resizeAllMaps();
});

document.addEventListener('sus-clicked', () => {
  mapEnda.setZoom(5);
  mapEnda.setZoom(5);
  resizeAllMaps();
  // mapEndArr[0].setZoom(11);
  // mapEndArr[1].setZoom(11);
});

document.addEventListener('disaggree-clicked', () => {
  resizeAllMaps();
});

const urlString = window.location.href;
const url = new URL(urlString);
const campaign = url.searchParams.get('campaign');

// ga event action, category, label
const datestamp = new Date().toISOString();
store.setStateItem('study started', true);
store.setStateItem('study started time', datestamp);
store.setStateItem('campaign', campaign);
store.setStateItem('mobile', utility.isMobileDevice());

// all the Aggreement change elements possible
const aggrementChangeElements = ['aggree-button'];

// elements to add to UI after clicking on aggree to
// particpate in study
aggrementChangeElements.forEach((elementUIID) => {
  handlers.addHandlerAgreeClick(elementUIID);
});

// all the Disaggreement change elements possible
const disaggrementChangeElements = ['diaggree-button'];

// elements to add to UI after clicking on aggree to
// particpate in study
disaggrementChangeElements.forEach((elementUIID) => {
  handlers.addHandlerDisagreeClick(elementUIID);
});

// all the submit change elements possible
const submitChangeElements = ['submit-button-to-sus-0', 'submit-button-to-sus-1', 'submit-button-to-sus-2'];

// elements to add to UI after clicking on submit change
// from one of three map questions
submitChangeElements.forEach((elementUIID) => {
  handlers.addHandlerSubmitChangeClick(elementUIID);
});

// all the SUS change elements possible
const susChangeElements = ['submit-button-to-end'];

// elements to add to UI after clicking on submit change
// from one of three map questions
susChangeElements.forEach((elementUIID) => {
  handlers.addHandlerSubmitSUSClick(elementUIID);
});

// only updates one map how do get every map
document.addEventListener('grid-update', () => {
  const currentSquareGridGeoJSON = store.getStateItem('squareGridGeoJSON');
  switch (studyVersion) {
    case 0: // animate
      map1.getSource('change-grid').setData(currentSquareGridGeoJSON);
      break;
    case 1: // side by side
      map2a.getSource('change-grid').setData(currentSquareGridGeoJSON);
      map2b.getSource('change-grid').setData(currentSquareGridGeoJSON);
      break;
    case 2: // slider
      map3Arr[0].getSource('change-grid').setData(currentSquareGridGeoJSON);
      map3Arr[1].getSource('change-grid').setData(currentSquareGridGeoJSON);
      break;
    default: // animate
      mapdef.getSource('change-grid').setData(currentSquareGridGeoJSON);
      break;
  }
  // mapEndArr[0].getSource('change-grid').setData(currentSquareGridGeoJSON);
  // mapEndArr[1].getSource('change-grid').setData(currentSquareGridGeoJSON);
  mapEnda.getSource('change-grid').setData(currentSquareGridGeoJSON);
  mapEndb.getSource('change-grid').setData(currentSquareGridGeoJSON);
});

const susBtnGroupElements = ['btn-group-sus-1',
  'btn-group-sus-2',
  'btn-group-sus-3',
  'btn-group-sus-4',
  'btn-group-sus-5',
  'btn-group-sus-6',
  'btn-group-sus-7',
  'btn-group-sus-8',
  'btn-group-sus-9',
  'btn-group-sus-10'];

susBtnGroupElements.forEach((elementUIID) => {
  // add question handler
  handlers.addHandlerSUSQuestionClick(elementUIID);
});

// sus question state items
const susName = 'sus-question-';
const susIterations = 10;
utility.setStateForGroup(susName, susIterations);

// add grid box state items
const gridIterations = 42;
const gridName = 'grid-box-';
utility.setStateForGroup(gridName, gridIterations);

// check study session state for completetion
const isStudycompleted = store.getStateItem('studycompleted');
let studyCompleted = false;
if (typeof isStudycompleted === 'boolean') {
  studyCompleted = isStudycompleted;
} else {
  studyCompleted = false;
}

// check study session state for completetion
const StudyAgrreement = store.getStateItem('study-agreement');
let studyAgrreed = false;
if (typeof StudyAgrreement === 'boolean') {
  studyAgrreed = StudyAgrreement;
} else {
  studyAgrreed = false;
}

// already agreed
if (studyAgrreed) {
  // handleAgreeClick();
}

// hide study
if (studyCompleted) { //
  store.setStateItem('studycompleted', true);
} else {
  store.setStateItem('studycompleted', false);
}
