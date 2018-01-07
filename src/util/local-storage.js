const setLocalStorageData = (key, values) => {
  try {
    const { localStorage } = window;
    const data = JSON.stringify(values);

    localStorage.setItem(key, data);
  } catch (e) {
    console.error(`Unable to set LocalStorage data for key ${key}`);
  }
};

const getLocalStorageData = key => {
  try {
    const { localStorage } = window;
    const rawData = localStorage.getItem(key);

    if (!rawData) return null;

    return JSON.parse(rawData);
  } catch (e) {
    console.error(`Unable to get LocalStorage data for key ${key}`);
  }
};

const clearLocalStorageData = key => {
  try {
    const { localStorage } = window;

    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Unable to clear LocalStorage data for key ${key}`);
  }
};

// Local User
export const USER_DATA = "USER_DATA";

export const setLocalUserData = (account, token) =>
  setLocalStorageData(USER_DATA, { account, token });
export const getLocalUserData = () => getLocalStorageData(USER_DATA);
export const clearLocalUserData = () => clearLocalStorageData(USER_DATA);

// Local Models
export const MODELS_DATA = "MODELS_DATA";

export const setLocalModelsData = (
  models,
  activePage,
  modelsPerPage,
  totalPages
) =>
  setLocalStorageData(MODELS_DATA, {
    models,
    activePage,
    modelsPerPage,
    totalPages
  });
export const getLocalModelsData = () => getLocalStorageData(MODELS_DATA);
export const clearLocalModelsData = () => clearLocalStorageData(MODELS_DATA);
