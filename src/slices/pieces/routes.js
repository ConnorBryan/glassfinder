import ExplorePieces from "./explore";
import PieceDetail from "./detail";
import PurchasePiece from "./purchase";

import { UploadPiece } from "../../formscreens";

export default [
  {
    path: "/explore-pieces",
    exact: true,
    component: ExplorePieces
  },
  {
    path: "/piece/:id?",
    exact: true,
    component: PieceDetail
  },
  {
    path: "/purchase/:id?",
    exact: true,
    component: PurchasePiece
  },
  {
    path: "/my-account/upload-piece",
    exact: true,
    component: UploadPiece
  }
];
