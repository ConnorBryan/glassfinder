export default (sequelize, DataTypes) => {
  const Piece = sequelize.define("Piece", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    location: DataTypes.STRING,
    artistEntry: DataTypes.STRING,
    brandEntry: DataTypes.STRING
  });

  Piece.associate = models => {
    Piece.belongsTo(models.User, {
      foreignKey: "userId",
      as: "piece"
    });
    Piece.belongsTo(models.Artist, {
      foreignKey: "artistId",
      as: "artist"
    });
    Piece.belongsTo(models.Brand, {
      foreignKey: "brandId",
      as: "brand"
    });
  };

  return Piece;
};
