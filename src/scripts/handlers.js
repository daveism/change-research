import { RecordStudyData } from './record-study-data';
import { Store } from './store';
import { Utility } from './utility';

const recordStudyData = new RecordStudyData();
const store = new Store({});
const utility = new Utility();

export class Handlers {
  constructor() {
    this.displayNoneClass = 'd-none';
    this.selectedClass = 'selected';

    // study aggreement
    this.studyAggreementElementsAdd = ['study-progress-map-'];
    this.studyAggreementElementsRemove = ['study-agreement-all'];

    // study disaggreement
    this.studyDisaggreementElementsAdd = ['study-dissaggree'];
    this.studyDisaggreementElementsRemove = ['study-agreement-all'];

    // study questions map change
    this.studyQuestionElementsAdd = ['study-progress-sus', 'block-study-sus-holder'];
    this.studyQuestionElementsRemove = ['study-progress-map-0', 'study-progress-map-1', 'study-progress-map-2', 'map-action-holder'];

    // SUS scores
    this.studySUSElementsAdd = ['study-progress-end', 'block-study-completed-holder'];
    this.studySUSElementsRemove = ['study-progress-sus', 'block-study-sus-holder'];
    this.susStorageKeys = ['sus-question-1',
      'sus-question-2',
      'sus-question-3',
      'sus-question-4',
      'sus-question-5',
      'sus-question-6',
      'sus-question-7',
      'sus-question-8',
      'sus-question-9',
      'sus-question-10'];
  }

  // adds handler for submitting change data on map
  //
  // @param elementID - HTML element ID
  // @return null
  addHandlerSubmitChangeClick(elementID) {
    const element = document.getElementById(elementID);

    // ensure element exsists
    if (element) {
      element.addEventListener('click', (e) => {
        // add elements to UI
        this.studyQuestionElementsAdd.forEach((elementUIID) => {
          document.getElementById(elementUIID).classList.remove(this.displayNoneClass);
        });

        //  remove elements from UI
        this.studyQuestionElementsRemove.forEach((elementUIID) => {
          // only add display none class if the class does not exsist
          // ensure that duplicate classes are not added
          if (!document.getElementById(elementUIID).classList.contains(this.displayNoneClass)) {
            document.getElementById(elementUIID).classList.add(this.displayNoneClass);
          }
        });

        const gridName = 'grid-box-';
        const gridIterations = 42;
        utility.setAPIForGroup(gridName, gridIterations);
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
      element.addEventListener('click', (e) => {
        // add elements to UI
        this.studySUSElementsAdd.forEach((elementUIID) => {
          document.getElementById(elementUIID).classList.remove(this.displayNoneClass);
        });

        //  remove elements from UI
        this.studySUSElementsRemove.forEach((elementUIID) => {
          // only add display none class if the class does not exsist
          // ensure that duplicate classes are not added
          if (!document.getElementById(elementUIID).classList.contains(this.displayNoneClass)) {
            document.getElementById(elementUIID).classList.add(this.displayNoneClass);
          }
        });

        this.susStorageKeys.forEach((key) => {
          const questionAnswer = store.getStateItem(key);
          recordStudyData.setEvent('data', key, questionAnswer);
        });
      });
    }

    return null;
  }

  // adds handler for aggreeing to do study
  //
  // @param null
  // @return null
  addHandlerAgreeClick(elementID) {
    const element = document.getElementById(elementID);
    // ensure element exsists
    if (element) {
      element.addEventListener('click', (e) => {
        const studyVersion = store.getStateItem('study-question');
        const agreementTimeStamp = new Date().toISOString();

        // add elements to UI
        this.studyAggreementElementsAdd.forEach((elementUIID) => {
          document.getElementById(`${elementUIID}${studyVersion}`).classList.remove(this.displayNoneClass);
        });

        //  remove elements from UI
        this.studyAggreementElementsRemove.forEach((elementUIID) => {
          // only add display none class if the class does not exsist
          // ensure that duplicate classes are not added
          if (!document.getElementById(elementUIID).classList.contains(this.displayNoneClass)) {
            document.getElementById(elementUIID).classList.add(this.displayNoneClass);
          }
        });

        utility.triggerEvent('aggree-clicked', 'handleAgreeClick');
        store.setStateItem('study-agreement', true);
        store.setStateItem('study-agreement-date', agreementTimeStamp);
        recordStudyData.setEvent('data', 'study-agreement', true);
      });
    }
    return null;
  }

  // adds handler for DISaggreeing to do study
  //
  // @param null
  // @return null
  addHandlerDisagreeClick(elementID) {
    const element = document.getElementById(elementID);
    // ensure element exsists
    if (element) {
      element.addEventListener('click', (e) => {
        const agreementTimeStamp = new Date().toISOString();
        // add elements to UI
        this.studyDisaggreementElementsAdd.forEach((elementUIID) => {
          document.getElementById(elementUIID).classList.remove(this.displayNoneClass);
        });

        //  remove elements from UI
        this.studyDisaggreementElementsRemove.forEach((elementUIID) => {
          // only add display none class if the class does not exsist
          // ensure that duplicate classes are not added
          if (!document.getElementById(elementUIID).classList.contains(this.displayNoneClass)) {
            document.getElementById(elementUIID).classList.add(this.displayNoneClass);
          }
        });

        utility.triggerEvent('disaggree-clicked', 'handleAgreeClick');
        store.setStateItem('study-agreement', false);
        store.setStateItem('study-agreement-date', agreementTimeStamp);
        recordStudyData.setEvent('data', 'study-agreement', false);
      });
    }
    return null;
  }

  // adds handler for individual sus score questions to local storage
  //
  // @param elementID - HTML element ID
  // @return null
  addHandlerSUSQuestionClick(elementID) {
    const element = document.getElementById(elementID);
    this.selectedClass = 'selected';

    // ensure element exsists
    if (element) {
      element.addEventListener('click', (e) => {
        // get parent element which is button group
        const parentBtnGroup = document.getElementById(e.target.id).parentElement;
        Handlers.toggleButtonGroupButttonsOff(parentBtnGroup, this.selectedClass);

        const questionText = parentBtnGroup.id.replace('btn-group-sus-', 'sus-question-');
        store.setStateItem(questionText, Number(e.target.innerText));

        // add sus question answer to selected to class
        if (!document.getElementById(e.target.id).classList.contains(this.selectedClass)) {
          document.getElementById(e.target.id).classList.add(this.selectedClass);
        }
      });
    }
    return null;
  }

  // removes the selected class "unslects" all the buttons
  //  in a button group
  //
  // @param btnGroup - HTML element
  // @return null
  static toggleButtonGroupButttonsOff(btnGroup, selectedClass) {
    const children = btnGroup.childNodes;
    // make sure children is valiud object
    if (!utility.checkValidObject(children)) { return false; }
    // make sure there are childeren buttons
    if (children.length > 0) {
      const childrenArray = [...children];
      childrenArray.forEach((childItem) => {
        if (childItem.classList) {
          childItem.classList.remove(selectedClass);
        }
      });
    }
    return null;
  }
}
