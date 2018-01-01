import axios from "axios";

import constants from "../config";

export default async function sendContactMessage(name, email, message) {
  const url = `${constants.api}/contact`;
  const { data: { success } } = await axios.post(url, {
    name,
    email,
    message
  });

  if (!success)
    throw Error(
      "There was an issue while attempting to send a contact message."
    );
}
