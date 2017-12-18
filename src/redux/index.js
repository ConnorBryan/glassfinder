import { combineReducers, createStore } from "redux";

import * as reducers from "./reducers";

const mainReducer = combineReducers(reducers);

export default createStore(mainReducer);
