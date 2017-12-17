import MyAccount from "./MyAccount";
import {
  Signin,
  Signup,
  UpdatePassword,
  BecomeAShop,
  UpdateShopInfo,
  BecomeAnArtist,
  BecomeABrand
} from "../../screens/formscreens";

export default [
  {
    path: "/sign-in",
    exact: true,
    component: Signin
  },
  {
    path: "/sign-up",
    exact: true,
    component: Signup
  },
  {
    path: "/my-account",
    exact: true,
    component: MyAccount
  },
  {
    path: "/my-account/become-a-shop",
    exact: true,
    component: BecomeAShop
  },
  {
    path: "/my-account/update-shop-information",
    exact: true,
    component: UpdateShopInfo
  },
  {
    path: "/my-account/become-an-artist",
    exact: true,
    component: BecomeAnArtist
  },
  {
    path: "/my-account/become-a-brand",
    exact: true,
    component: BecomeABrand
  },
  {
    path: "/my-account/update-password",
    exact: true,
    component: UpdatePassword
  }
];
