import { displayWarning } from "../../../redux/actions";
import fetchShopsService from "../services/fetchShops";

// Actions
export const FETCH_SHOPS_SUCCESS = "FETCH_SHOPS_SUCCESS";
export const FETCH_SHOPS_FAILURE = "FETCH_SHOPS_FAILURE";
export const SET_FETCH_SHOPS_PAGE = "SET_FETCH_SHOPS_PAGE";

// Action Creators
export const fetchShopsSuccess = shops => ({
  type: FETCH_SHOPS_SUCCESS,
  payload: { shops }
});
export const fetchShopsFailure = () => ({ type: FETCH_SHOPS_FAILURE });
export const setFetchShopsPage = page => ({
  type: SET_FETCH_SHOPS_PAGE,
  payload: { page }
});

// Action Handlers
export const fetchShops = () => async (dispatch, getState) => {
  try {
    const { page } = getState();
    const shops = await fetchShopsService(page);

    dispatch(fetchShopsSuccess(shops));
  } catch (e) {
    dispatch(fetchShopsFailure());
    dispatch(
      displayWarning({
        header: "Unable to fetch shops",
        content: e.toString()
      })
    );
  }
};
