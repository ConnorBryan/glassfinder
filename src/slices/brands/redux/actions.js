import { displayWarning } from "../../../redux/actions";
import { sleep } from "../../../util";
import services from "../services";

// Actions
export const SET_BRANDS_FETCHING = "SET_BRANDS_FETCHING";
export const FETCH_BRANDS_SUCCESS = "FETCH_BRANDS_SUCCESS";
export const FETCH_BRANDS_FAILURE = "FETCH_BRANDS_FAILURE";
export const SET_BRANDS_PAGE = "SET_BRANDS_PAGE";
export const SET_BRANDS_TOTAL_PAGES = "SET_BRANDS_TOTAL_PAGES";

// Action Creators
export const setBrandsFetching = fetching => ({
  type: SET_BRANDS_FETCHING,
  payload: { fetching }
});
export const fetchBrandsSuccess = brands => ({
  type: FETCH_BRANDS_SUCCESS,
  payload: { brands }
});
export const fetchBrandsFailure = () => ({
  type: FETCH_BRANDS_FAILURE
});
export const setBrandsPage = page => ({
  type: SET_BRANDS_PAGE,
  payload: { page }
});
export const setBrandsTotalPages = totalPages => ({
  type: SET_BRANDS_TOTAL_PAGES,
  payload: { totalPages }
});

// Action Handlers
export const fetchBrands = (page, artificialWait) => async dispatch => {
  try {
    dispatch(setBrandsFetching(true));

    if (artificialWait) await sleep(artificialWait);

    const { brands, totalPages } = await services.fetchBrands(page);

    dispatch(fetchBrandsSuccess(brands));
    dispatch(setBrandsTotalPages(totalPages));
  } catch (e) {
    dispatch(fetchBrandsFailure());
    dispatch(
      displayWarning({
        header: "Unable to fetch brands",
        content: e.toString()
      })
    );
  }
};

export const regressBrandsPage = () => (dispatch, getState) => {
  const { brands: { page } } = getState();
  const nextPage = page - 1;

  if (nextPage > -1) {
    dispatch(setBrandsPage(nextPage));
    dispatch(fetchBrands(nextPage));
  }
};

export const advanceBrandsPage = () => (dispatch, getState) => {
  const { brands: { page, totalPages } } = getState();
  const nextPage = page + 1;

  if (nextPage < totalPages) {
    dispatch(setBrandsPage(nextPage));
    dispatch(fetchBrands(nextPage));
  }
};
