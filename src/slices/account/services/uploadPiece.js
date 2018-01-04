import axios from "axios";

import constants from "../../../config";

export default async function uploadPiece(
  id,
  name,
  maker,
  price,
  description,
  location
) {
  const url = `${constants.api}/pieces?userId=${id}`;
  const { data: { success, payload: { piece } } } = await axios.post(url, {
    name,
    maker,
    price,
    description,
    location
  });

  if (!success)
    throw Error("There was an issue while attempting to update password.");

  return piece;
}
