export default (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    street: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE
  });

  Shop.associate = models => {
    Shop.belongsTo(models.User, {
      foreignKey: "userId",
      as: "shop"
    });
  };

  return Shop;
};
