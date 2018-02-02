import { chunk } from "lodash";

import * as config from "../../config";
import { respondWith, error, success, requireProperties } from "../../util";
import models from "../database/models";

const { Shop, Artist } = models;

export const genericSortedRead = (req, res, Model, resource) => {
  return respondWith(res, async () => {
    const { page = 0, sort = config.SORT_DATE_ASCENDING } = req.query;

    const sorts = {
      [config.SORT_DATE_ASCENDING]: ["createdAt", "ASC"],
      [config.SORT_DATE_DESCENDING]: ["createdAt", "DESC"],
      [config.SORT_NAME_ASCENDING]: ["name", "ASC"],
      [config.SORT_NAME_DESCENDING]: ["name", "DESC"]
    };

    const models = await Model.findAll({
      order: [sorts[sort]]
    });
    const modelPages = chunk(models, config.MODEL_READ_LIMIT);
    const currentPage = modelPages[page];

    return success(res, `Succesfully fetched sorted ${resource}`, {
      page: currentPage,
      totalPages: modelPages.length,
      perPage: config.MODEL_READ_LIMIT
    });
  });
};

export const genericPaginatedRead = (req, res, Model, singular, plural) => {
  return respondWith(res, async () => {
    const { id } = req.params;
    const { userId, type } = req.query;
    const modelType = capitalize(singular);

    if (id) {
      // Fetch one.
      const model = await Model.findById(id);

      if (!model) {
        return error(res, `${modelType}#${id} does not exist`);
      }

      return success(res, `Successfully retrieved ${modelType}#${id}`, {
        [singular]: model
      });
    } else {
      // Fetch multiple.
      const page = req.query.page ? +req.query.page : 0;
      const limit = config.MODEL_READ_LIMIT;
      const offset = page * limit;
      const searchSettings = {
        offset,
        limit,
        $sort: { id: 1 }
      };

      // Ugh. Hacks.
      // Only "Shops" and "Artists" can have pieces,
      // so when userId is present translate that to ShopId / ArtistId.
      if (userId) {
        const modelMap = {
          SHOP: Shop,
          ARTIST: Artist
        };
        const Model = modelMap[type];
        const { userId: actualUserId } = await Model.findOne({
          where: { id: userId }
        });

        searchSettings.where = { userId: actualUserId };
      }

      const { count, rows: models } = await Model.findAndCountAll(
        searchSettings
      );
      const pages = Math.ceil(count / limit);

      return success(res, `Successfully retrieved ${plural}`, {
        count,
        pages,
        perPage: config.MODEL_READ_LIMIT,
        [plural]: models
      });
    }
  });
};

export const genericReadAll = (req, res, Model, plural) => {
  return respondWith(res, async () => {
    const collection = await Model.findAll();

    return success(res, `Successfully fetched all ${plural}`, {
      collection
    });
  });
};

export const genericRemove = (req, res, Model, singular) => {
  return respondWith(res, async () => {
    const { id } = req.params;

    requireProperties({ id });

    await Model.destroy({ where: { id } });

    return success(res, `Successfully deleted ${capitalize(singular)}#${id}`);
  });
};

export function capitalize(string) {
  return string
    .split("")
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join("");
}
