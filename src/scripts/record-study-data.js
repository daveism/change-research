import { Store } from './store';

const store = new Store({});
const datapi = 'https://script.google.com/macros/s/AKfycbxRP9PVCSJ7Yo4_XYtqkzuSpHf0cOAn1noFKjdqnffBfS2ZEzw/exec';
const datapinorm = 'https://script.google.com/macros/s/AKfycbwHze750Th9IU7NtATeDl0BbelaDrSWoYr6yp_xkDhRU5KRwni3/exec';

export class RecordStudyData {
  constructor() {
    this.foo = {};
    this.datapi = datapi;
    this.datapinorm = datapinorm;
  }

  setEvent(category = '', value = 0) {
    // get varriables for
    this.uuid = store.getStateItem('uuid').toString();
    this.date = new Date().toISOString();
    this.data = value;
    this.category = category;

    // study to JSON
    const jsondata = {
      uuid: this.uuid,
      category: this.category,
      data: this.data,
      date: this.date
    };

    const dataAPIURL = new URL(this.datapinorm);
    dataAPIURL.search = new URLSearchParams(jsondata);
    fetch(dataAPIURL);
  }

  setEventAll(jsondata = {}) {
    const dataAPIURL = new URL(this.datapi);
    dataAPIURL.search = new URLSearchParams(jsondata);
    fetch(dataAPIURL);
  }
}
