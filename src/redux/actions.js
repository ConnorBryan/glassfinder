import config from "../config";

// Actions
export const DISPLAY_WARNING = "DISPLAY_WARNING";
export const HIDE_WARNING = "HIDE_WARNING";

// Action Creators
export const displayWarning = (header, content) => ({
  type: DISPLAY_WARNING,
  payload: { header, content }
});
export const hideWarning = () => ({ type: HIDE_WARNING });

// Action Handlers
let timeoutMutex = false;
export const flashWarning = (header, content) => (dispatch, getState) => {
  const { warning } = getState();

  clearTimeout(timeoutMutex);

  if (warning) dispatch(hideWarning());

  dispatch(displayWarning(header, content));

  timeoutMutex = setTimeout(
    () => dispatch(hideWarning()),
    config.warningFlashTimeout
  );
};
