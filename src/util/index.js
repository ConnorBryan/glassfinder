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

export const clearUserData = () => {
  const { localStorage } = window;

  localStorage.removeItem(LOCALSTORAGE_USER_DATA);
};

export const getIdFromPath = path => path.substr(1, path.length);

export { requestWith, redirectHome } from "./request-response";
