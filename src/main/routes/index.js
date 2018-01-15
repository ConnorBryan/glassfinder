import React from "react";
import { Route } from "react-router-dom";

import Home from "../components/Home";
import About from "../components/About";
import Help from "../components/Help";
import Updates from "../components/Updates";
import Contact from "../components/Contact";
import {
  ShopViewer,
  ArtistViewer,
  BrandViewer,
  PieceViewer
} from "../features";

export const RecursiveRoutes = route => (
  <Route
    path={route.path}
    render={props => <route.component {...props} routes={route.routes} />}
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
  }
];
