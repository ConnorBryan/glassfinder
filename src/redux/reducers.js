import { DISPLAY_WARNING, HIDE_WARNING } from "./actions";

export const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const warning = createReducer(null, {
  [DISPLAY_WARNING]: (state, { header, content }) => ({ header, content }),
  [HIDE_WARNING]: () => null
});
