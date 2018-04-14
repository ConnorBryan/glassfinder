export default (sequelize, DataTypes) => {
  const ShopToBrand = sequelize.define("ShopToBrand", {
    shopId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER
  });

  return ShopToBrand;
};
