import axios from "axios";

import constants from "../../../config";

export default async function fetchBrands(page = 0) {
  try {
    const url = `${constants.api}/brands?page=${page}`;
    const {
      data: { payload: { brands, pages: totalPages, perPage } }
    } = await axios.get(url);

    return { brands, totalPages, perPage };
  } catch (e) {
    console.error(e);
  }
}
