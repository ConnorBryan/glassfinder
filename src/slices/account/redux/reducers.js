import { createReducer } from "../../../redux/reducers";
import { SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT } from "./actions";

export const account = createReducer(null, {
  [SIGNIN_SUCCESS]: (state, { payload: { account } }) => account,
  [SIGNIN_FAILURE]: () => null,
  [SIGNOUT]: () => null
});
