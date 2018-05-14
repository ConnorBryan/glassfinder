/**
 * @overview
 * "Feature screens" are screens that vary functionality
 * basic on signed-in status, and are related to the ModelExplorer.
 */
import {
  ShopExplorer,
  ArtistExplorer,
  BrandExplorer,
  PieceExplorer
} from "../features";
import Purchase from "../screens/Purchase";

export default [
  // Shops
  {
    path: "/shops",
    exact: true,
    component: ShopExplorer
  },
  {
    path: "/shops/:id",
    exact: true,
    component: ShopExplorer
  },

  // Artists
  {
    path: "/artists",
    exact: true,
    component: ArtistExplorer
  },
  {
    path: "/artists/:id",
    exact: true,
    component: ArtistExplorer
  },

  // Brands
  {
    path: "/brands",
    exact: true,
    component: BrandExplorer
  },
  {
    path: "/brands/:id?",
    exact: true,
    component: BrandExplorer
  },

  // Pieces
  {
    path: "/pieces",
    exact: true,
    component: PieceExplorer
  },
  {
    path: "/pieces/:id?",
    exact: true,
    component: PieceExplorer
  },
  {
    path: "/pieces/:id/purchase",
    exact: false,
    component: Purchase
  }
];
