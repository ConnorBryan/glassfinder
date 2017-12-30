export const LOCALSTORAGE_USER_DATA = "LOCALSTORAGE_USER_DATA";

export const sleep = ms => new Promise(r => setTimeout(r, ms));

export const setUserData = (account, token) => {
  const { localStorage } = window;
  const userData = JSON.stringify({ account, token });

  localStorage.setItem(LOCALSTORAGE_USER_DATA, userData);
};

export const getUserData = () => {
  const { localStorage } = window;
  const rawUserData = localStorage.getItem(LOCALSTORAGE_USER_DATA);

  if (!rawUserData) return null;

  return JSON.parse(rawUserData);
};
