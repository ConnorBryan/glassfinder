import axios from "axios";

import constants from "../../../config";

export default async function fetchPieces(id, page = 0) {
  const url = `${constants.api}/users/${id}/my-pieces?page=${page}`;
  const {
    data: { success, payload: { pieces, pages: totalPages } }
  } = await axios.get(url);

  if (!success) throw Error("Unable to fetch pieces");

  return { pieces, totalPages };
}
