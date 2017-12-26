module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define("Artist", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    from: DataTypes.STRING
  });

  Artist.associate = models => {
    Artist.belongsTo(models.User, {
      foreignKey: "userId",
      as: "artist"
    });
  };

  return Artist;
};
