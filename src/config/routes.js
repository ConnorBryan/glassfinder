import App from "../App";
import Home from "../screens/Home";
import Updates from "../screens/Updates";
import Help from "../screens/Help";
import About from "../screens/About";
import Contact from "../screens/Contact";
import MyAccount from "../screens/MyAccount";
import TermsAndConditions from "../screens/TermsAndConditions";
import PrivacyPolicy from "../screens/PrivacyPolicy";

import { Signin, Signup } from "../screens/formscreens";

// Shops
import ExploreShops from "../slices/shops/explore";
import ShopDetail from "../slices/shops/detail";

// Artists
import ArtistDetail from "../slices/artists/detail";

// Brands
import ExploreBrands from "../slices/brands/explore";

// Pieces
import ExplorePieces from "../slices/pieces/explore";
import PieceDetail from "../slices/pieces/detail";
import PurchasePiece from "../slices/pieces/purchase";

export default [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/updates",
        exact: true,
        component: Updates
      },
      {
        path: "/help",
        exact: true,
        component: Help
      },
      {
        path: "/about",
        exact: true,
        component: About
      },
      {
        path: "/contact",
        exact: true,
        component: Contact
      },
      {
        path: "/explore-shops",
        exact: true,
        component: ExploreShops
      },
      {
        path: "/explore-pieces",
        exact: true,
        component: ExplorePieces
      },
      {
        path: "/explore-brands",
        exact: true,
        component: ExploreBrands
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
      {
        path: "/my-account",
        exact: true,
        component: MyAccount
      },
      {
        path: "/purchase",
        exact: true,
        component: PurchasePiece
      },
      {
        path: "/terms-and-conditions",
        exact: true,
        component: TermsAndConditions
      },
      {
        path: "/privacy-policy",
        exact: true,
        component: PrivacyPolicy
      }
    ]
  }
];
