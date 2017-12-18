import { UploadCatalog } from "../../formscreens";
import ExploreBrands from "./explore";

export default [
  {
    path: "/explore-brands",
    exact: true,
    component: ExploreBrands
  },
  {
    path: "/my-account/upload-catalog",
    exact: true,
    component: UploadCatalog
  }
];
