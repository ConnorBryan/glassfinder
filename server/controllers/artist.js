const { Artist } = require("../models");

module.exports = {
  read: async (req, res) => {
    try {
      const artists = await Artist.all();

      res.json({
        success: true,
        artists
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
