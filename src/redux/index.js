import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import * as reducers from "./reducers";

const mainReducer = combineReducers(reducers);

export default createStore(mainReducer, applyMiddleware(thunk));
