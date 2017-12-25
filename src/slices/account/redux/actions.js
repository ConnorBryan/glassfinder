import { push } from "react-router-redux";
import axios from "axios";

import { displayWarning } from "../../../redux/actions";

// Actions
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const SIGNOUT = "SIGNOUT";

// Action Creators
export const signupSuccess = () => ({ type: SIGNUP_SUCCESS });
export const signupFailure = () => ({ type: SIGNUP_FAILURE });
export const signinSuccess = account => ({
  type: SIGNIN_SUCCESS,
  payload: { account }
});
export const signinFailure = () => ({ type: SIGNIN_FAILURE });
export const signout = () => ({ type: SIGNOUT });

// Action Handlers
export const attemptSignup = (email, password) => async dispatch => {
  try {
    const {
      data: { success, error }
    } = await axios.post("http://localhost:6166/signup", {
      email,
      password
    });

    success
      ? dispatch(push("/"))
      : dispatch(
          displayWarning({
            header: "Unable to sign up",
            content: error
          })
        );
  } catch (e) {
    dispatch(
      displayWarning({
        header: "Unable to sign up",
        content: "There was an issue communicating with the server."
      })
    );
  }
};

export const attemptSignin = (email, password) => async dispatch => {
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
