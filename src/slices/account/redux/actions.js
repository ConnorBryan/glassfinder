import { push } from "react-router-redux";

// Actions
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const SIGNOUT = "SIGNOUT";

// Action Creators
export const signinSuccess = account => ({
  type: SIGNIN_SUCCESS,
  payload: { account }
});
export const signinFailure = () => ({ type: SIGNIN_FAILURE });
export const signout = () => ({ type: SIGNOUT });

// Action Handlers
export const attemptSignin = (username, password) => async dispatch => {
  try {
    const account = {
      email: "cchromium@gmail.com",
      name: "Connor Bryan"
    };

    dispatch(signinSuccess(account));
    dispatch(push("/my-account"));
  } catch (e) {
    dispatch(signinFailure());
    dispatch(push("/"));
  }
};

export const attemptSignout = () => dispatch => {
  dispatch(signout());
  dispatch(push("/"));
};
