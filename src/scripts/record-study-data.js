import { Store } from './store';

const store = new Store({});
const datapi = 'https://script.google.com/macros/s/AKfycbxRP9PVCSJ7Yo4_XYtqkzuSpHf0cOAn1noFKjdqnffBfS2ZEzw/exec';

export class RecordStudyData {
  constructor() {
    this.foo = {};
  }

  setEvent(action = '', category = '', label = '', value = 0) {
    const uuid = store.getStateItem('uuid').toString();
    const date = new Date().toISOString();
    const data = label;
    const fooObj = this.foo;
    
    // study to JSON
    const jsondata = {
      uuid,
      category,
      data,
      date,
      fooObj
    };

    const dataAPIURL = new URL(datapi);
    dataAPIURL.search = new URLSearchParams(jsondata);
    fetch(dataAPIURL);
  }
}
