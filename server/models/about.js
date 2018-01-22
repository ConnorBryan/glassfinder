module.exports = (sequelize, DataTypes) => {
  const About = sequelize.define("About", {
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });

  return About;
};
