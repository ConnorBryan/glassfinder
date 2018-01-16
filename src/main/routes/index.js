import React from "react";
import { Route } from "react-router-dom";

import Home from "../components/Home";
import About from "../components/About";
import Help from "../components/Help";
import Updates from "../components/Updates";
import Contact from "../components/Contact";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Verification from "../components/Verification";
import MyAccount from "../components/MyAccount";
import UpdatePassword from "../components/MyAccount/components/UpdatePassword";
import BecomeAShop from "../components/MyAccount/components/BecomeAShop";
import BecomeAnArtist from "../components/MyAccount/components/BecomeAnArtist";
import BecomeABrand from "../components/MyAccount/components/BecomeABrand";
import UpdateShopInformation from "../components/MyAccount/components/UpdateShopInformation";
import UpdateArtistInformation from "../components/MyAccount/components/UpdateArtistInformation";
import UpdateBrandInformation from "../components/MyAccount/components/UpdateBrandInformation";

import {
  ShopViewer,
  ArtistViewer,
  BrandViewer,
  PieceViewer
} from "../features";

export const RecursiveRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component
        {...props}
        {...route.additionalProps}
        routes={route.routes}
      />
    )}
  />
);

export default [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    exact: true,
    component: About
  },
  {
    path: "/help",
    exact: true,
    component: Help
  },
  {
    path: "/updates",
    exact: true,
    component: Updates
  },
  {
    path: "/contact",
    exact: true,
    component: Contact
  },
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
  // {
  //   path: "/terms-and-conditions",
  //   exact: true,
  //   component: TermsAndConditions
  // },
  // {
  //   path: "/privacy-policy",
  //   exact: true,
  //   component: PrivacyPolicy
  // },
  {
    path: "/verification/:id?/:verificationCode?",
    exact: true,
    component: Verification
  },
  {
    path: "/shops",
    exact: true,
    component: ShopViewer
  },
  {
    path: "/shops/:id",
    exact: true,
    component: ShopViewer
  },
  {
    path: "/artists",
    exact: true,
    component: ArtistViewer
  },
  {
    path: "/artists/:id",
    exact: true,
    component: ArtistViewer
  },
  {
    path: "/brands",
    exact: true,
    component: BrandViewer
  },
  {
    path: "/brands/:id?",
    exact: true,
    component: BrandViewer
  },
  {
    path: "/pieces",
    exact: true,
    component: PieceViewer
  },
  {
    path: "/pieces/:id?",
    exact: true,
    component: PieceViewer
  },
  {
    path: "/my-account",
    exact: true,
    component: MyAccount
  },
  {
    path: "/my-account/update-password",
    exact: true,
    component: UpdatePassword
  },
  {
    path: "/my-account/become-a-shop",
    exact: true,
    component: BecomeAShop
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
    path: "/my-account/update-shop-information",
    exact: true,
    component: UpdateShopInformation
  },
  {
    path: "/my-account/update-artist-information",
    exact: true,
    component: UpdateArtistInformation
  },
  {
    path: "/my-account/update-brand-information",
    exact: true,
    component: UpdateBrandInformation
  }
];
