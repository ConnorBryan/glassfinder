import { getUserData } from "../util";
import { signinSuccess, setToken } from "../slices/account/redux/actions";

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
  const userData = getUserData();

  if (!userData) return setCheckedForUserData();

  const { account, token } = userData;

  dispatch(signinSuccess(account));
  dispatch(setToken(token));
};
