// import dependencies
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import mapboxgl from 'mapbox-gl';
import { Store } from './store';
import { GoogleAnalytics } from './ga';
import { MapBoxConfig } from './map-config';
import { Utility } from './utility';
import { Handlers } from './handlers';

const store = new Store({});
const googleAnalytics = new GoogleAnalytics();
const mapBoxConfig = new MapBoxConfig();
const utility = new Utility();
const handlers = new Handlers();

if (!utility.checkValidObject(store.getStateItem('uuid'))) {
  store.setStateItem('uuid', uuid().toString());
}

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
library.add(fas, far);
dom.watch();

function resizeAllMaps() {
  map1.resize();
  map2a.resize();
  map2b.resize();
  map3.resize();
  mapEnda.resize();
  mapEndb.resize();
}

const urlString = window.location.href;
const url = new URL(urlString);
const campaign = url.searchParams.get('campaign');

// ga event action, category, label
googleAnalytics.setEvent('data', 'study started', 'true');

// ga event action, category, label
googleAnalytics.setEvent('data', 'campaign', campaign);

// ga event action, category, label
googleAnalytics.setEvent('data', 'mobile', utility.isMobileDevice());

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';

// create all the mapbox map objects
const map1 = mapBoxConfig.makeMap('map-1');
const map2a = mapBoxConfig.makeMap('map-2a');
const map2b = mapBoxConfig.makeMap('map-2b');
const map3 = mapBoxConfig.makeMap('map-3');
const mapEnda = mapBoxConfig.makeMap('map-enda');
const mapEndb = mapBoxConfig.makeMap('map-endb');

// create mapbox navigation control instance
const nav = mapBoxConfig.addNav();

// add navigatio to maps
// I may not need this if I do not let user zoom/pan
map1.addControl(nav, 'top-left');
map2a.addControl(nav, 'top-left');
map2b.addControl(nav, 'top-left');
map3.addControl(nav, 'top-left');
mapEnda.addControl(nav, 'top-left');
mapEndb.addControl(nav, 'top-left');

// all the submit change elements possible
const submitChangeElements = ['submit-button-to-sus-0', 'submit-button-to-sus-1', 'submit-button-to-sus-2']

// elements to add to UI after clicking on submit change
// from one of three map questions
submitChangeElements.forEach( elementUIID => {
  handlers.addHandlerSubmitChangeClick(elementUIID);
});

// all the SUS change elements possible
const susChangeElements = ['submit-button-to-end']

// elements to add to UI after clicking on submit change
// from one of three map questions
susChangeElements.forEach( elementUIID => {
  console.log('susChangeElements', elementUIID)
  handlers.addHandlerSubmitSUSClick(elementUIID);
});


// function
function handleAgreeClick() {
  const minOne = 0;
  const maxOne = 2;
  const studyVersion = Math.floor(Math.random() * (maxOne - minOne + 1) + minOne);
  // const  = ; //Math.floor(Math.random() * (3 - 1 + 1) + 1);

  document.getElementById(`study-progress-map-${studyVersion}`).classList.remove('d-none');
  // document.getElementById(`study-progress-sus`).classList.remove('d-none');
  document.getElementById('study-agreement-all').classList.add('d-none');


  resizeAllMaps();
  store.setStateItem('study-agreement', true);
  googleAnalytics.setEvent('data', 'study-agreement', true);
  return null;
}

function handleDissagreeClick() {
  document.getElementById('study-progress').classList.remove('d-none');
  document.getElementById('study-dissaggree').classList.remove('d-none');
  document.getElementById('study-agreement-all').classList.add('d-none');
  document.getElementById('study-progress').remove();
  store.setStateItem('study-agreement', false);
  // ga event action, category, label
  googleAnalytics.setEvent('data', 'study-agreement', false);

  return null;
}



function uuid() {
  return crypto.getRandomValues(new Uint32Array(4)).join('-');
}

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
if (studyCompleted) { // || studyAgrreed
  handleAgreeClick();

  const distancekm = store.getStateItem('distancekm');
  const distancemeters = store.getStateItem('distancemeters');
  const distancefeet = store.getStateItem('distancefeet');
  const distancemiles = store.getStateItem('distancemiles');
  const studydistancequestion = store.getStateItem('studydistancequestion');

  document.getElementById('study-complete-question').innerHTML = `${studydistancequestion}`;
  document.getElementById('study-complete-miles').innerHTML = `${distancemiles.toFixed(2)} miles or`;
  document.getElementById('study-complete-feet').innerHTML = `${distancefeet.toFixed(2)} feet or`;
  document.getElementById('study-complete-km').innerHTML = `${distancekm.toFixed(2)} kilometers or`;
  document.getElementById('study-complete-meters').innerHTML = `${distancemeters.toFixed(2)} meters.`;

  document.getElementById('study-complete').classList.remove('d-none');
  document.getElementById('study-progress').remove();
  document.getElementById('map-holder').remove();
  document.getElementById('study-agreement-all').remove();
  document.getElementById('map-action-holder').className ='col-12'; // eslint-disable-line
} else {
  store.setStateItem('studycompleted', false);
}

const aggreeButtonElement = document.getElementById('aggree-button');
if (aggreeButtonElement) {
  aggreeButtonElement.addEventListener('click', handleAgreeClick);
}

const dissaggreeButtonElement = document.getElementById('diaggree-button');
if (dissaggreeButtonElement) {
  dissaggreeButtonElement.addEventListener('click', handleDissagreeClick);
}
