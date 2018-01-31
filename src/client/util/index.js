import { retrieveFromCache, updateCache } from "./cache";

export {
  getLocalUserData,
  setLocalUserData,
  clearLocalUserData,
  setLocalModelsData,
  getLocalModelsData,
  clearLocalModelsData
} from "./local-storage";

export { default as logger } from "./logger";

export * from "./cache";

export * from "./responsive";

export async function genericSetItems(cacheKey, service) {
  let items;

  const cachedItems = JSON.parse(retrieveFromCache(cacheKey) || "[]");

  items = cachedItems.length > 0 ? cachedItems : await service();

  updateCache(cacheKey, JSON.stringify(items));

  this.setState({ items });
}
