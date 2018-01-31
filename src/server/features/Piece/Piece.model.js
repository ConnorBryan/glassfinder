export default (sequelize, DataTypes) => {
  const Piece = sequelize.define("Piece", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    maker: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    location: DataTypes.STRING
  });

  Piece.associate = models => {
    Piece.belongsTo(models.User, {
      foreignKey: "userId",
      as: "piece"
    });
  };

  return Piece;
};
