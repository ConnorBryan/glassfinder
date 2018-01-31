export default (sequelize, DataTypes) => {
  const Help = sequelize.define("Help", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  });

  return Help;
};
