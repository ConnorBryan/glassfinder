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

    switch (type) {
      case constants.LINK_TYPES.SHOP:
        const associate = associateShop.bind(this);

        return await associate(config, model);
      default:
        break;
    }
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
