export default (sequelize, DataTypes) => {
  const Brand = sequelize.define("Brand", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    from: DataTypes.STRING,
    site: DataTypes.STRING
  });

  Brand.associate = models => {
    Brand.belongsTo(models.User, {
      foreignKey: "userId",
      as: "brand"
    });
  };

  return Brand;
};
