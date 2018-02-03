/**
 * @overview
 * "Account screens" are screens that do require authorization.
 */
import MyAccount from "../myAccount";
import UpdatePassword from "../myAccount/screens/UpdatePassword";
import BecomeAShop from "../components/MyAccount/components/BecomeAShop";
import BecomeAnArtist from "../components/MyAccount/components/BecomeAnArtist";
import BecomeABrand from "../components/MyAccount/components/BecomeABrand";
import UpdateShopInformation from "../components/MyAccount/components/UpdateShopInformation";
import UpdateArtistInformation from "../components/MyAccount/components/UpdateArtistInformation";
import UpdateBrandInformation from "../components/MyAccount/components/UpdateBrandInformation";
import UploadImage from "../components/MyAccount/components/UploadImage";
import UploadPiece from "../myAccount/screens/UploadPiece";
import MyPiecesViewer from "../components/MyAccount/components/ViewMyPieces";
import UploadPieceImage from "../components/MyAccount/components/UploadPieceImage";
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
    path: "/my-account/upload-image",
    exact: true,
    component: UploadImage
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
    path: "/my-account/view-my-pieces/:id/upload-image",
    exact: true,
    component: UploadPieceImage
  },
  {
    path: "/my-account/view-my-pieces/:id/update-information",
    exact: true,
    component: UpdatePieceInformation
  }
];
