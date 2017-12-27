import { createReducer } from "../../../redux/reducers";
import {
  FETCH_SHOPS_SUCCESS,
  FETCH_SHOPS_FAILURE,
  SET_FETCH_SHOPS_PAGE,
  SET_SHOPS_FETCHING,
  FETCH_SHOP_SUCCESS,
  FETCH_SHOP_FAILURE
} from "./actions";

export const shops = createReducer(
  {
    fetching: false,
    page: 0,
    shops: [],
    shop: null
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
    }),
    [SET_SHOPS_FETCHING]: (state, { payload: { fetching } }) => ({
      ...state,
      fetching
    }),
    [FETCH_SHOP_SUCCESS]: (state, { payload: { shop } }) => ({
      ...state,
      fetching: false,
      shop
    }),
    [FETCH_SHOP_FAILURE]: state => ({
      ...state,
      fetching: false,
      shop: null
    })
  }
);
