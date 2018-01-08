import axios from "axios";

import constants from "../../../config";

export default async function fetchArtists(page = 0) {
  try {
    const url = `${constants.api}/artists?page=${page}`;
    const {
      data: { payload: { artists, pages: totalPages, perPage } }
    } = await axios.get(url);

    return { artists, totalPages, perPage };
  } catch (e) {
    console.error(e);
  }
}
