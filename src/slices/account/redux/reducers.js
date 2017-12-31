import { createReducer } from "../../../redux/reducers";
import {
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT,
  SET_TOKEN,
  SET_LINK
} from "./actions";

export const account = createReducer(null, {
  [SIGNIN_SUCCESS]: (state, { payload: { account } }) => account,
  [SIGNIN_FAILURE]: () => null,
  [SIGNOUT]: () => null,
  [SET_LINK]: (state, { payload: { link } }) => ({ ...state, link })
});

export const token = createReducer(null, {
  [SET_TOKEN]: (state, { payload: { token } }) => token
});
