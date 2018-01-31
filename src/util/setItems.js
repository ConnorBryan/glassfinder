import { CacheProvider } from "./cache";

export default async function setItems(
  cacheKey, // LocalStorage information.
  expiration,
  fetchItems // API request for the collection.
) {
  const cachedItems = CacheProvider.retrieve(cacheKey);
  const items = cachedItems || (await fetchItems());

  if (!cachedItems) {
    CacheProvider.update(cacheKey, items, expiration);
  }

  this.setState({ items });
}
