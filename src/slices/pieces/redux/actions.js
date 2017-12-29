import { displayWarning } from "../../../redux/actions";
import { sleep } from "../../../util";
import services from "../services";

// Actions
export const SET_PIECES_FETCHING = "SET_PIECES_FETCHING";
export const FETCH_PIECES_SUCCESS = "FETCH_PIECES_SUCCESS";
export const FETCH_PIECES_FAILURE = "FETCH_PIECES_FAILURE";
export const FETCH_PIECE_SUCCESS = "FETCH_PIECE_SUCCESS";
export const FETCH_PIECE_FAILURE = "FETCH_PIECE_FAILURE";
export const SET_PIECES_PAGE = "SET_PIECES_PAGE";
export const SET_PIECES_TOTAL_PAGES = "SET_PIECES_TOTAL_PAGES";

// Action Creators
export const setPiecesFetching = fetching => ({
  type: SET_PIECES_FETCHING,
  payload: { fetching }
});
export const fetchPiecesSuccess = pieces => ({
  type: FETCH_PIECES_SUCCESS,
  payload: { pieces }
});
export const fetchPiecesFailure = () => ({
  type: FETCH_PIECES_FAILURE
});
export const fetchPieceSuccess = piece => ({
  type: FETCH_PIECES_SUCCESS,
  payload: { piece }
});
export const fetchPieceFailure = () => ({
  type: FETCH_PIECES_FAILURE
});
export const setPiecesPage = page => ({
  type: SET_PIECES_PAGE,
  payload: { page }
});
export const setPiecesTotalPages = totalPages => ({
  type: SET_PIECES_TOTAL_PAGES,
  payload: { totalPages }
});

// Action Handlers
export const fetchPieces = (page, artificialWait) => async dispatch => {
  try {
    dispatch(setPiecesFetching(true));

    if (artificialWait) await sleep(artificialWait);

    const { pieces, totalPages } = await services.fetchPieces(page);

    dispatch(fetchPiecesSuccess(pieces));
    dispatch(setPiecesTotalPages(totalPages));
  } catch (e) {
    console.error(e);
    dispatch(fetchPiecesFailure());
    dispatch(
      displayWarning({
        header: "Unable to fetch pieces",
        content: e.toString()
      })
    );
  }
};

export const fetchPiece = id => async dispatch => {
  try {
    dispatch(setPiecesFetching(true));

    const piece = await services.fetchPiece(id);

    dispatch(fetchPieceSuccess(piece));
  } catch (e) {
    dispatch(fetchPieceFailure());
    dispatch(
      displayWarning({
        header: "Unable to fetch shop",
        content: e.toString()
      })
    );
  }
};

export const regressPiecesPage = () => (dispatch, getState) => {
  const { pieces: { page } } = getState();
  const nextPage = page - 1;

  if (nextPage > -1) {
    dispatch(setPiecesPage(nextPage));
    dispatch(fetchPieces(nextPage));
  }
};

export const advancePiecesPage = () => (dispatch, getState) => {
  const { pieces: { page, totalPages } } = getState();
  const nextPage = page + 1;

  if (nextPage < totalPages) {
    dispatch(setPiecesPage(nextPage));
    dispatch(fetchPieces(nextPage));
  }
};
