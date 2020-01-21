// import dependencies
// TODOS
//   record data at end so its all in one row.... store it in store then get each element
//    record progress in state so when particpatant comes back or hist back button
//            they are back at state they left the study
// add change maps
// completed needs expected map so people can see how they did
// figure out how only load and initailze maps needed.
//      not all at the start so there is less lag at start
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Store } from './store';
import { RecordStudyData } from './record-study-data';
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
const recordStudyData = new RecordStudyData();
const mapBoxConfig = new MapBoxConfig();
const utility = new Utility();
const handlers = new Handlers();

if (!utility.checkValidObject(store.getStateItem('uuid'))) {
  store.setStateItem('uuid', utility.uuid().toString());
}

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
library.add(fas, far);
dom.watch();

// load all html blocks
utility.loadHTMLBlock('block-study-aggreement-holder', blockStudyAggreement);
utility.loadHTMLBlock('block-study-dissaggree-holder', blockStudyDissaggree);
utility.loadHTMLBlock('block-study-question-1-holder', blockStudyQuestion1);
utility.loadHTMLBlock('block-study-question-2-holder', blockStudyQuestion2);
utility.loadHTMLBlock('block-study-question-3-holder', blockStudyQuestion3);
utility.loadHTMLBlock('block-study-sus-holder', blockStudySUS);
utility.loadHTMLBlock('block-study-completed-holder', blockStudyCompleted);

// create all the mapbox map objects
const map1 = mapBoxConfig.makeMap('map-1');
const map2a = mapBoxConfig.makeMap('map-2a');
const map2b = mapBoxConfig.makeMap('map-2b');
const map3Arr = mapBoxConfig.makeCompareMap('map-3a', 'map-3b', 'compare-wrapper');
const mapEnda = mapBoxConfig.makeMap('map-enda');
const mapEndb = mapBoxConfig.makeMap('map-endb');

// create mapbox navigation control instance
const nav = mapBoxConfig.addNav();

// add navigatio to maps
// I may not need this if I do not let user zoom/pan
map1.addControl(nav, 'top-left');
map2a.addControl(nav, 'top-left');
map2b.addControl(nav, 'top-left');
map3Arr[0].addControl(nav, 'top-left');
map3Arr[1].addControl(nav, 'top-left');
mapEnda.addControl(nav, 'top-left');
mapEndb.addControl(nav, 'top-left');

// sync maps
mapBoxConfig.synMaps(map2a, map2b);
mapBoxConfig.synMaps(mapEnda, mapEndb);

// study constraints number of questions starts with 0
const studyMinOne = 0;
const studyMaxOne = 2;
const studyVersion = Math.floor(Math.random() * (studyMaxOne - studyMinOne + 1) + studyMinOne);
store.setStateItem('study-question', studyVersion);
recordStudyData.setEvent('data', 'study-question', studyVersion);

// // TODO only deal with map for study question
// // only load html block needed map objects will have generic names also
function resizeAllMaps() {
  map1.resize();
  map2a.resize();
  map2b.resize();
  map3Arr[0].resize();
  map3Arr[1].resize();
  mapEnda.resize();
  mapEndb.resize();
}

document.addEventListener('aggree-clicked', () => {
  resizeAllMaps();
});

document.addEventListener('disaggree-clicked', () => {
  resizeAllMaps();
});

const urlString = window.location.href;
const url = new URL(urlString);
const campaign = url.searchParams.get('campaign');

// ga event action, category, label
recordStudyData.setEvent('data', 'study started', 'true');

// ga event action, category, label
recordStudyData.setEvent('data', 'campaign', campaign);

// ga event action, category, label
recordStudyData.setEvent('data', 'mobile', utility.isMobileDevice());

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
  map1.getSource('change-grid').setData(currentSquareGridGeoJSON);
  map2a.getSource('change-grid').setData(currentSquareGridGeoJSON);
  map2b.getSource('change-grid').setData(currentSquareGridGeoJSON);
  map3Arr[0].getSource('change-grid').setData(currentSquareGridGeoJSON);
  map3Arr[1].getSource('change-grid').setData(currentSquareGridGeoJSON);
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
