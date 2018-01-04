import updatePassword from "./updatePassword";
import * as linkAs from "./linkAs";
import updateInfo from "./updateInfo";
import uploadImage from "./uploadImage";
import uploadPiece from "./uploadPiece";

export default {
  updatePassword,
  ...linkAs,
  updateInfo,
  uploadImage,
  uploadPiece
};
