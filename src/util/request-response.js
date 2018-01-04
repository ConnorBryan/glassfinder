import { push } from "react-router-redux";

import { displayWarning, startLoading, stopLoading } from "../redux/actions";

export async function requestWith(dispatch, errorHeader, func) {
  try {
    dispatch(startLoading());

    await func();
  } catch (e) {
    dispatch(
      displayWarning({
        header: errorHeader,
        content: e.toString()
      })
    );
  } finally {
    dispatch(stopLoading());
  }
}

export function redirectHome(dispatch) {
  dispatch(stopLoading());
  return dispatch(push("/"));
}
