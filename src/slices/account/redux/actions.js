// Actions
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const SIGNOUT = "SIGNOUT";

// Action Creators
export const signinSuccess = account => ({
  type: SIGNIN_SUCCESS,
  payload: { account }
});
export const signinFailure = () => ({ type: SIGNIN_FAILURE });
export const signout = () => ({ type: SIGNOUT });

// Action Handlers
export const attemptSignin = (username, password) => async dispatch => {
  try {
    const account = {
      email: "cchromium@gmail.com"
    };

    dispatch(signinSuccess(account));
  } catch (e) {
    console.error(e);
    dispatch(signinFailure());
  }
};
