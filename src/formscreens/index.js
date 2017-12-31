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

// Artists
import UpdateArtistInfoForm from "../slices/artists/forms/UpdateArtistInfo";

// Brands
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

export const BecomeABrand = withPageHeader(
  config.pageHeaders.becomeABrand,
  LinkAsBrandForm
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
