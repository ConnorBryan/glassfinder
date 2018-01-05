import axios from "axios";

import constants from "../../../config/";

async function linkAs(id, type, config) {
  const url = `${constants.api}/users/${id}/link`;
  const {
    data: { success, payload: { data: account } }
  } = await axios.post(url, {
    type,
    config
  });

  if (!success) throw Error("There was an issue while attempting link.");

  return account;
}

export async function linkAsShop(id, config) {
  return await linkAs(id, constants.linkTypes.SHOP, JSON.stringify(config));
}

export async function linkAsArtist(id, config) {
  return await linkAs(id, constants.linkTypes.ARTIST, JSON.stringify(config));
}

export async function linkAsBrand(id, config) {
  return await linkAs(id, constants.linkTypes.BRAND, JSON.stringify(config));
}
