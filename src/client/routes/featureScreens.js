/**
 * @overview
 * "Feature screens" are screens that vary functionality
 * basic on signed-in status, and are related to the ModelViewer.
 */
import {
  // ShopViewer,
  ArtistViewer,
  BrandViewer,
  PieceViewer
} from "../features";
import ShopViewer from "../components/ModelExplorer";

export default [
  // Shops
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

  // Artists
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

  // Brands
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

  // Pieces
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
