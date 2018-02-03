/**
 * @overview
 * "Account screens" are screens that do require authorization.
 */
import MyAccount from "../myAccount";
import UpdatePassword from "../myAccount/screens/UpdatePassword";
import BecomeAShop from "../myAccount/screens/BecomeAShop";
import BecomeAnArtist from "../myAccount/screens/BecomeAnArtist";
import BecomeABrand from "../myAccount/screens/BecomeABrand";
import UpdateShopInformation from "../myAccount/screens/UpdateShopInformation";
import UpdateArtistInformation from "../myAccount/screens/UpdateArtistInformation";
import UpdateBrandInformation from "../myAccount/screens/UpdateBrandInformation";
import UploadPiece from "../myAccount/screens/UploadPiece";
import MyPiecesViewer from "../components/MyAccount/components/ViewMyPieces";
import UpdatePieceInformation from "../components/MyAccount/components/UpdatePieceInformation";

export default [
  {
    path: "/my-account",
    exact: true,
    component: MyAccount
  },
  {
    path: "/my-account/update-password",
    exact: true,
    component: UpdatePassword
  },
  {
    path: "/my-account/become-a-shop",
    exact: true,
    component: BecomeAShop
  },
  {
    path: "/my-account/become-an-artist",
    exact: true,
    component: BecomeAnArtist
  },
  {
    path: "/my-account/become-a-brand",
    exact: true,
    component: BecomeABrand
  },
  {
    path: "/my-account/update-shop-information",
    exact: true,
    component: UpdateShopInformation
  },
  {
    path: "/my-account/update-artist-information",
    exact: true,
    component: UpdateArtistInformation
  },
  {
    path: "/my-account/update-brand-information",
    exact: true,
    component: UpdateBrandInformation
  },
  {
    path: "/my-account/upload-piece",
    exact: true,
    component: UploadPiece
  },
  {
    path: "/my-account/view-my-pieces",
    exact: true,
    component: MyPiecesViewer
  },
  {
    path: "/my-account/view-my-pieces/:id?",
    exact: true,
    component: MyPiecesViewer
  },
  {
    path: "/my-account/view-my-pieces/:id/update-information",
    exact: true,
    component: UpdatePieceInformation
  }
];
