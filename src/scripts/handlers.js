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
    this.studyAggreementElementsRemove = ['block-study-aggreement-holder'];

    // study disaggreement
    this.studyDisaggreementElementsAdd = ['study-dissaggree'];
    this.studyDisaggreementElementsRemove = ['block-study-aggreement-holder'];

    // study questions map change
    this.studyQuestionElementsAdd = ['study-progress-sus', 'block-study-sus-holder'];
    this.studyQuestion = store.getStateItem('study-question');
    this.studyQuestionElementsRemove = [`study-progress-map-${this.studyQuestion}`, 'map-action-holder'];

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
        history.pushState({ page: 2 }, '#sus-questions', '#sus-questions'); // eslint-disable-line
      });
    }
  }

  // completed-play
  // adds handler for playing animation
  //
  // @param page - string page to play completed, map
  // @return null
  addHandlerPlayClick(page = 'completed', elementID) {
    const element = document.getElementById(elementID);
    // ensure element exsists
    if (element) {
      element.addEventListener('click', (e) => {
        store.setStateItem(`map-${page}-animation`, true);
        store.setStateItem(`map-${page}-animation-stop`, true);
        this.animate = true;
        utility.unsetPlayButtons(page, true);
        element.classList.add('selected');
      });
    }
  }


  // completed-play
  // adds handler for playing animation
  //
  // @param page - string page to play completed, map
  // @return null
  addHandlerLayersOffClick(page = 'completed', elementID) {
    const element = document.getElementById(elementID);
    // ensure element exsists
    if (element) {
      element.addEventListener('click', (e) => {
        store.setStateItem(`map-${page}-animation-stop`, false);
        this.animate = true;
        utility.unsetPlayButtons(page);
        element.classList.add('selected');
      });
    }
  }

  // completed-play
  // adds handler for pausing animation
  //
  // @param page - string page to play completed, map
  // @return null
  addHandlerPauseClick(page = 'completed', elementID) {
    const element = document.getElementById(elementID);
    // ensure element exsists
    if (element) {
      element.addEventListener('click', (e) => {
        utility.unsetPlayButtons(page);
        const isPaused = store.getStateItem(`map-${page}-animation`);
        if (isPaused) {
          store.setStateItem(`map-${page}-animation`, false);
          element.classList.add('selected');
        } else {
          store.setStateItem(`map-${page}-animation`, true);
          element.classList.remove('selected');
        }
        this.animate = false;
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

        const susValueArray = [];
        this.susStorageKeys.forEach((key) => {
          const questionAnswer = store.getStateItem(key);
          susValueArray.push({ key, questionAnswer });
        });
        const datestamp = new Date().toISOString();
        utility.triggerEvent('sus-clicked', 'sus-clicked');

        store.setStateItem('susanswers-submited', true);
        store.setStateItem('susanswers', susValueArray);
        store.setStateItem('susanswers-time', datestamp);
        store.setStateItem('study-completed', true);
        Handlers.recordAggreed();
        history.pushState({ page: 3 }, '#study-completed', '#study-completed'); // eslint-disable-line

        // temp get rid of state items
        // REMOVE FOR RELEASE
        const storage = window['localStorage']; // eslint-disable-line
        storage.removeItem('state');
      });
    }

    return null;
  }

  static recordDisaggreed() {
    const uuidRec = store.getStateItem('uuid');
    const studyStartedRec = store.getStateItem('study started');
    const studyStartedTimeRec = store.getStateItem('study started time');
    const studyAgreementRec = store.getStateItem('study-agreement');
    const studyAgreementTimeRec = store.getStateItem('study-agreement-time');
    const campaignRec = store.getStateItem('campaign');
    const mobileRec = store.getStateItem('mobile');
    const mapVersionRec = store.getStateItem('map-version');
    const studyQuestionRec = store.getStateItem('study-question');
    const susanswersSubmitedRec = store.getStateItem('susanswers-submited');
    const gridSubmitedRec = store.getStateItem('grid-submited');
    const susanswersRec = store.getStateItem('susanswers');
    const gridanswersRec = store.getStateItem('gridanswers');
    const gridcorrectRec = store.getStateItem('squareGridGeoJSON');
    const studyCompletedRec = store.getStateItem('study-completed');
    const innerWidth = window.innerWidth; // eslint-disable-line
    const innerHeight = window.innerHeight; // eslint-disable-line
    const availWidth = window.screen.availWidth; // eslint-disable-line
    const availHeight = window.screen.availHeight; // eslint-disable-line
    const screenSizeRec = {
      innerWidth,
      innerHeight,
      availWidth,
      availHeight
    };

    const gridcorrectRecProps = [];

    gridcorrectRec.features.forEach((val) => {
      gridcorrectRecProps.push({
        key: `grid-box-${val.properties.id}`,
        value: val.properties.v
      });
    });

    const jsonData = {
      uuid: uuidRec,
      study_started: studyStartedRec,
      study_started_time: studyStartedTimeRec,
      study_agreement: studyAgreementRec,
      susanswers_submited: susanswersSubmitedRec,
      grid_submited: gridSubmitedRec,
      study_agreement_time: studyAgreementTimeRec,
      campaign: JSON.stringify(campaignRec),
      mobile: JSON.stringify(mobileRec),
      map_version: mapVersionRec,
      grid_correct: JSON.stringify(gridcorrectRecProps),
      grid_answers: JSON.stringify(gridanswersRec),
      gridanswers_time: '',
      study_question: studyQuestionRec,
      sus_answers: JSON.stringify(susanswersRec),
      susanswers_time: '',
      study_completed: studyCompletedRec,
      screen_size: JSON.stringify(screenSizeRec)
    };

    recordStudyData.setEventAll(jsonData);
  }

  static recordAggreed() {
    const uuidRec = store.getStateItem('uuid');
    const studyStartedRec = store.getStateItem('study started');
    const studyStartedTimeRec = store.getStateItem('study started time');
    const studyAgreementRec = store.getStateItem('study-agreement');
    const studyAgreementTimeRec = store.getStateItem('study-agreement-time');
    const campaignRec = store.getStateItem('campaign');
    const mobileRec = store.getStateItem('mobile');
    const mapVersionRec = store.getStateItem('map-version');
    const studyQuestionRec = store.getStateItem('study-question');
    const susanswersSubmitedRec = store.getStateItem('susanswers-submited');
    const gridSubmitedRec = store.getStateItem('grid-submited');
    const susanswersRec = store.getStateItem('susanswers');
    const susanswersDateRec = store.getStateItem('susanswers-time');
    const gridanswersRec = store.getStateItem('gridanswers');
    const gridanswersDateRec = store.getStateItem('gridanswers-time');
    const gridcorrectRec = store.getStateItem('squareGridGeoJSON');
    const studyCompletedRec = store.getStateItem('study-completed');
    const innerWidth = window.innerWidth; // eslint-disable-line
    const innerHeight = window.innerHeight; // eslint-disable-line
    const availWidth = window.screen.availWidth; // eslint-disable-line
    const availHeight = window.screen.availHeight; // eslint-disable-line
    const screenSizeRec = {
      innerWidth,
      innerHeight,
      availWidth,
      availHeight
    };

    const gridcorrectRecProps = [];

    gridcorrectRec.features.forEach((val) => {
      gridcorrectRecProps.push({
        key: `grid-box-${val.properties.id}`,
        value: val.properties.v
      });
    });

    const jsonData = {
      uuid: uuidRec,
      study_started: studyStartedRec,
      study_started_time: studyStartedTimeRec,
      study_agreement: studyAgreementRec,
      susanswers_submited: susanswersSubmitedRec,
      grid_submited: gridSubmitedRec,
      study_agreement_time: studyAgreementTimeRec,
      campaign: JSON.stringify(campaignRec),
      mobile: JSON.stringify(mobileRec),
      map_version: mapVersionRec,
      // grid_correct: JSON.stringify(gridcorrectRecProps),
      grid_answers: JSON.stringify(gridanswersRec),
      gridanswers_time: gridanswersDateRec,
      study_question: studyQuestionRec,
      sus_answers: JSON.stringify(susanswersRec),
      susanswers_time: susanswersDateRec,
      study_completed: studyCompletedRec,
      screen_size: JSON.stringify(screenSizeRec)
    };

    recordStudyData.setEventAll(jsonData);
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
        store.setStateItem('study-agreement-time', agreementTimeStamp);
        history.pushState({ page: 1 }, '#map', '#map'); // eslint-disable-line
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
        store.setStateItem('study-agreement-time', agreementTimeStamp);
        Handlers.recordDisaggreed();
        history.pushState({ page: 1 }, '#disaggree', '#disaggree'); // eslint-disable-line
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
