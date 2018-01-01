import axios from "axios";

import constants from "../../../config/";

export default async function updateInfo(id, values) {
  const url = `${constants.api}/users/${id}`;
  const { data: { success, link } } = await axios.post(url, {
    values: JSON.stringify(values)
  });

  if (!success)
    throw Error("There was an issue while attempting to update information.");

  return link;
}
