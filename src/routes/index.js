import App from "../App";
import basicScreens from "./basic-screens";
import accountSlice from "../slices/account/routes";
import shopSlice from "../slices/shops/routes";
import artistSlice from "../slices/artists/routes";
import brandSlice from "../slices/brands/routes";
import pieceSlice from "../slices/pieces/routes";

export default [
  {
    component: App,
    routes: [
      ...basicScreens,
      ...accountSlice,
      ...shopSlice,
      ...artistSlice,
      ...brandSlice,
      ...pieceSlice
    ]
  }
];
