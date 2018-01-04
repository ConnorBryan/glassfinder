import * as linkAs from "./linkAs";
import updatePassword from "./updatePassword";
import updateInfo from "./updateInfo";
import uploadImage from "./uploadImage";
import uploadPiece from "./uploadPiece";
import fetchMyPieces from "./fetchMyPieces";

export default {
  ...linkAs,
  updatePassword,
  updateInfo,
  uploadImage,
  uploadPiece,
  fetchMyPieces
};
