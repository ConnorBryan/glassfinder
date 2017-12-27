import axios from "axios";

import constants from "../../../config/";

export default async function fetchShop(id) {
  try {
    const url = `${constants.localApi}/shops/${id}`;
    const { data: { shop } } = await axios.get(url);

    return shop;
  } catch (e) {
    console.error(e);
    return null;
  }
}
