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
    path: "/signin",
    exact: true,
    component: Signin
  },
  {
    path: "/signup",
    exact: true,
    component: Signup
  },
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
  }
];
