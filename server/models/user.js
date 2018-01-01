const constants = require("../config/constants");
const db = require("./index");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    verificationCode: DataTypes.STRING,
    linked: DataTypes.BOOLEAN,
    type: DataTypes.STRING
  });

  User.prototype.linkAs = async function(type, config = {}) {
    if (!constants.LINK_TYPES[type])
      throw Error(`Type ${type} is an invalid link type.`);

    let associate = () => {};

    switch (type) {
      case constants.LINK_TYPES.SHOP:
        associate = associateShop.bind(this, config, sequelize.model("Shop"));
        break;
      case constants.LINK_TYPES.ARTIST:
        associate = associateArtist.bind(
          this,
          config,
          sequelize.model("Artist")
        );
        break;
      case constants.LINK_TYPES.BRAND:
        associate = associateBrand.bind(this, config, sequelize.model("Brand"));
      default:
        break;
    }

    return await associate();
  };

  User.prototype.fetchLink = async function() {
    const { id: userId, linked, type } = this;

    if (!linked || !type)
      throw Error(`Cannot fetchLink on a user with no type or link`);

    const models = {
      [constants.LINK_TYPES.SHOP]: sequelize.model("Shop"),
      [constants.LINK_TYPES.ARTIST]: sequelize.model("Artist"),
      [constants.LINK_TYPES.BRAND]: sequelize.model("Brand")
    };
    const Model = models[type];

    return await Model.findOne({ where: { userId } });
  };

  return User;
};

/* === */

async function associateShop(config, Shop) {
  try {
    const shop = await Shop.create(Object.assign(config, { userId: this.id }));
    this.linked = true;
    this.type = constants.LINK_TYPES.SHOP;

    await this.save();

    return shop;
  } catch (e) {
    console.error(e);

    return false;
  }
}

async function associateArtist(config, Artist) {
  try {
    const artist = await Artist.create(
      Object.assign(config, { userId: this.id })
    );
    this.linked = true;
    this.type = constants.LINK_TYPES.ARTIST;

    await this.save();

    return artist;
  } catch (e) {
    console.error(e);

    return false;
  }
}

async function associateBrand(config, Brand) {
  try {
    const brand = await Brand.create(
      Object.assign(config, { userId: this.id })
    );
    this.linked = true;
    this.type = constants.LINK_TYPES.BRAND;

    await this.save();

    return brand;
  } catch (e) {
    console.error(e);

    return false;
  }
}
