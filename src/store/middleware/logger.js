// SNA: logger = store => next => action
let lastId = 0;
const logger = (param) => (store) => (next) => (action) => {
  console.log(`${++lastId}:`, { type: action.type, payload: action.payload });
  //console.log("Logging", param);
  return next(action);
};

export default logger;
