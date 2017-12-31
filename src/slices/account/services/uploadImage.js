import axios from "axios";

import constants from "../../../config/";

export default async function uploadImage(id, image) {
  const formData = new FormData();

  formData.append("image", image);

  const url = `${constants.localApi}/users/${id}/upload-image`;
  const { data: { success } } = await axios.post(url, formData);

  if (!success)
    throw Error("There was an issue while attempting to upload an image.");
}
