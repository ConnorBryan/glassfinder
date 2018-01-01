import axios from "axios";

import constants from "../../../config/";

export default async function fetchShops(page = 0) {
  const url = `${constants.api}/shops?page=${page}`;
  const { data: { shops, pages: totalPages } } = await axios.get(url);

  return { shops, totalPages };
}
