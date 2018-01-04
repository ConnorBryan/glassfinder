import { createReducer } from "../../../redux/reducers";
import {
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT,
  SET_TOKEN,
  SET_LINK,
  SET_MY_PIECES
} from "./actions";

export const account = createReducer(null, {
  [SIGNIN_SUCCESS]: (state, { payload: { account } }) => account,
  [SIGNIN_FAILURE]: () => null,
  [SIGNOUT]: () => null,
  [SET_LINK]: (state, { payload: { link } }) => ({ ...state, link }),
  [SET_MY_PIECES]: (state, { payload: { pieces } }) => ({
    ...state,
    pieces
  })
});

export const token = createReducer(null, {
  [SET_TOKEN]: (state, { payload: { token } }) => token
});
