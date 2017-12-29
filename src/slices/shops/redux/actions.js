import { displayWarning } from "../../../redux/actions";
import { sleep } from "../../../util";
import services from "../services";

// Actions
export const FETCH_SHOPS_SUCCESS = "FETCH_SHOPS_SUCCESS";
export const FETCH_SHOPS_FAILURE = "FETCH_SHOPS_FAILURE";
export const SET_SHOPS_PAGE = "SET_SHOPS_PAGE";
export const SET_SHOPS_FETCHING = "SET_SHOPS_FETCHING";
export const FETCH_SHOP_SUCCESS = "FETCH_SHOP_SUCCESS";
export const FETCH_SHOP_FAILURE = "FETCH_SHOP_FAILURE";
export const FETCH_SHOP_PIECES_SUCCESS = "FETCH_PIECES_SUCCESS";
export const FETCH_SHOP_PIECES_FAILURE = "FETCH_PIECES_FAILURE";
export const SET_SHOPS_TOTAL_PAGES = "SET_SHOPS_TOTAL_PAGES";

// Action Creators
export const fetchShopsSuccess = shops => ({
  type: FETCH_SHOPS_SUCCESS,
  payload: { shops }
});
export const fetchShopsFailure = () => ({ type: FETCH_SHOPS_FAILURE });
export const setFetchShopsPage = page => ({
  type: SET_SHOPS_PAGE,
  payload: { page }
});
export const setShopsFetching = fetching => ({
  type: SET_SHOPS_FETCHING,
  payload: { fetching }
});
export const fetchShopSuccess = shop => ({
  type: FETCH_SHOP_SUCCESS,
  payload: { shop }
});
export const fetchShopFailure = () => ({
  type: FETCH_SHOP_FAILURE
});
export const fetchShopPiecesSuccess = pieces => ({
  type: FETCH_SHOP_PIECES_SUCCESS,
  payload: { pieces }
});
export const fetchShopPiecesFailure = () => ({
  type: FETCH_SHOP_PIECES_FAILURE
});
export const setShopsTotalPages = totalPages => ({
  type: SET_SHOPS_TOTAL_PAGES,
  payload: { totalPages }
});

// Action Handlers
export const fetchShops = (page, artificialWait) => async dispatch => {
  try {
    dispatch(setShopsFetching(true));

    if (artificialWait) await sleep(artificialWait);

    const { shops, totalPages } = await services.fetchShops(page);

    dispatch(fetchShopsSuccess(shops));
    dispatch(setShopsTotalPages(totalPages));
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

export const fetchShop = id => async dispatch => {
  try {
    dispatch(setShopsFetching(true));

    const shop = await services.fetchShop(id);

    dispatch(fetchShopSuccess(shop));
  } catch (e) {
    dispatch(fetchShopFailure());
    dispatch(
      displayWarning({
        header: "Unable to fetch shop",
        content: e.toString()
      })
    );
  }
};

export const fetchShopPieces = id => async dispatch => {
  try {
    const pieces = await services.fetchShopPieces(id);

    dispatch(fetchShopPiecesSuccess(pieces));
  } catch (e) {
    dispatch(fetchShopPiecesFailure());
    dispatch(
      displayWarning({
        header: "Unable to fetch pieces for shop",
        content: e.toString()
      })
    );
  }
};

export const regressShopsPage = () => (dispatch, getState) => {
  const { shops: { page } } = getState();
  const nextPage = page - 1;

  if (nextPage > -1) {
    dispatch(setFetchShopsPage(nextPage));
    dispatch(fetchShops(nextPage));
  }
};

export const advanceShopsPage = () => (dispatch, getState) => {
  const { shops: { page, totalPages } } = getState();
  const nextPage = page + 1;

  if (nextPage < totalPages) {
    dispatch(setFetchShopsPage(nextPage));
    dispatch(fetchShops(nextPage));
  }
};
