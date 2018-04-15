import * as config from "../../../config";
import { requireProperties, success, error } from "../../../util";

import models from "../../database/models";

const { ShopToBrand, Artist, Brand } = models;

export default class ShopToBrandController {
  static getAllShopToBrands = async (req, res) => {
    try {
      const rawShopToBrands = await ShopToBrand.findAll();
      const shopToBrands = rawShopToBrands.reduce((prev, next) => {
        const existingEntry = prev[next.shopId] || [];
        const newEntry = existingEntry.concat(next.brandId);

        prev[next.shopId] = newEntry;

        return prev;
      }, {});

      return success(res, `Successfully retrieved all shopToBrands`, {
        shopToBrands
      });
    } catch (e) {
      console.error(e);
      return error(res, e);
    }
  };

  static getAssociatedBrands = async (req, res) => {
    try {
      const { id } = req.params;

      requireProperties({ id });

      const shopToBrands = await ShopToBrand.findAll({
        where: { shopId: id }
      });
      const brands = await Promise.all(
        shopToBrands.map(async shopToBrand => {
          const { brandId } = shopToBrand;
          const brand = await Brand.findById(brandId);

          return brand;
        })
      );

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

  static associateShopWithBrand = async (req, res) => {
    try {
      const { id, brandId } = req.params;

      requireProperties({ id, brandId });

      // Does the association already exist?
      const existingShopToBrand = await ShopToBrand.findOne({
        where: { shopId: id, brandId }
      });

      console.log("Already exists", existingShopToBrand);

      if (existingShopToBrand) {
        return error(
          res,
          `Shop#${id} and Brand#${brandId} are already associated.`
        );
      }

      const association = await ShopToBrand.create({
        shopId: id,
        brandId
      });

      return success(
        res,
        `Successfully associated Shop#${id} and Brand#${brandId}.`,
        {
          association
        }
      );
    } catch (e) {
      console.error(e);
      return error(res, e);
    }
  };

  static dissociateShopWithBrand = async (req, res) => {
    try {
      const { id, brandId } = req.params;

      requireProperties({ id, brandId });

      // Does the association even exist?
      const existingShopToBrand = await ShopToBrand.findOne({
        where: { shopId: id, brandId }
      });

      if (!existingShopToBrand) {
        return error(
          res,
          `Shop#${id} and Brand#${brandId} are not associated.`
        );
      }

      await existingShopToBrand.destroy();

      return success(
        res,
        `Succesfully disassociated Shop#${id} and Brand#${brandId}.`
      );
    } catch (e) {
      console.error(e);
      return error(res, e);
    }
  };
}
