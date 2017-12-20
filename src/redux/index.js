import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import * as accountReducers from "../slices/account/redux/reducers";
import * as mainReducers from "./reducers";

export default combineReducers({
  ...accountReducers,
  ...mainReducers,
  router: routerReducer
});
