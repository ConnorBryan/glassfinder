import config from "../config";
import withPageHeader from "../components/withPageHeader";

// Account
import SigninForm from "../slices/account/forms/Signin";
import SignupForm from "../slices/account/forms/Signup";
import UpdatePasswordForm from "../slices/account/forms/UpdatePassword";
import LinkAsShopForm from "../slices/account/forms/LinkAsShop";
import LinkAsArtistForm from "../slices/account/forms/LinkAsArtist";
import LinkAsBrandForm from "../slices/account/forms/LinkAsBrand";
import UpdateShopInfoForm from "../slices/account/forms/UpdateShopInfo";
import UpdateArtistInfoForm from "../slices/account/forms/UpdateArtistInfo";
import UpdateBrandInfoForm from "../slices/account/forms/UpdateBrandInfo";
import UploadCatalogForm from "../slices/account/forms/UploadCatalog";
import UploadImageForm from "../slices/account/forms/UploadImage";
import UploadPieceForm from "../slices/account/forms/UploadPiece";

// Account
export const Signin = withPageHeader(config.pageHeaders.signin, SigninForm);

export const Signup = withPageHeader(config.pageHeaders.signup, SignupForm);

export const UpdatePassword = withPageHeader(
  config.pageHeaders.updatePassword,
  UpdatePasswordForm
);

export const BecomeAShop = withPageHeader(
  config.pageHeaders.becomeAShop,
  LinkAsShopForm
);

export const BecomeAnArtist = withPageHeader(
  config.pageHeaders.becomeAnArtist,
  LinkAsArtistForm
);

export const BecomeABrand = withPageHeader(
  config.pageHeaders.becomeABrand,
  LinkAsBrandForm
);

export const UpdateShopInfo = withPageHeader(
  config.pageHeaders.updateShopInfo,
  UpdateShopInfoForm
);

export const UpdateArtistInfo = withPageHeader(
  config.pageHeaders.updateArtistInfo,
  UpdateArtistInfoForm
);

export const UpdateBrandInfo = withPageHeader(
  config.pageHeaders.updateBrandInfo,
  UpdateBrandInfoForm
);

export const UploadCatalog = withPageHeader(
  config.pageHeaders.uploadCatalog,
  UploadCatalogForm
);

export const UploadImage = withPageHeader(
  config.pageHeaders.uploadImage,
  UploadImageForm
);

export const UploadPiece = withPageHeader(
  config.pageHeaders.uploadPiece,
  UploadPieceForm
);
