import { createReducer } from "../../../redux/reducers";
import {
  SET_BRANDS_FETCHING,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  SET_BRANDS_PAGE,
  SET_BRANDS_TOTAL_PAGES
} from "./actions";

export const brands = createReducer(
  {
    fetching: false,
    page: 0,
    totalPages: 0,
    brands: [],
    brand: null
  },
  {
    [FETCH_BRANDS_SUCCESS]: (state, { payload: { brands } }) => ({
      ...state,
      fetching: false,
      brands
    }),
    [FETCH_BRANDS_FAILURE]: state => ({
      ...state,
      fetching: false,
      brands: []
    }),
    [SET_BRANDS_PAGE]: (state, { payload: { page } }) => ({
      ...state,
      page
    }),
    [SET_BRANDS_TOTAL_PAGES]: (state, { payload: { totalPages } }) => ({
      ...state,
      totalPages
    }),
    [SET_BRANDS_FETCHING]: (state, { payload: { fetching } }) => ({
      ...state,
      fetching
    })
  }
);
