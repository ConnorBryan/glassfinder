import axios from "axios";

import constants from "../../../config";

export default async function signin(email, password) {
  const url = `${constants.api}/signin`;
  const {
    data: { success, payload: { token, data: account } }
  } = await axios.post(url, {
    email,
    password
  });

  if (!success) throw Error("Unable to sign in");

  return { token, account };
}
