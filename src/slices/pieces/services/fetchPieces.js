import axios from "axios";

import constants from "../../../config";

export default async function fetchPieces(page = 0) {
  const url = `${constants.api}/pieces?page=${page}`;
  const {
    data: { success, payload: { pieces, pages: totalPages, perPage } }
  } = await axios.get(url);

  if (!success) throw Error("Unable to fetch pieces");

  return { pieces, totalPages, perPage };
}
