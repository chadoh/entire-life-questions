import { loadState, saveState } from './localStorage';
import equals from 'ramda/es/equals';

const SAVE_SUCCESS = 'DatabaseSaveSuccessEvent';
const SAVE_FAIL = 'DatabaseSaveFailEvent';

const EVENT_TYPES = {
  update: SAVE_SUCCESS,
  failure: SAVE_FAIL,
}

const isValidType = eventType => {
  if (EVENT_TYPES[eventType]) return true;

  console.error(
    new Error(`Tried to add a listener for event type '${eventType}' -
      only supported types are: ${Object.keys(EVENT_TYPES).join(', ')}`)
  )
  return false;
}

class Database {

  constructor(name, initialState) {
    this.id = name;
    this.initialState = initialState;
  }

  getData = () => {
    return loadState(this.id) || this.initialState;
  }

  setData = newData => {
    const currentData = this.getData();
    const updatedData = {
      ...currentData,
      ...newData,
    };

    if (equals(updatedData, currentData)) return;

    try {
      saveState(this.id, updatedData);
      window.dispatchEvent(new CustomEvent(SAVE_SUCCESS));
    } catch (err) {
      console.error(new Error(err));
      window.dispatchEvent(new CustomEvent(SAVE_FAIL));
    }
  }

  on(eventType, func) {
    if (!isValidType(eventType)) return;
    window.addEventListener(EVENT_TYPES[eventType], func, false);
  }

  off(eventType, func) {
    if (!isValidType(eventType)) return;
    window.removeEventListener(EVENT_TYPES[eventType], func, false);
  }

}

export default (name, initialState) => new Database(name, initialState);
