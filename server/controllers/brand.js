const { Brand } = require("../models");

module.exports = {
  read: async (req, res) => {
    try {
      const brands = await Brand.all();

      res.json({
        success: true,
        brands
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
