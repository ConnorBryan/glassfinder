import axios from "axios";
import { partial } from "lodash";

import API from "../../main/services";
import { ADMIN_API_ROOT } from "../config";

export default class AdminAPI extends API {
  static async fetchAllModels(plural) {
    try {
      const url = `${ADMIN_API_ROOT}/${plural}`;
      const { data: { payload: { collection } } } = await axios.get(url);

      return collection;
    } catch (e) {
      console.error(e);

      return [];
    }
  }

  static fetchAllShops = partial(AdminAPI.fetchAllModels, "shops");
  static fetchAllArtists = partial(AdminAPI.fetchAllModels, "artists");
  static fetchAllBrands = partial(AdminAPI.fetchAllModels, "brands");
  static fetchAllPieces = partial(AdminAPI.fetchAllModels, "pieces");

  static async deleteModel(plural, id) {
    try {
      const url = `${ADMIN_API_ROOT}/${plural}/${id}`;

      await axios.delete(url);

      return true;
    } catch (e) {
      console.error(e);

      return false;
    }
  }

  static deleteShop = partial(AdminAPI.deleteModel, "shops");
  static deleteArtist = partial(AdminAPI.deleteModel, "artists");
  static deleteBrand = partial(AdminAPI.deleteModel, "brands");
  static deletePiece = partial(AdminAPI.deleteModel, "pieces");
}
