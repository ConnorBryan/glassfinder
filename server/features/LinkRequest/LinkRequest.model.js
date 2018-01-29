module.exports = (sequelize, DataTypes) => {
  const LinkRequest = sequelize.define("LinkRequest", {
    type: DataTypes.STRING,
    config: DataTypes.JSON
  });

  LinkRequest.associate = models => {
    LinkRequest.belongsTo(models.User, {
      foreignKey: "userId",
      as: "linkRequest"
    });
  };

  return LinkRequest;
};
