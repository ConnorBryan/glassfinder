import axios from "axios";

import constants from "../../../config/";

export default async function fetchShop(id) {
  const url = `${constants.api}/shops/${id}`;
  const { data: { shop } } = await axios.get(url);

  return shop;
}
