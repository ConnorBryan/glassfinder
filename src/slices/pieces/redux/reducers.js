import { createReducer } from "../../../redux/reducers";
import {
  SET_PIECES_FETCHING,
  FETCH_PIECES_SUCCESS,
  FETCH_PIECES_FAILURE,
  FETCH_PIECE_SUCCESS,
  FETCH_PIECE_FAILURE,
  SET_PIECES_PAGE,
  SET_PIECES_TOTAL_PAGES
} from "./actions";

export const pieces = createReducer(
  {
    fetching: false,
    page: 0,
    totalPages: 0,
    pieces: [],
    piece: null
  },
  {
    [FETCH_PIECES_SUCCESS]: (state, { payload: { pieces } }) => ({
      ...state,
      fetching: false,
      pieces
    }),
    [FETCH_PIECES_FAILURE]: state => ({
      ...state,
      fetching: false,
      pieces: []
    }),
    [SET_PIECES_PAGE]: (state, { payload: { page } }) => ({
      ...state,
      page
    }),
    [SET_PIECES_FETCHING]: (state, { payload: { fetching } }) => ({
      ...state,
      fetching
    }),
    [FETCH_PIECE_SUCCESS]: (state, { payload: { piece } }) => ({
      ...state,
      fetching: false,
      piece
    }),
    [FETCH_PIECE_FAILURE]: state => ({
      ...state,
      fetching: false,
      piece: null
    }),
    [SET_PIECES_TOTAL_PAGES]: (state, { payload: { totalPages } }) => ({
      ...state,
      totalPages
    })
  }
);
