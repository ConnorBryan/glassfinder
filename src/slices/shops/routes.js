import ExploreShops from "./explore";
import ShopDetail from "./detail";

export default [
  {
    path: "/explore-shops/:id?",
    exact: true,
    component: ExploreShops
  },
  {
    path: "/shop/:id?",
    exact: true,
    component: ShopDetail
  }
];
