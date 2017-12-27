import axios from "axios";

import constants from "../../../config/";

export default async function fetchPieces(id) {
  try {
    const url = `${constants.localApi}/shops/${id}/pieces`;
    const { data: { pieces } } = await axios.get(url);

    return pieces;
  } catch (e) {
    console.error(e);
    return null;
  }
}
