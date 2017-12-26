const constants = require("../config/constants.json");
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

  User.prototype.linkAs = async function(type, config = {}, model) {
    if (!constants.LINK_TYPES[type])
      throw Error(`Type ${type} is an invalid link type.`);

    let associate = () => {};

    switch (type) {
      case constants.LINK_TYPES.SHOP:
        associate = associateShop.bind(this);
        break;
      case constants.LINK_TYPES.ARTIST:
        associate = associateArtist.bind(this);
        break;
      default:
        break;
    }

    return await associate(config, model);
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
