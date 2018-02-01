import store from "store";

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

export function removeFromCache(...keys) {
  keys.forEach(key => window.localStorage.removeItem(key));
}

/* === */

export class CacheProvider {
  static update = (key, value, expiration) => {
    const futureExpiration = new Date().getTime() + expiration;

    store.set(key, {
      value,
      expiration: futureExpiration
    });
  };

  static retrieve = key => {
    const { value, expiration } = store.get(key) || {};
    const currentTime = new Date().getTime();

    if (expiration && currentTime - expiration >= 0) {
      store.remove(key);

      return null;
    }

    return value;
  };

  static remove = (...keys) => keys.forEach(store.remove.bind(store));

  static removeAll = () => store.clearAll();
}
