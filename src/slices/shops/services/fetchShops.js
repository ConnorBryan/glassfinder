import axios from "axios";

import constants from "../../../config/";

export default async function fetchShops(page = 0) {
  try {
    const url = `${constants.localApi}/shops?page=${page}`;
    const { data: { shops, pages: totalPages } } = await axios.get(url);

    return { shops, totalPages };
  } catch (e) {
    console.error(e);
    return [];
  }
}
