const { About } = require("../models");
const { respondWith, requireProperties, error, success } = require("../util");

module.exports = {
  create,
  read,
  update,
  remove
};

/* === */

function create(req, res) {
  return respondWith(req, async () => {
    const { config } = req.body;
    const about = await About.create(config);

    return success(res, `Succesfully created a Model`);
  });
}

/**
 * @func read
 * @desc Provides either a single or multiple instances of Model.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<Model>}
 */
function read(req, res) {
  return respondWith(res, async () => {
    const about = await About.findAll();

    return success(res, `Successfully retrieved Models`, {
      about
    });
  });
}

function update(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;
    const { config } = req.body;

    requireProperties({ id, config });

    const parsedConfig = JSON.parse(config);
    const about = await About.update(parsedConfig, { where: { id } });

    return success(res, `Successfully updated Model#${id}`, {
      about
    });
  });
}

function remove(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;

    requireProperties({ id });

    const destroyed = await About.destroy({ where: { id } });

    return success(res, `Successfully deleted Model#${id}`, {
      destroyed
    });
  });
}
