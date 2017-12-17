import App from "../App";
import Home from "../screens/Home";
import Help from "../screens/Help";
import About from "../screens/About";
import Contact from "../screens/Contact";
import ExploreShops from "../screens/ExploreShops";
import ExplorePieces from "../screens/ExplorePieces";
import ExploreBrands from "../screens/ExploreBrands";
import MyAccount from "../screens/MyAccount";

import { Signin, Signup } from "../screens/formscreens";

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
      }
    ]
  }
];
