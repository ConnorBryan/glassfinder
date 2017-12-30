import axios from "axios";

import constants from "../../../config/";

async function linkAs(id, type, config) {
  const url = `${constants.localApi}/users/${id}/link`;
  const { data: { success } } = await axios.post(url, {
    type,
    config
  });

  if (!success) throw Error("There was an issue while attempting link.");
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
