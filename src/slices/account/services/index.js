import * as linkAs from "./linkAs";
import signup from "./signup";
import signin from "./signin";
import updatePassword from "./updatePassword";
import updateInfo from "./updateInfo";
import uploadImage from "./uploadImage";
import uploadPiece from "./uploadPiece";
import fetchMyPieces from "./fetchMyPieces";

export default {
  ...linkAs,
  signup,
  signin,
  updatePassword,
  updateInfo,
  uploadImage,
  uploadPiece,
  fetchMyPieces
};
