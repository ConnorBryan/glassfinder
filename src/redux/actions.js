export const DISPLAY_WARNING = "DISPLAY_WARNING";
export const HIDE_WARNING = "HIDE_WARNING";
export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";

export const displayWarning = (header, content) => ({
  type: DISPLAY_WARNING,
  payload: { header, content }
});
export const hideWarning = () => ({ type: HIDE_WARNING });

export const startLoading = () => ({ type: START_LOADING });
export const stopLoading = () => ({ type: STOP_LOADING });
