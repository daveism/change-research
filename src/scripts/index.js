// import dependencies
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import mapboxgl from 'mapbox-gl';
import { Store } from './store';
import { GoogleAnalytics } from './ga';

const store = new Store({});
const googleAnalytics = new GoogleAnalytics();

if (!checkValidObject(store.getStateItem('uuid'))) {
  store.setStateItem('uuid', uuid().toString());
}
// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
library.add(fas, far);
dom.watch();

function isMobileDevice() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera); // eslint-disable-line
  return check;
}

const urlString = window.location.href;
const url = new URL(urlString);
const campaign = url.searchParams.get('campaign');

// ga event action, category, label
googleAnalytics.setEvent('data', 'study started', 'true');

// ga event action, category, label
googleAnalytics.setEvent('data', 'campaign', campaign);

// ga event action, category, label
googleAnalytics.setEvent('data', 'mobile', isMobileDevice());

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';

const map1 = new mapboxgl.Map({
  container: 'map-1',
  style: 'mapbox://styles/mapbox/streets-v11',
  // 'mapbox://styles/daveism/cjwrrdfd20uic1dnzsti2owlk', - dark
  center: [-98, 38.88], // starting position [lng, lat]
  zoom: 3, // starting zoom
  showZoom: true,
  touchEnabled: true,
  keybindings: true
});

const map2a = new mapboxgl.Map({
  container: 'map-2a',
  style: 'mapbox://styles/mapbox/streets-v11',
  // 'mapbox://styles/daveism/cjwrrdfd20uic1dnzsti2owlk', - dark
  center: [-98, 38.88], // starting position [lng, lat]
  zoom: 3, // starting zoom
  showZoom: true,
  touchEnabled: true,
  keybindings: true
});

const map2b = new mapboxgl.Map({
  container: 'map-2b',
  style: 'mapbox://styles/mapbox/streets-v11',
  // 'mapbox://styles/daveism/cjwrrdfd20uic1dnzsti2owlk', - dark
  center: [-98, 38.88], // starting position [lng, lat]
  zoom: 3, // starting zoom
  showZoom: true,
  touchEnabled: true,
  keybindings: true
});

const map3= new mapboxgl.Map({
  container: 'map-3',
  style: 'mapbox://styles/mapbox/streets-v11',
  // 'mapbox://styles/daveism/cjwrrdfd20uic1dnzsti2owlk', - dark
  center: [-98, 38.88], // starting position [lng, lat]
  zoom: 3, // starting zoom
  showZoom: true,
  touchEnabled: true,
  keybindings: true
});

const nav = new mapboxgl.NavigationControl();
map1.addControl(nav, 'top-left');
map2a.addControl(nav, 'top-left');
map2b.addControl(nav, 'top-left');
map3.addControl(nav, 'top-left');

// map.on('zoomend', () => {
//   console.log('searchzoom', map.getZoom())
//   if (map.getZoom() > 10) {
//     const circleButtonElem = document.getElementById('circle-button');
//     if (circleButtonElem.classList.contains('disabled')) {
//       circleButtonElem.classList.remove('disabled');
//       $('#circle-button').tooltip({ trigger: 'manual' });
//       $('#circle-button').tooltip('hide');
//       $('#circle-button').tooltip('disable');
//       $('#circle-button').tooltip('dispose');
//       document.getElementById('step2-title').classList.remove('disabled');
//       document.getElementById('step2-directions').classList.remove('disabled');
//     }
//   }
// });

// function
function handleAgreeClick() {
  const minOne = 0;
  const maxOne = 2;
  const studyVersion = Math.floor(Math.random() * (maxOne - minOne + 1) + minOne);
  // const  = ; //Math.floor(Math.random() * (3 - 1 + 1) + 1);

  // document.getElementById(`study-progress-map-${studyVersion}`).classList.remove('d-none');
  document.getElementById(`study-progress-sus`).classList.remove('d-none');
  document.getElementById('study-agreement-all').classList.add('d-none');

  // document.getElementById('study-dissaggree').remove();
  // document.getElementById('map-holder').classList.remove('d-none');
  // document.getElementById('study-agreement-all').classList.add('d-none');
  // document.getElementById('study-dissaggree').remove();
  // document.getElementById('map-holder').classList.remove('start-height-map');
  // // document.getElementById('map-action-holder').classList.remove('start-height-actions');
  // document.getElementById('map-action-holder').classList.add('step-height-actions');
  // document.getElementById('map-action-holder').classList.add('col-sm-12');
  // document.getElementById('map-action-holder').classList.add('col-md-5');
  // document.getElementById('map-action-holder').classList.remove('col-xl-5');
  // document.getElementById('map-holder').classList.add('step-height-map');
  map1.resize();
  map2a.resize();
  map2b.resize();
  map3.resize();
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

// ensure the object or variable is valid...
// @param obj - typeless
function checkValidObject(obj) {
  if (obj === undefined || obj === null) { return false; }
  if (typeof obj === 'object' && Object.keys(obj).length === 0) { return false; }
  if (typeof obj === 'string' && obj.length === 0) { return false; }

  return true;
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
  // document.getElementById('study-progress').classList.remove('d-none');
  store.setStateItem('studycompleted', false);
}

// function handleStepNavClick(e) {
//   const valNode = e.target.getAttributeNode('val'); // eslint-disable-line
//   if (valNode) {
//
//     document.getElementById('step-1').classList.remove('step-not-vis');
//     document.getElementById('step-2').classList.remove('step-not-vis');
//     document.getElementById('step-3').classList.remove('step-not-vis');
//     document.getElementById('step-1').classList.add('step-not-vis');
//     document.getElementById('step-2').classList.add('step-not-vis');
//     document.getElementById('step-3').classList.add('step-not-vis');
//     const value = e.target.getAttributeNode('val').value; // eslint-disable-line
//     document.getElementById(`${value}`).classList.remove('step-not-vis');
//   }
// }
//
// // const stepNav1Elem = document.getElementById('step-nav-1');
// if (stepNav1Elem) {
//   stepNav1Elem.addEventListener('click', handleStepNavClick);
// }
//
// const stepNav2Elem = document.getElementById('step-nav-2');
// if (stepNav2Elem) {
//   stepNav2Elem.addEventListener('click', handleStepNavClick);
// }
//
// const stepNav3Elem = document.getElementById('step-nav-3');
// if (stepNav3Elem) {
//   stepNav3Elem.addEventListener('click', handleStepNavClick);
// }
//
// function handleSubmitButtonClick(e) {
//   const submitButtonElem = document.getElementById('submit-button');
//   if (submitButtonElem.classList.contains('disabled')) {
//     $('#submit-button').tooltip({ trigger: 'hover focus' });
//     $('#submit-button').tooltip('show');
//     return null;
//   } else { // eslint-disable-line
//     $('#submit-button').tooltip({ trigger: 'manual' });
//     $('#submit-button').tooltip('hide');
//     $('#submit-button').tooltip('disable');
//     $('#submit-button').tooltip('dispose');
//
//     const circle = store.getStateItem('circle');
//     const line = store.getStateItem('line');
//     const distancekm = store.getStateItem('distancekm');
//     const distancemeters = store.getStateItem('distancemeters');
//     const distancefeet = store.getStateItem('distancefeet');
//     const distancemiles = store.getStateItem('distancemiles');
//     const studydistancequestion = store.getStateItem('studydistancequestion');
//
//     // ga event action, category, label
//     googleAnalytics.setEvent('data', 'circle-submitted', circle);
//     googleAnalytics.setEvent('data', 'line-submitted', line);
//     googleAnalytics.setEvent('data', 'distancekm-submitted', distancekm);
//     googleAnalytics.setEvent('data', 'distancefeet-submitted', distancefeet);
//     googleAnalytics.setEvent('data', 'distancemeters-submitted', distancemeters);
//     googleAnalytics.setEvent('data', 'distancemiles-submitted', distancemiles);
//
//     document.getElementById('study-complete-question').innerHTML = `${studydistancequestion}`;
//     document.getElementById('study-complete-miles').innerHTML = `${distancemiles.toFixed(2)} miles or`;
//     document.getElementById('study-complete-feet').innerHTML = `${distancefeet.toFixed(2)} feet or`;
//     document.getElementById('study-complete-km').innerHTML = `${distancekm.toFixed(2)} kilometers or`;
//     document.getElementById('study-complete-meters').innerHTML = `${distancemeters.toFixed(2)} meters.`;
//
//     // end study
//     document.getElementById('study-complete').classList.remove('d-none');
//     document.getElementById('study-progress').remove();
//     document.getElementById('map-holder').remove();
//     document.getElementById('study-agreement-all').remove();
//     document.getElementById('map-action-holder').className ='col-12'; // eslint-disable-line
//     store.setStateItem('studycompleted', true);
//
//     // ga event action, category, label
//     googleAnalytics.setEvent('data', 'studycompleted', true);
//   }
//   return null;
// }
//
// const submitButtonElem = document.getElementById('submit-button');
// if (submitButtonElem) {
//   submitButtonElem.addEventListener('click', handleSubmitButtonClick);
// }

// const directionsOne = [
//   'Search for a location you care about.',
//   'Search for a location to find about crime.',
//   'Search for a location to find about the closest pizza place.'
// ];
//
// const minOne = 0;
// const maxOne = 2;
// const messageIndexOne = Math.floor(Math.random() * (maxOne - minOne + 1) + minOne);
// const stepDirections1 = document.getElementById('step1-directions');
// if (stepDirections1) {
//   stepDirections1.innerHTML = directionsOne[messageIndexOne];
// }
//
// // ga event action, category, label
// googleAnalytics.setEvent('data', 'step1text', directionsOne[messageIndexOne]);

// const directionsTwo = [
//   'Draw a circle that represents 1 mile.',
//   'Draw a circle that represents a 5-minute <strong>DRIVE</strong>.',
//   'Draw a circle that represents a 5-minute <strong>WALK</strong>.'
// ];

// const minTwo = 0;
// const maxTwo = 2;
// const messageIndexTwo = Math.floor(Math.random() * (maxTwo - minTwo + 1) + minTwo);
// const stepDirections2 = document.getElementById('step2-directions');
// if (stepDirections2) {
//   stepDirections2.innerHTML = directionsTwo[messageIndexTwo];
// }
//
// // ga event action, category, label
// googleAnalytics.setEvent('data', 'step2text', directionsTwo[messageIndexTwo]);
// store.setStateItem('studydistancequestion', directionsTwo[messageIndexTwo]);

const aggreeButtonElement = document.getElementById('aggree-button');
if (aggreeButtonElement) {
  aggreeButtonElement.addEventListener('click', handleAgreeClick);
}

const dissaggreeButtonElement = document.getElementById('diaggree-button');
if (dissaggreeButtonElement) {
  dissaggreeButtonElement.addEventListener('click', handleDissagreeClick);
}

// const step2MinorDirectionsElement = document.getElementById('step2-minor-directions');
// if (step2MinorDirectionsElement) {
//   if (isMobileDevice()) {
//     step2MinorDirectionsElement.innerHTML = 'Click on the "Draw a circle" button. Click on the map and drag your finger across the map until the radius of the circle best represents the distance.';
//   }
// }
