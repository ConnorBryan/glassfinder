import {
  DISPLAY_WARNING,
  HIDE_WARNING,
  START_LOADING,
  STOP_LOADING,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR
} from "./actions";

export const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const warning = createReducer(null, {
  [DISPLAY_WARNING]: (state, { payload: { header, content } }) => ({
    header,
    content
  }),
  [HIDE_WARNING]: () => null
});

export const loading = createReducer(false, {
  [START_LOADING]: () => true,
  [STOP_LOADING]: () => false
});

export const sidebar = createReducer(false, {
  [SHOW_SIDEBAR]: () => true,
  [HIDE_SIDEBAR]: () => false
});
