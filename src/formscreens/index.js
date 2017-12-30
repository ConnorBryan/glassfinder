import config from "../config";
import withPageHeader from "../components/withPageHeader";

// Account
import SigninForm from "../slices/account/forms/Signin";
import SignupForm from "../slices/account/forms/Signup";
import UpdatePasswordForm from "../slices/account/forms/UpdatePassword";
import LinkAsShopForm from "../slices/account/forms/LinkAsShop";
import LinkAsArtistForm from "../slices/account/forms/LinkAsArtist";

// Shops
import UpdateShopInfoForm from "../slices/shops/forms/UpdateShopInfo";

// Artists
import UpdateArtistInfoForm from "../slices/artists/forms/UpdateArtistInfo";

// Brands
import UpgradeToBrandForm from "../slices/brands/forms/UpgradeToBrand";
import UpdateBrandInfoForm from "../slices/brands/forms/UpdateBrandInfo";
import UploadCatalogForm from "../slices/brands/forms/UploadCatalog";

// Pieces
import UploadPieceForm from "../slices/pieces/forms/UploadPiece";

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

// Shops
export const UpdateShopInfo = withPageHeader(
  config.pageHeaders.updateShopInfo,
  UpdateShopInfoForm
);

// Artists
export const UpdateArtistInfo = withPageHeader(
  config.pageHeaders.updateArtistInfo,
  UpdateArtistInfoForm
);

// Brands
export const BecomeABrand = withPageHeader(
  config.pageHeaders.becomeABrand,
  UpgradeToBrandForm
);

export const UpdateBrandInfo = withPageHeader(
  config.pageHeaders.updateBrandInfo,
  UpdateBrandInfoForm
);

export const UploadCatalog = withPageHeader(
  config.pageHeaders.uploadCatalog,
  UploadCatalogForm
);

// Pieces
export const UploadPiece = withPageHeader(
  config.pageHeaders.uploadPiece,
  UploadPieceForm
);
