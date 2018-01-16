import axios from "axios";
import { partial } from "lodash";

import constants from "../../config";
import { logger } from "../util";

export default class API {
  /**
   * @method fetchModel
   * @desc Retrieve a single instance of a model from the database.
   * @param {string} singular
   * @param {string} plural
   * @param {number} id 
   */
  static async fetchModel(singular, plural, id) {
    try {
      const url = `${constants.api}/${plural}/${id}`;
      const { data: { payload: { [singular]: model } } } = await axios.get(url);

      return model;
    } catch (e) {
      logger(e);

      throw e;
    }
  }

  static fetchShop = partial(API.fetchModel, "shop", "shops");
  static fetchArtist = partial(API.fetchModel, "artist", "artists");
  static fetchBrand = partial(API.fetchModel, "brand", "brands");
  static fetchPiece = partial(API.fetchModel, "piece", "pieces");

  /**
   * @async
   * @method fetchModels
   * @desc Retrieve a collection of models from the database.
   * @param {string} plural 
   * @param {number} page 
   * @returns {object}
   */
  static async fetchModels(plural, page = 0) {
    try {
      const url = `${constants.api}/${plural}?page=${page}`;
      const {
        data: { payload: { [plural]: models, pages: totalPages, perPage } }
      } = await axios.get(url);

      return { [plural]: models, totalPages, perPage };
    } catch (e) {
      logger(e);

      return {
        [plural]: [],
        totalPages: 1,
        perPage: 0
      };
    }
  }

  static fetchShops = partial(API.fetchModels, "shops");
  static fetchArtists = partial(API.fetchModels, "artists");
  static fetchBrands = partial(API.fetchModels, "brands");
  static fetchPieces = partial(API.fetchModels, "pieces");

  /**
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {object}
   */
  static async signin(email, password) {
    try {
      const url = `${constants.api}/signin`;
      const {
        data: { payload: { token, data: account } }
      } = await axios.post(url, {
        email,
        password
      });

      return { token, account };
    } catch (e) {
      console.error(e);
      return {
        token: null,
        account: null
      };
    }
  }

  /**
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {number}
   */
  static async signup(email, password) {
    try {
      const url = `${constants.api}/signup`;
      const { data: { payload: { id } } } = await axios.post(url, {
        email,
        password
      });

      return id;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /**
   * 
   * @param {string} id 
   * @param {string} verificationCode 
   */
  static async verify(id, verificationCode) {
    try {
      const url = `${constants.api}/users/${id}/verify`;

      await axios.post(url, { verificationCode });

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * 
   * @param {string} name 
   * @param {string} email 
   * @param {string} message 
   */
  static async sendContactMessage(name, email, message) {
    try {
      const url = `${constants.api}/contact`;

      await axios.post(url, {
        name,
        email,
        message
      });

      return true;
    } catch (e) {
      console.error(e);

      return false;
    }
  }
}
