import { respondWith, requireProperties, error, success } from "./";

export default {
  create,
  read,
  update,
  remove
};

/* === */

function create(req, res, { Model, modelName, collection }) {
  return respondWith(req, async () => {
    const { config } = req.body;
    const parsedConfig = JSON.parse(config);
    const model = await Model.create(parsedConfig);

    return success(res, `Succesfully created a ${modelName}`, {
      [collection]: model
    });
  });
}

function read(req, res, { Model, modelName, collection }) {
  return respondWith(res, async () => {
    const { id } = req.params;

    if (id) {
      const model = await Model.findById(+id);

      return success(res, `Successfully retrieved ${modelName}#${id}`, {
        [collection]: model
      });
    } else {
      const models = await Model.findAll();

      return success(res, `Successfully retrieved ${modelName}s`, {
        [collection]: models
      });
    }
  });
}

function update(req, res, { Model, modelName, collection }) {
  return respondWith(res, async () => {
    const { id } = req.params;
    const { config } = req.body;

    requireProperties({ id, config });

    const parsedConfig = JSON.parse(config);
    const model = await Model.update(parsedConfig, { where: { id } });

    return success(res, `Successfully updated ${modelName}#${id}`, {
      [collection]: model
    });
  });
}

function remove(req, res, { Model, modelName }) {
  return respondWith(res, async () => {
    const { id } = req.params;

    requireProperties({ id });

    const destroyed = await Model.destroy({ where: { id } });

    return success(res, `Successfully deleted ${modelName}#${id}`, {
      destroyed
    });
  });
}
