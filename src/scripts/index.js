// import dependencies
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
const utility = new Utility();

const URLPath = window.location.hash;

// study constraints number of questions starts with 0
let studyVersion = 0; // default study version
if (utility.checkValidObject(store.getStateItem('study-question'))) {
  studyVersion = store.getStateItem('study-question');
} else {
  const studyMinOne = 0;
  const studyMaxOne = 2;
  studyVersion = Math.floor(Math.random() * (studyMaxOne - studyMinOne + 1) + studyMinOne);
  store.setStateItem('study-question', studyVersion);
}

// study constraints number of questions starts with 0
let mapVersion = 0; // default study version
if (utility.checkValidObject(store.getStateItem('map-version'))) {
  mapVersion = store.getStateItem('map-version');
} else {
  const mapMinOne = 0;
  const mapMaxOne = 2;
  mapVersion = Math.floor(Math.random() * (mapMaxOne - mapMinOne + 1) + mapMinOne);
  store.setStateItem('map-version', mapVersion);
}

if (!utility.checkValidObject(store.getStateItem('uuid'))) {
  store.setStateItem('uuid', utility.uuid().toString());
}

if (!utility.checkValidObject(store.getStateItem('study-completed'))) {
  store.setStateItem('study-completed', false);
}

if (!utility.checkValidObject(store.getStateItem('susanswers-submited'))) {
  store.setStateItem('susanswers-submited', false);
}

if (!utility.checkValidObject(store.getStateItem('grid-submited'))) {
  store.setStateItem('grid-submited', false);
}

if (!utility.checkValidObject(store.getStateItem('study-agreement'))) {
  store.setStateItem('study-agreement', false);
}

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
library.add(fas, far);
dom.watch();

const mapBoxConfig = new MapBoxConfig();
const handlers = new Handlers();

// load only the block needed
utility.loadHTMLBlock('block-study-aggreement-holder', blockStudyAggreement);
utility.loadHTMLBlock('block-study-dissaggree-holder', blockStudyDissaggree);
utility.loadHTMLBlock('block-study-sus-holder', blockStudySUS);
utility.loadHTMLBlock('block-study-completed-holder', blockStudyCompleted);

let map1;
let map2a;
let map2b;
let map3Arr;
let mapdef;

switch (studyVersion) {
  case 0: // animate
    utility.loadHTMLBlock('block-study-question-1-holder', blockStudyQuestion1);
    map1 = mapBoxConfig.makeAnimateMap('map-1', 0);
    break;
  case 1: // side by side
    utility.loadHTMLBlock('block-study-question-2-holder', blockStudyQuestion2);
    map2a = mapBoxConfig.makeMap('map-2a', 0);
    map2b = mapBoxConfig.makeMap('map-2b', 1);
    mapBoxConfig.syncMaps(map2a, map2b);
    break;
  case 2: // slider
    utility.loadHTMLBlock('block-study-question-3-holder', blockStudyQuestion3);
    map3Arr = mapBoxConfig.makeCompareMap('map-3a', 'map-3b', 'compare-wrapper');
    mapBoxConfig.syncMaps(map3Arr[0], map3Arr[1]);
    break;
  default: // animate
    utility.loadHTMLBlock('block-study-question-1-holder', blockStudyQuestion1);
    mapdef = mapBoxConfig.makeAnimateMap('map-1', 0);
    break;
}

// compare maps need to uncomment html too
// const mapEndAArr = mapBoxConfig.makeCompareMap('map-c-enda', 'map-c-endb',
//        'compare-end1-wrapper', false, false);
// const mapEndBArr = mapBoxConfig.makeCompareMap('map-c-endc', 'map-c-endd',
//        'compare-end2-wrapper', true, false);
// mapBoxConfig.syncMaps(mapEndAArr[0], mapEndAArr[1]);
// mapBoxConfig.syncMaps(mapEndBArr[0], mapEndBArr[1]);

const mapEnda = mapBoxConfig.makeAnimateMap('map-enda', 99, false, false, true);
const mapEndb = mapBoxConfig.makeAnimateMap('map-endb', 99, true, false, true);

//  single maps
// const mapEnda = mapBoxConfig.makeMap('map-enda', 99, false, false);
// const mapEndb = mapBoxConfig.makeMap('map-endb',99, true, false);
// mapBoxConfig.syncMaps(mapEndArr[0], mapEndArr[1]);

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
  // mapEndAArr[0].resize();
  // mapEndAArr[1].resize();
  // mapEndBArr[0].resize();
  // mapEndBArr[1].resize();

  mapEnda.resize();
  mapEndb.resize();
}

document.addEventListener('aggree-clicked', () => {
  resizeAllMaps();
});

document.addEventListener('sus-clicked', () => {
  resizeAllMaps();
  mapEnda.setZoom(5);
  mapEnda.setZoom(5);

  // mapEndAArr[0].setZoom(5);;
  // mapEndAArr[1].setZoom(5);;
  // mapEndBArr[0].setZoom(5);;
  // mapEndBArr[1].setZoom(5);;

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


handlers.addHandlerPlayClick('completed', 'completed-play');
handlers.addHandlerPauseClick('completed', 'completed-pause');
handlers.addHandlerLayersOffClick('completed', 'completed-stop');

handlers.addHandlerPlayClick('study', 'study-play');
handlers.addHandlerPauseClick('study', 'study-pause');
handlers.addHandlerLayersOffClick('study', 'study-stop');


if (!utility.checkValidObject(store.getStateItem('map-completed-animation'))) {
  store.setStateItem('map-completed-animation', true);
} else {
  const isAnimated = store.getStateItem('map-completed-animation');
  if (isAnimated) {
    const playElement = document.getElementById('completed-play');
    if (playElement) {
      playElement.classList.add('selected');
    }
  } else {
    const pauseElement = document.getElementById('completed-pause');
    if (pauseElement) {
      pauseElement.classList.add('selected');
    }
  }
}

if (!utility.checkValidObject(store.getStateItem('map-completed-animation-stop'))) {
  store.setStateItem('map-completed-animation-stop', true);
} else {
  const isAnimated = store.getStateItem('map-completed-animation-stop');
  if (!isAnimated) {
    const stopElement = document.getElementById('completed-stop');
    if (stopElement) {
      utility.unsetPlayButtons('completed');
      stopElement.classList.add('selected');
    }
  }
}

if (!utility.checkValidObject(store.getStateItem('map-study-animation'))) {
  store.setStateItem('map-study-animation', true);
} else {
  const isAnimated = store.getStateItem('map-study-animation');
  if (isAnimated) {
    const playElement = document.getElementById('study-play');
    if (playElement) {
      playElement.classList.add('selected');
    }
  } else {
    const pauseElement = document.getElementById('study-pause');
    if (pauseElement) {
      pauseElement.classList.add('selected');
    }
  }
}

if (!utility.checkValidObject(store.getStateItem('map-study-animation-stop'))) {
  store.setStateItem('map-study-animation-stop', true);
} else {
  const isAnimated = store.getStateItem('map-study-animation-stop');
  if (!isAnimated) {
    const stopElement = document.getElementById('study-stop');
    if (stopElement) {
      utility.unsetPlayButtons('study');
      stopElement.classList.add('selected');
    }
  }
}

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

// remove imagery directions when not imagery
if (mapVersion !== 2) {
  const imageryDirectionsElems = document.querySelectorAll('.for-sat');

  imageryDirectionsElems.forEach((elem) => {
    elem.setAttribute('style', 'display: none !important');
  });
}

// sus question state items
const susName = 'sus-question-';
const susIterations = 10;
utility.setStateForGroup(susName, susIterations);
utility.setDomStateForGroup(susName, susIterations);

// add grid box state items
const gridIterations = 42;
const gridName = 'grid-box-';
utility.setStateForGroup(gridName, gridIterations);

// check study session state for completetion
const isStudycompleted = store.getStateItem('study-completed');
let studyCompleted = false;
if (typeof isStudycompleted === 'boolean') {
  studyCompleted = isStudycompleted;
} else {
  studyCompleted = false;
}

// check study session state for aggreeing to study
const StudyAgrreement = store.getStateItem('study-agreement');
let studyAgrreed = false;
if (typeof StudyAgrreement === 'boolean') {
  studyAgrreed = StudyAgrreement;
} else {
  studyAgrreed = false;
}

// check study session state for submitting study
const gridSubmitedState = store.getStateItem('grid-submited');
let gridSubmited = false;
if (typeof gridSubmitedState === 'boolean') {
  gridSubmited = gridSubmitedState;
} else {
  gridSubmited = false;
}

// check study session state for submitting sus questions
const susSubmitedState = store.getStateItem('susanswers-submited');
let susSubmited = false; // eslint-disable-line
if (typeof gridSubmitedState === 'boolean') {
  susSubmited = susSubmitedState;
} else {
  susSubmited = false;
}

// submit buttons
const aggrementElement = document.getElementById('aggree-button');
const diaggreeElement = document.getElementById('diaggree-button'); // eslint-disable-line
const gridSubmitElement = document.getElementById(`submit-button-to-sus-${studyVersion}`);
const completedSubmitElement = document.getElementById('submit-button-to-end');

if (studyAgrreed) {
  switch (URLPath) {
    case '#':
      if (studyAgrreed) {
        if (aggrementElement) {
          aggrementElement.click();
        }
      }
      break;
    case '#map':
      if (studyAgrreed) {
        if (aggrementElement) {
          aggrementElement.click();
        }
      }
      break;
    case '#sus-questions':
      if (gridSubmited) {
        if (gridSubmitElement) {
          gridSubmitElement.click();
        }
      }
      break;
    default:
      if (studyAgrreed) {
        if (aggrementElement) {
          aggrementElement.click();
        }
      }
      break;
  }
}

window.addEventListener('hashchange', (event) => {
  window.location.reload();
});

// hide study
if (studyCompleted) {
  if (completedSubmitElement) {
    completedSubmitElement.click();
  }
}
