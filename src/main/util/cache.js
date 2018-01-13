export function cacheIsExpired() {
  const expiresIn = retrieveFromCache("expiresIn");

  if (!expiresIn) {
    return false;
  }

  const future = new Date(expiresIn);
  const now = new Date();

  return now >= future;
}

export function updateCacheExpiration() {
  window.localStorage.setItem(
    "expiresIn",
    new Date(new Date().getTime() + 10 * 1000)
  );
}

export function updateCache(cache, value) {
  if (typeof cache === "object") {
    Object.keys(cache).forEach(key =>
      window.localStorage.setItem(key, cache[key])
    );
    return updateCacheExpiration();
  }

  window.localStorage.setItem(cache, value);

  updateCacheExpiration();
}

export function retrieveFromCache(key) {
  return window.localStorage.getItem(key);
}
