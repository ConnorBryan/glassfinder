import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import * as accountReducers from "../slices/account/redux/reducers";
import * as mainReducers from "./reducers";

const reducer = combineReducers(accountReducers, mainReducers);

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
