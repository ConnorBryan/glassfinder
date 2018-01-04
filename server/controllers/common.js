const constants = require("../config/constants");
const { respondWith, error, success } = require("../util");

function genericPaginatedRead(req, res, Model, singular, plural) {
  return respondWith(res, async () => {
    const id = req.params.id;
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
      const { count, rows: models } = await Model.findAndCountAll({
        offset,
        limit,
        $sort: { id: 1 }
      });
      const pages = Math.ceil(count / limit);

      return success(res, `Successfully retrieved ${plural}`, {
        count,
        pages,
        [plural]: models
      });
    }
  });
}

module.exports = { genericPaginatedRead };

/* === */

function capitalize(string) {
  return string
    .split("")
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join("");
}
