import { push } from "react-router-redux";
import axios from "axios";

import config from "../../../config";
import { setUserData, clearUserData } from "../../../util";
import {
  displayWarning,
  startLoading,
  stopLoading
} from "../../../redux/actions";
import services from "../services";

// Actions
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const SIGNOUT = "SIGNOUT";
export const SET_TOKEN = "SET_TOKEN";

// Action Creators
export const signupSuccess = () => ({ type: SIGNUP_SUCCESS });
export const signupFailure = () => ({ type: SIGNUP_FAILURE });
export const signinSuccess = account => ({
  type: SIGNIN_SUCCESS,
  payload: { account }
});
export const signinFailure = () => ({ type: SIGNIN_FAILURE });
export const signout = () => ({ type: SIGNOUT });
export const setToken = token => ({ type: SET_TOKEN, payload: { token } });
export const clearToken = () => setToken(null);

// Action Handlers
export const attemptSignup = (email, password) => async dispatch => {
  try {
    dispatch(startLoading());

    const {
      data: { success, error }
    } = await axios.post(`${config.localApi}/signup`, {
      email,
      password
    });

    dispatch(stopLoading());

    success
      ? dispatch(push("/"))
      : dispatch(
          displayWarning({
            header: "Unable to sign up",
            content: error
          })
        );
  } catch (e) {
    dispatch(stopLoading());

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
    dispatch(startLoading());

    const {
      data: { success, error, token, data: account }
    } = await axios.post(`${config.localApi}/signin`, {
      email,
      password
    });

    dispatch(stopLoading());

    if (success) {
      dispatch(signinSuccess(account));
      dispatch(setToken(token));
      dispatch(push("/my-account"));

      setUserData(account, token);
    } else {
      dispatch(signinFailure());
      dispatch(
        displayWarning({
          header: "Unable to sign in",
          content: error
        })
      );
      dispatch(push("/"));
    }
  } catch (e) {
    dispatch(stopLoading());
    dispatch(signinFailure());
    dispatch(push("/"));
  }
};

export const attemptSignout = () => dispatch => {
  clearUserData();

  dispatch(signout());
  dispatch(clearToken());
  dispatch(push("/"));
};

export const attemptUpdatePassword = (currentPassword, newPassword) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startLoading());

    const { account } = getState();

    if (!account) {
      dispatch(stopLoading());
      return dispatch(push("/"));
    }

    const { id } = account;

    await services.updatePassword(id, currentPassword, newPassword);

    // Display success.
    dispatch(push("/my-account"));
  } catch (e) {
    dispatch(
      displayWarning({
        header: "Unable to update password",
        content: e.toString()
      })
    );
  } finally {
    dispatch(stopLoading());
  }
};

const attemptLinkAs = (values, linkAsService) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());

    const { account } = getState();

    if (!account) {
      dispatch(stopLoading());
      return dispatch(push("/"));
    }

    const { id } = account;

    await linkAsService(id, values);

    // Display success;
    dispatch(attemptSignout());
  } catch (e) {
    dispatch(
      displayWarning({
        header: "Unable to link account",
        content: e.toString()
      })
    );
  } finally {
    dispatch(stopLoading());
  }
};

export const attemptLinkAsShop = values => dispatch =>
  dispatch(attemptLinkAs(values, services.linkAsShop));
export const attemptLinkAsArtist = values => dispatch =>
  dispatch(attemptLinkAs(values, services.linkAsArtist));
export const attemptLinkAsBrand = values => dispatch =>
  dispatch(attemptLinkAs(values, services.linkAsBrand));
