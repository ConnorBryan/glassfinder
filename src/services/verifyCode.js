import axios from "axios";

import constants from "../config";

export default async function verifyCode(id, verificationCode) {
  const url = `${constants.api}/users/${id}/verify`;
  const { data: { success } } = await axios.post(url, { verificationCode });

  if (!success)
    throw Error("There was an issue while attempting verify the code.");
}
