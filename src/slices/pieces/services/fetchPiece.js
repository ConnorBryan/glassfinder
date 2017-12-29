import axios from "axios";

import constants from "../../../config";

export default async function fetchPiece(id) {
  const url = `${constants.localApi}/pieces/${id}`;
  const { data: { piece } } = await axios.get(url);

  return piece;
}
