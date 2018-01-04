import axios from "axios";

import constants from "../../../config";

export default async function fetchBrands(page = 0) {
  try {
    const url = `${constants.api}/brands?page=${page}`;
    const {
      data: { payload: { brands, pages: totalPages } }
    } = await axios.get(url);

    return { brands, totalPages };
  } catch (e) {
    console.error(e);
  }
}
