import axios from "axios";

import constants from "../../../config";

export default async function fetchBrand(id) {
  try {
    const url = `${constants.api}/brands/${id}`;
    const { data: { payload: { brand } } } = await axios.get(url);

    return brand;
  } catch (e) {
    console.error(e);
  }
}
