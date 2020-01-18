import { Store } from './store';

const store = new Store({});
const datapi = 'https://script.google.com/macros/s/AKfycbxRP9PVCSJ7Yo4_XYtqkzuSpHf0cOAn1noFKjdqnffBfS2ZEzw/exec';

export class RecordStudyData {
  constructor() {
    this.foo = {};
  }

  setEvent(action = '', category = '', label = '', value = 0) {
    // get varriables for
    this.uuid = store.getStateItem('uuid').toString();
    this.date = new Date().toISOString();
    this.data = label;
    this.category = category;

    // study to JSON
    const jsondata = {
      uuid: this.uuid,
      category: this.category,
      data: this.data,
      date: this.date
    };

    const dataAPIURL = new URL(datapi);
    dataAPIURL.search = new URLSearchParams(jsondata);
    fetch(dataAPIURL);
  }
}
