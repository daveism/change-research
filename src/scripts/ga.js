import { Store } from './store';

const store = new Store({});
const datapi = 'https://script.google.com/macros/s/AKfycbxRP9PVCSJ7Yo4_XYtqkzuSpHf0cOAn1noFKjdqnffBfS2ZEzw/exec';

export class GoogleAnalytics {
  constructor() {
    this.foo = {};
  }

  setEvent(action = '', category = '', label = '', value = 0) {
    const uuid = store.getStateItem('uuid').toString();
    const date = new Date().toISOString();
    const data = label;

    const fooObj = this.foo; // eslint-disable-line
    gtag('event', uuid, {  // eslint-disable-line
      event_category: category,
      event_label: label,
      value: `${value}`,
      uuid
    });

    // since FF could be blocking ga writing data here as backup
    const jsondata = {
      uuid,
      category,
      data,
      date
    };

    const dataAPIURL = new URL(datapi);
    dataAPIURL.search = new URLSearchParams(jsondata);
    fetch(dataAPIURL);
  }
}
