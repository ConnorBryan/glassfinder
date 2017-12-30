import axios from "axios";

import constants from "../../../config/";

export default async function updatePassword(id, currentPassword, newPassword) {
  const url = `${constants.localApi}/users/${id}/update-password`;
  const { data: { success } } = await axios.post(url, {
    currentPassword,
    newPassword
  });

  if (!success)
    throw Error("There was an issue while attempting to update password.");
}
