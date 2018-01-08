import axios from "axios";

import constants from "../../../config";

export default async function fetchArtist(id) {
  try {
    const url = `${constants.api}/artist/${id}`;
    const { data: { payload: { artist } } } = await axios.get(url);

    return artist;
  } catch (e) {
    console.error(e);
  }
}
