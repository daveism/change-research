import { Store } from './store';

const store = new Store({});

export class Utility {
  constructor() {
    this.foo = {};
    this.check = false;
  }

  // checks is Javascript object is a valid object
  //
  // @param obj - object
  // @return boolean
  checkValidObject(obj) {
    this.obj = obj;
    if (this.obj === undefined || this.obj === null) { return false; }
    if (typeof this.obj === 'object' && Object.keys(obj).length === 0) { return false; }
    if (typeof this.obj === 'string' && this.obj.length === 0) { return false; }

    return true;
  }

  // creates a uuid
  //
  // @return string
  uuid() {
    this.crypto = crypto.getRandomValues(new Uint32Array(4)).join('-');
    return this.crypto;
  }

  // checks if current device is a mobile
  //
  // @return boolean
  isMobileDevice() {
    this.check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) return true;})(navigator.userAgent||navigator.vendor||window.opera); // eslint-disable-line
    return this.check;
  }

  // checks html as a template/block
  //
  // @param placeHolderElementID - HTML element ID that will hold the template
  // @param template - HTML content
  // @return boolean
  loadHTMLBlock(placeHolderElementID, template) {
    const componentElem = document.getElementById(placeHolderElementID);

    // make sure template exsists
    if (template) {
      if (componentElem != null) {
        componentElem.addEventListener('load', () => {
          this.triggerEvent('hml-block-loaded', placeHolderElementID);
        });

        componentElem.addEventListener('unload', () => {
          this.triggerEvent('hml-block-unloaded', placeHolderElementID);
        });

        // Load template into placeholder element
        componentElem.innerHTML = template;
      }
    }
  }

  // triggers a dom event
  //
  // @param eventName - string event name for a listner to listen too
  // @param detail - object details for event
  // @return boolean
  triggerEvent(eventName, detail) {
    this.event = new window.CustomEvent(eventName, { detail });
    document.dispatchEvent(this.event);
  }

  // iterates x number of iterations and sets
  //    sus questions top state
  //
  // @param eventName - string event name for a listner to listen too
  // @param detail - object details for event
  // @return null
  setDomStateForGroup(statetext, iterations) {
    const value = store.getStateItem(`${statetext}${iterations}`, 0);
    const btnPrefix = `btn-sus-q${iterations}-`;
    const aggrementElement = document.getElementById(`${btnPrefix}${value}`);
    console.log('setDomStateForGroup', `${btnPrefix}${value}`)
    if (aggrementElement) {
      aggrementElement.classList.add('selected');
    }
    if (iterations > 0) {
      const nextIteration = iterations - 1;
      this.setDomStateForGroup(statetext, nextIteration);
    }
  }

  // iterates x number of iterations and writes a
  // a default zero value state key
  //
  // @param eventName - string event name for a listner to listen too
  // @param detail - object details for event
  // @return null
  setStateForGroup(statetext, iterations) {
    if (!this.checkValidObject(store.getStateItem(`${statetext}${iterations}`))) {
      store.setStateItem(`${statetext}${iterations}`, 0);
    }
    if (iterations > 0) {
      const nextIteration = iterations - 1;
      this.setStateForGroup(statetext, nextIteration);
    }
  }

  // iterates x number of iterations and writes to the API
  //
  // @param eventName - string event name for a listner to listen too
  // @param detail - object details for event
  // @return null
  setAPIForGroup(statetext, iterations, valueArray = []) {
    const key = `${statetext}${iterations}`;
    const value = store.getStateItem(`${statetext}${iterations}`);
    // capture in array so we can write complted array to api
    valueArray.push({ key, value });
    if (iterations > 0) {
      const nextIteration = iterations - 1;
      this.setAPIForGroup(statetext, nextIteration, valueArray);
      return null;
    }
    // write complted array to api
    // recordStudyData.setEvent('data', 'gridanswers', JSON.stringify(valueArray));
    const datestamp = new Date().toISOString();
    store.setStateItem('gridanswers', valueArray);
    store.setStateItem('gridanswers-time', datestamp);
    return null;
  }
}
