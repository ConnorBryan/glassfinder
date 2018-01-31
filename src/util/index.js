import { retrieveFromCache, updateCache } from "./cache";

export { default as upload } from "./upload";
export * from "./requestResponse";
export { default as CRUR } from "./crur";
export * from "./cache";
export { default as logger } from "./logger";
export * from "./responsive";

export async function genericSetItems(cacheKey, service) {
  let items;

  const cachedItems = JSON.parse(retrieveFromCache(cacheKey) || "[]");

  items = cachedItems.length > 0 ? cachedItems : await service();

  updateCache(cacheKey, JSON.stringify(items));

  this.setState({ items });
}
