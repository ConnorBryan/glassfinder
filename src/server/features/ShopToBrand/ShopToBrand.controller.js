import * as config from "../../../config";
import { requireProperties, success, error } from "../../../util";

import models from "../../database/models";

const { ShopToBrand, Artist, Brand } = models;

export default class ShopToBrandController {
  static getAssociatedBrands = async (req, res) => {
    try {
      const { id } = req.params;

      requireProperties({ id });

      const brands = await ShopToBrand.findAll({ where: { shopId: id } });

      return success(
        res,
        `Successfully fetched associated brands for Shop#${id}`,
        {
          brands
        }
      );
    } catch (e) {
      console.error(e);
      return error(res, e);
    }
  };
}
