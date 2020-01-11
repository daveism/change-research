// import { StorageAPI } from './localStorageAPI';

/**
* This component is intended to handle the storage and retrieval of the state of
* As of this writing it is using localStorage to do this.
* Uses simple class instance methods with the short-hand method declaration
* pattern.
*
* To note: There is a difference between the Store and the State. As of 0a3106e
* the Store is a String saved to the browsers localStorage and is a serialized
* version of the State. The State is an Object which is interacted with by
* parsing the State string from the Store, modifying the results of the parse,
* and re-serializing it back to the Store.
*/
const STATE_KEY = 'state';

export class Store {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  constructor() {
    // this.state = state;
    // this.store = new StorageAPI();
    if (Store.storageAvailable()) {
      this.storage = window.localStorage;
      this.state = {};
      if (this.checkStateExists) {
        this.state = this.getState();
      } else {
        this.state = { STATE_KEY };
      }
    }
  }

  // Sets a key/value pair to the storage provider, primarily used later in the composed functions
  //
  // @param key | string
  // @param value | string
  setStateItem(key = '', value = '') {
    const storeObj = { [key]: value };
    const newStateObj = { ...this.getState(), ...storeObj };
    this.setState(newStateObj);
  }

  // Gets the entire state object
  //
  // @return object
  getState() {
    return this.checkStateExists() ? JSON.parse(this.getItem(STATE_KEY)) : {};
  }

  // Gets an item from the storage provider, primarily used later in the composed functions
  //
  // @param key | string
  // @return string
  getItem(key = '') {
    return this.storage.getItem(STATE_KEY);
  }

  // G
  // Gets an item from the storage provider, primarily used later in the composed functions
  //
  // @param key | string
  // @return string
  getStateItem(key = '') {
    return this.checkItem(key) ? this.getState()[key] : {};
    // this.storage.getItem(key);
  }

  // Sets a new state object state
  //
  // @param value | string
  setState(value = {}) {
    this.storage.setItem(STATE_KEY, JSON.stringify(value));
  }


  // Checks if the state exists in the storage provider
  checkStateExists() {
    return Boolean(this.getItem(STATE_KEY));
  }

  // Gets the state from the storage provider
  //
  // @return string
  getStateAsString() {
    return this.getItem(STATE_KEY);
  }

  // Check if an item has been saved to the store
  // unused as of 0a3106e
  //
  // @param item - string
  // @return boolean
  isStateItemExist(item) {
    if (this.checkStateExists()) {
      const stateStr = this.getStateAsString();
      if (stateStr.indexOf(item) > 0) {
        return true;
      }
    }
    return false;
  }

  //
  // @param item - string
  // @return boolean
  checkItem(item) {
    return this.checkStateExists() && this.getStateAsString().indexOf(item) > 0;
  }

  // Check if localStorage available.
  // Taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  //
  // @return boolean
  static storageAvailable() {
    const type = 'localStorage';
    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }
}
