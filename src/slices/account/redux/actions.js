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
export const SET_MY_PIECES = "SET_MY_PIECES";

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
export const setMyPieces = pieces => ({
  type: SET_MY_PIECES,
  payload: { pieces }
});

// Action Handlers
export const attemptSignup = (email, password) => dispatch =>
  requestWith(dispatch, "Unable to sign up", async () => {
    try {
      const id = await services.signup(email, password);

      // Display success.
      dispatch(signupSuccess());
      dispatch(push(`/verify/${id}`));
    } catch (e) {
      dispatch(signupFailure());
      throw e;
    }
  });

export const attemptSignin = (email, password) => dispatch =>
  requestWith(dispatch, "Unable to sign in", async () => {
    try {
      const { account, token } = await services.signin(email, password);

      setUserData(account, token);

      // Display success.
      dispatch(signinSuccess(account));
      dispatch(setToken(token));
      dispatch(push("/my-account"));
    } catch (e) {
      dispatch(signinFailure());
      throw e;
    }
  });

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

export const attemptUpdateInfo = values => (dispatch, getState) =>
  utilizeUpdateService(dispatch, getState, "Unable to update information")(
    services.updateInfo,
    values
  );

export const attemptUploadImage = image => (dispatch, getState) =>
  utilizeUpdateService(dispatch, getState, "Unable to upload image")(
    services.uploadImage,
    image
  );

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

export const fetchMyPieces = (page = 0) => async (dispatch, getState) =>
  requestWith(dispatch, "Unable to fetch pieces", async () => {
    const { account } = getState();

    if (!account) return redirectHome(dispatch);

    const { id } = account;

    const { pieces } = await services.fetchMyPieces(id, page);

    // Display success;
    dispatch(setMyPieces(pieces));
  });

/* === */

export function utilizeUpdateService(dispatch, getState, errorHeader) {
  return async (service, ...args) =>
    requestWith(dispatch, errorHeader, async () => {
      const { account, token } = getState();

      if (!account) return redirectHome(dispatch);

      const { id } = account;
      const link = await service(id, ...args);
      const updatedAccount = { ...account, link };

      setUserData(updatedAccount, token);

      // Display success.
      dispatch(setLink(link));
      dispatch(push("/my-account"));
    });
}
