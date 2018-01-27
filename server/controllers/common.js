const constants = require("../config/constants");
const { respondWith, error, success } = require("../util");
const { Shop, Artist } = require("../models");

module.exports = { genericPaginatedRead, genericReadAll };

/* === */

function genericPaginatedRead(req, res, Model, singular, plural) {
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
      const limit = constants.MODEL_READ_LIMIT;
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
        perPage: constants.MODEL_READ_LIMIT,
        [plural]: models
      });
    }
  });
}

function genericReadAll(req, res, Model, plural) {
  return respondWith(res, async () => {
    const collection = await Model.findAll();

    return success(res, `Successfully fetched all ${plural}`, {
      collection
    });
  });
}

/* === */

function capitalize(string) {
  return string
    .split("")
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join("");
}
