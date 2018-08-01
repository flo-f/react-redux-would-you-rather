const DEBUG = false;

const logger = (store) => (next) => (action) => {
  if (DEBUG) {
    console.group(action.type);
    console.log('The action', action);
  }
  const result = next(action);
  if (DEBUG) {
    console.log('The new state', store.getState());
    console.groupEnd();
  }
  return result;
}

export default logger;
