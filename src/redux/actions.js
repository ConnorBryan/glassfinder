import { push } from "react-router-redux";

import { getUserData } from "../util";
import { signinSuccess, setToken } from "../slices/account/redux/actions";
import services from "../services";

// Actions
export const DISPLAY_WARNING = "DISPLAY_WARNING";
export const HIDE_WARNING = "HIDE_WARNING";
export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const SHOW_SIDEBAR = "SHOW_SIDEBAR";
export const HIDE_SIDEBAR = "HIDE_SIDEBAR";
export const SET_CHECKED_FOR_USER_DATA = "SET_CHECKED_FOR_USER_DATA";

// Action Creators
export const displayWarning = (header, content) => ({
  type: DISPLAY_WARNING,
  payload: { header, content }
});
export const hideWarning = () => ({ type: HIDE_WARNING });

export const startLoading = () => ({ type: START_LOADING });
export const stopLoading = () => ({ type: STOP_LOADING });

export const showSidebar = () => ({ type: SHOW_SIDEBAR });
export const hideSidebar = () => ({ type: HIDE_SIDEBAR });

export const setCheckedForUserData = () => ({
  type: SET_CHECKED_FOR_USER_DATA
});

// Action Handlers
export const checkForUserData = () => dispatch => {
  dispatch(setCheckedForUserData());

  const userData = getUserData();

  if (!userData) return;

  const { account, token } = userData;

  dispatch(signinSuccess(account));
  dispatch(setToken(token));
};

export const sendContactMessage = (name, email, message) => async dispatch => {
  try {
    dispatch(startLoading());

    await services.sendContactMessage(name, email, message);

    // Display success;
    dispatch(push("/"));
  } catch (e) {
    dispatch(
      displayWarning({
        header: "Unable to send contact message",
        content: e.toString()
      })
    );
  } finally {
    dispatch(stopLoading());
  }
};
