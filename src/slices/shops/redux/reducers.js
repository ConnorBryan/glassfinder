import { createReducer } from "../../../redux/reducers";
import {
  FETCH_SHOPS_SUCCESS,
  FETCH_SHOPS_FAILURE,
  SET_FETCH_SHOPS_PAGE
} from "./actions";

export const shops = createReducer(
  {
    fetching: false,
    page: 0,
    shops: []
  },
  {
    [FETCH_SHOPS_SUCCESS]: (state, { payload: { shops } }) => ({
      ...state,
      fetching: false,
      shops
    }),
    [FETCH_SHOPS_FAILURE]: state => ({
      ...state,
      fetching: false,
      shops: []
    }),
    [SET_FETCH_SHOPS_PAGE]: (state, { payload: { page } }) => ({
      ...state,
      page
    })
  }
);
