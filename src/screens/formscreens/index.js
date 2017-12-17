import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";
import SigninForm from "../../slices/account/forms/Signin";
import SignupForm from "../../slices/account/forms/Signup";
import UpdatePasswordForm from "../../slices/account/forms/UpdatePassword";

import UpgradeToShopForm from "../../slices/account/forms/UpgradeToShop";
import UpgradeToArtistForm from "../../slices/account/forms/UpgradeToArtist";
import UpgradeToBrandForm from "../../slices/account/forms/UpgradeToBrand";

import UpdateShopInfoForm from "../../slices/shops/forms/UpdateShopInfo";

// import UpdateArtistInfoForm from "../../slices/artists/forms/UpdateShopInfo";

// import UpdateBrandInfoForm from "../../slices/brands/forms/UpdateBrandInfo";

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
export const UpdateShopInfo = withPageHeader(config.pageHeaders.updateShopInfo, UpdateShopInfoForm);
export const BecomeAnArtist = withPageHeader(
  config.pageHeaders.becomeAnArtist,
  UpgradeToArtistForm
);
export const BecomeABrand = withPageHeader(
  config.pageHeaders.becomeABrand,
  UpgradeToBrandForm
);
