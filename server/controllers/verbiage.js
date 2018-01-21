const { Verbiage } = require("../models");
const { respondWith, success } = require("../util");

module.exports = {
  read
};

/* === */

function read(req, res) {
  return respondWith(res, async () => {
    const verbiage = await Verbiage.findOne({ where: { id: 1 } });

    return success(res, `Successfully fetched verbiage`, {
      verbiage
    });
  });
}
