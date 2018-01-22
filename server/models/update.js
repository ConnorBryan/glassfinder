module.exports = (sequelize, DataTypes) => {
  const Update = sequelize.define("Update", {
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    author: DataTypes.STRING
  });

  return Update;
};
