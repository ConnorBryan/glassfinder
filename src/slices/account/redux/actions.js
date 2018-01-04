import { push } from "react-router-redux";
import axios from "axios";

import config from "../../../config";
import {
  setUserData,
  clearUserData,
  requestWith,
  redirectHome
} from "../../../util";
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
export const SET_LINK = "SET_LINK";

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
export const setLink = link => ({ type: SET_LINK, payload: { link } });

// Action Handlers
export const attemptSignup = (email, password) => async dispatch => {
  try {
    dispatch(startLoading());

    const {
      data: { success, error, id }
    } = await axios.post(`${config.api}/signup`, {
      email,
      password
    });

    dispatch(stopLoading());

    success
      ? dispatch(push(`/verify/${id}`))
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
    } = await axios.post(`${config.api}/signin`, {
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
) =>
  requestWith(dispatch, "Unable to update password", async () => {
    const { account } = getState();

    if (!account) return redirectHome(dispatch);

    const { id } = account;

    await services.updatePassword(id, currentPassword, newPassword);

    // Display success.
    dispatch(push("/my-account"));
  });

const attemptLinkAs = (linkAsService, values) => async (dispatch, getState) =>
  requestWith(dispatch, "Unable to link", async () => {
    const { account } = getState();

    if (!account) return redirectHome(dispatch);

    const { id } = account;
    const updatedAccount = await linkAsService(id, values);

    // Display success;
    dispatch(signinSuccess(updatedAccount));
    dispatch(setLink(updatedAccount.link));
    dispatch(push("/my-account"));
  });

export const attemptLinkAsShop = values => dispatch =>
  dispatch(attemptLinkAs(services.linkAsShop, values));
export const attemptLinkAsArtist = values => dispatch =>
  dispatch(attemptLinkAs(services.linkAsArtist, values));
export const attemptLinkAsBrand = values => dispatch =>
  dispatch(attemptLinkAs(services.linkAsBrand, values));

export const attemptUpdateInfo = values => async (dispatch, getState) =>
  requestWith(dispatch, "Unable to update info", async () => {
    const { account } = getState();

    if (!account) return redirectHome(dispatch);

    const { id } = account;
    const link = await services.updateInfo(id, values);

    // Display success.
    dispatch(setLink(link));
    dispatch(push("/my-account"));

    const { account: updatedAccount, token } = getState();

    setUserData(updatedAccount, token);
  });

export const attemptUploadImage = image => async (dispatch, getState) =>
  requestWith(dispatch, "Unable to upload image", async () => {
    const { account } = getState();

    if (!account) return redirectHome(dispatch);

    const { id } = account;
    const link = await services.uploadImage(id, image);

    // Display success;
    dispatch(setLink(link));
    dispatch(push("/my-account"));

    const { account: updatedAccount, token } = getState();

    setUserData(updatedAccount, token);
  });

export const attemptUploadPiece = (
  name,
  maker,
  price,
  description,
  location
) => async (dispatch, getState) =>
  requestWith(dispatch, "Unable to upload piece", async () => {
    const { account } = getState();

    if (!account) return redirectHome(dispatch);

    const { id } = account;

    await services.uploadPiece(id, name, maker, price, description, location);

    // Display success.
    dispatch(push("/my-account"));
  });
