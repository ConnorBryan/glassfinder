import axios from "axios";

import constants from "../../../config";

export default async function fetchPiece(id) {
  const url = `${constants.api}/pieces/${id}`;
  const { data: { payload: { piece } } } = await axios.get(url);

  return piece;
}
