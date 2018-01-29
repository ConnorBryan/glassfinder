const { respondWith, success } = require("../../util");
const { Verbiage } = require("../../models");

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
