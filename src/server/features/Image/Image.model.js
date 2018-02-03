export default (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
    path: DataTypes.STRING
  });

  return Image;
};
