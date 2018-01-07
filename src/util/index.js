export const sleep = ms => new Promise(r => setTimeout(r, ms));

export const getIdFromPath = path => path.substr(1, path.length);

export {
  getLocalUserData,
  setLocalUserData,
  clearLocalUserData,
  setLocalModelsData,
  getLocalModelsData,
  clearLocalModelsData
} from "./local-storage";

export { requestWith, redirectHome } from "./request-response";
