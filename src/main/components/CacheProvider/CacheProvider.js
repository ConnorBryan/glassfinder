import React, { Component } from "react";

import API from "../../services";

const EXPIRES_IN = "expiresIn";
const COLLECTIONS = ["shops", "artists", "brands", "pieces"];
const BY_ID = ["shopsById", "artistsById", "brandsById", "piecesById"];

export default function withCache(WrappedComponent) {
  return class CacheProvider extends Component {
    constructor(props) {
      super(props);

      if (cacheIsExpired()) {
        bustCache();
      }

      this.state = {
        ...loadModelsFromCache()
      };
    }

    update(collections, byId) {
      const { localStorage } = window;

      Object.keys(collections).forEach(collection =>
        localStorage.setItem(
          collection,
          JSON.stringify(collections[collection])
        )
      );

      Object.keys(byId).forEach(map =>
        localStorage.setItem(map, JSON.stringify([...byId[map]]))
      );

      localStorage.setItem(EXPIRES_IN, new Date());
    }

    render() {
      return (
        <WrappedComponent
          update={this.update}
          {...this.props}
          {...this.state}
        />
      );
    }
  };
}

/* === */

export function cacheIsExpired() {
  const expiresIn = localStorage.getItem(EXPIRES_IN);

  if (!expiresIn) {
    return false;
  }

  const future = new Date(expiresIn);
  const now = new Date();

  return now >= future;
}

export function bustCache() {
  const { localStorage } = window;

  [...COLLECTIONS, ...BY_ID].forEach(model => localStorage.removeItem(model));

  localStorage.removeItem(EXPIRES_IN);
}

export function loadModelsFromCache() {
  const { localStorage } = window;
  const collections = COLLECTIONS.reduce(
    (acc, models) => ({
      ...acc,
      [models]: JSON.parse(localStorage.getItem(models) || "[]")
    }),
    {}
  );
  const byId = BY_ID.reduce((acc, modelsById) => {
    const map = JSON.parse(localStorage.getItem(modelsById) || "[]");

    return { ...acc, [modelsById]: new Map(map ? [...map] : null) };
  }, {});

  return { ...collections, ...byId };
}
