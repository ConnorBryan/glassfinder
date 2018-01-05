import axios from "axios";

import constants from "../../../config";

export default async function signup(email, password) {
  const url = `${constants.api}/signup`;
  const { data: { success, payload: { id } } } = await axios.post(url, {
    email,
    password
  });

  if (!success) throw Error("Unable to sign up");

  return id;
}
