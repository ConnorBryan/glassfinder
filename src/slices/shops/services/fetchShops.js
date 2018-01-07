import axios from "axios";

import constants from "../../../config/";

export default async function fetchShops(page = 0) {
  const url = `${constants.api}/shops?page=${page}`;
  const {
    data: { payload: { shops, pages: totalPages, perPage } }
  } = await axios.get(url);

  return { shops, totalPages, perPage };
}
