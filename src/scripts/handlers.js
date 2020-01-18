import { RecordStudyData } from './record-study-data';
import { Store } from './store';
import { Utility } from './utility';

const recordStudyData = new RecordStudyData();
const store = new Store({});
const utility = new Utility();

export class Handlers {
  constructor() {
    this.displayNoneClass = 'd-none';

    // study aggreement
    this.studyAggreementElementsAdd = ['study-progress-map-'];
    this.studyAggreementElementsRemove = ['study-agreement-all'];

    // study questions map change
    this.studyQuestionElementsAdd = ['study-progress-sus'];
    this.studyQuestionElementsRemove = ['study-progress-map-0', 'study-progress-map-1', 'study-progress-map-2', 'map-action-holder'];

    // SUS scores
    this.studySUSElementsAdd = ['study-progress-end'];
    this.studySUSElementsRemove = ['study-progress-sus'];
  }

  // adds handler for submitting change data on map
  //
  // @param elementID - HTML element ID
  // @return null
  addHandlerSubmitChangeClick(elementID) {
    const element = document.getElementById(elementID);

    // ensure element exsists
    if (element) {
      element.addEventListener('click', () => {
        // add elements to UI
        this.studyQuestionElementsAdd.forEach( elementUIID => {
          document.getElementById(elementUIID).classList.remove(this.displayNoneClass);
        });

        //  remove elements from UI
        this.studyQuestionElementsRemove.forEach( elementUIID => {
          // only add display none class if the class does not exsist
          // ensure that duplicate classes are not added
          if (!document.getElementById(elementUIID).classList.contains(this.displayNoneClass)) {
            document.getElementById(elementUIID).classList.add(this.displayNoneClass);
          }
        });
      });
    }
  }

  // adds handler for submitting sus score
  //
  // @param elementID - HTML element ID
  // @return null
  addHandlerSubmitSUSClick(elementID) {
    const element = document.getElementById(elementID);
    // ensure element exsists
    if (element) {
      element.addEventListener('click', () => {
        // add elements to UI
        this.studySUSElementsAdd.forEach( elementUIID => {
          document.getElementById(elementUIID).classList.remove(this.displayNoneClass);
        });

        //  remove elements from UI
        this.studySUSElementsRemove.forEach( elementUIID => {
          // only add display none class if the class does not exsist
          // ensure that duplicate classes are not added
          if (!document.getElementById(elementUIID).classList.contains(this.displayNoneClass)) {
            document.getElementById(elementUIID).classList.add(this.displayNoneClass);
          }
        });
      });
    }
    return null
  }

  // adds handler for aggreeing to do study
  //
  // @param null
  // @return null
  addHandlerAgreeClick(elementID) {
    const element = document.getElementById(elementID);
    // ensure element exsists
    if (element) {
      element.addEventListener('click', () => {
        const studyVersion = store.getStateItem('study-question');
        const agreementTimeStamp = new Date().toISOString();

        // add elements to UI
        this.studyAggreementElementsAdd.forEach( elementUIID => {
          document.getElementById(`${elementUIID}${studyVersion}`).classList.remove(this.displayNoneClass);
        });

        //  remove elements from UI
        this.studyAggreementElementsRemove.forEach( elementUIID => {
          // only add display none class if the class does not exsist
          // ensure that duplicate classes are not added
          if (!document.getElementById(elementUIID).classList.contains(this.displayNoneClass)) {
            document.getElementById(elementUIID).classList.add(this.displayNoneClass);
          }
        });

        utility.triggerEvent('aggree-clicked', 'handleAgreeClick')
        store.setStateItem('study-agreement', true);
        store.setStateItem('study-agreement-date', agreementTimeStamp);
        recordStudyData.setEvent('data', 'study-agreement', true);
      });
    }
    return null;
  }

}
