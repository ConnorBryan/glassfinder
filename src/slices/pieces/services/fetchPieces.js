import axios from "axios";

import constants from "../../../config";

export default async function fetchPieces(page = 0) {
  try {
    const url = `${constants.localApi}/pieces?page=${page}`;
    const { data: { pieces, pages: totalPages } } = await axios.get(url);

    return { pieces, totalPages };
  } catch (e) {
    console.error(e);
  }
}
