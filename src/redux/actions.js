// Actions
export const DISPLAY_WARNING = "DISPLAY_WARNING";
export const HIDE_WARNING = "HIDE_WARNING";

// Action Creators

/* Synchronous */
export const displayWarning = (warning, header, content) => ({
  type: DISPLAY_WARNING,
  payload: { header, content }
});
export const hideWarning = () => ({ type: HIDE_WARNING });

/* Asynchronous */