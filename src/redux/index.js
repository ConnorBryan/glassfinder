import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import * as accountReducers from "../slices/account/redux/reducers";
import * as shopsReducers from "../slices/shops/redux/reducers";
import * as piecesReducers from "../slices/pieces/redux/reducers";
import * as mainReducers from "./reducers";

export default combineReducers({
  ...accountReducers,
  ...shopsReducers,
  ...piecesReducers,
  ...mainReducers,
  router: routerReducer
});
