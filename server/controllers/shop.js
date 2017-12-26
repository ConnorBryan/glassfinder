const { Shop } = require("../models");

module.exports = {
  read: async (req, res) => {
    try {
      const shops = await Shop.all();

      res.json({
        success: true,
        shops
      });
    } catch (e) {
      console.error(e);

      res.json({
        success: false,
        error: e.toString()
      });
    }
  }
};
