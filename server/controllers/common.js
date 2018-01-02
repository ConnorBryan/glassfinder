const constants = require("../config/constants");

async function genericPaginatedRead(req, res, Model, singular, plural) {
  try {
    const id = req.params.id;

    if (id) {
      // Fetch one.
      const model = await Model.findById(id);

      return res.json({
        success: true,
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

      return res.json({
        success: true,
        count,
        pages,
        [plural]: models
      });
    }
  } catch (e) {
    return res.json({
      success: false,
      error: e.toString()
    });
  }
}

module.exports = { genericPaginatedRead };
