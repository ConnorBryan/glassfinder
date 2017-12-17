import ExplorePieces from "./explore";
// import PieceDetail from "./detail";
import PurchasePiece from "./purchase";

export default [
  {
    path: "/explore-pieces",
    exact: true,
    component: ExplorePieces
  },
  {
    path: "/purchase",
    exact: true,
    component: PurchasePiece
  }
];
