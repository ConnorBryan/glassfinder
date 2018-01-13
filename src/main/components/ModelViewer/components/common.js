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
  updateCache("expiresIn", new Date(new Date().getTime() + 10 * 1000));
}

export function updateCache(key, value) {
  window.localStorage.setItem(key, value);
}

export function retrieveFromCache(key) {
  return window.localStorage.getItem(key);
}
