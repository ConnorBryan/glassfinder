import config from "../config";
import withPageHeader from "../providers/withPageHeader";

import SigninForm from "../slices/account/forms/Signin";
import SignupForm from "../slices/account/forms/Signup";
import UpdatePasswordForm from "../slices/account/forms/UpdatePassword";

import UpgradeToShopForm from "../slices/account/forms/UpgradeToShop";
import UpdateShopInfoForm from "../slices/shops/forms/UpdateShopInfo";

import UpgradeToArtistForm from "../slices/account/forms/UpgradeToArtist";
import UpdateArtistInfoForm from "../slices/artists/forms/UpdateArtistInfo";

import UpgradeToBrandForm from "../slices/account/forms/UpgradeToBrand";
import UpdateBrandInfoForm from "../slices/brands/forms/UpdateBrandInfo";
import UploadCatalogForm from "../slices/brands/forms/UploadCatalog";

import UploadPieceForm from "../slices/pieces/forms/UploadPiece";

export const Signin = withPageHeader(config.pageHeaders.signin, SigninForm);
export const Signup = withPageHeader(config.pageHeaders.signup, SignupForm);
export const UpdatePassword = withPageHeader(
  config.pageHeaders.updatePassword,
  UpdatePasswordForm
);

export const BecomeAShop = withPageHeader(
  config.pageHeaders.becomeAShop,
  UpgradeToShopForm
);
export const UpdateShopInfo = withPageHeader(
  config.pageHeaders.updateShopInfo,
  UpdateShopInfoForm
);

export const BecomeAnArtist = withPageHeader(
  config.pageHeaders.becomeAnArtist,
  UpgradeToArtistForm
);
export const UpdateArtistInfo = withPageHeader(
  config.pageHeaders.updateArtistInfo,
  UpdateArtistInfoForm
);

export const BecomeABrand = withPageHeader(
  config.pageHeaders.becomeABrand,
  UpgradeToBrandForm
);
export const UpdateBrandInfo = withPageHeader(
  config.pageHeaders.updateBrandInfo,
  UpdateBrandInfoForm
);

export const UploadPiece = withPageHeader(
  config.pageHeaders.uploadPiece,
  UploadPieceForm
);

export const UploadCatalog = withPageHeader(
  config.pageHeaders.uploadCatalog,
  UploadCatalogForm
);
