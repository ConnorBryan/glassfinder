import axios from "axios";

import constants from "../../../config/";

export default async function fetchShopPieces(id) {
  const url = `${constants.localApi}/shops/${id}/pieces`;
  const { data: { pieces } } = await axios.get(url);

  return pieces;
}
