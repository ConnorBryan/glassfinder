module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      verificationCode: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      linked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: null
      }
    },
    {
      name: {
        singular: "user",
        plural: "users"
      }
    }
  );

  return User;
};
