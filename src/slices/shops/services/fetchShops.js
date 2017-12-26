import axios from "axios";

import constants from "../../../config/";

export default async function fetchShops(page = 0) {
  try {
    const url = `${constants.localApi}/shops?page=${page}`;
    const { data: { shops } } = await axios.get(url);

    return shops;
  } catch (e) {
    console.error(e);
    return [];
  }
}
