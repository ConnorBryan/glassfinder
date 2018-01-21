module.exports = (Sequelize, DataTypes) => {
  const Verbiage = Sequelize.define("Verbiage", {
    // # Basic Screens

    // ## Home
    Home_tagline: {
      type: DataTypes.STRING,
      defaultValue: "Paraphernalia, revolutionized."
    },
    Home_subTagline: {
      type: DataTypes.STRING,
      defaultValue: "Welcome to the new way of lightning up."
    },
    Home_getStartedButton: {
      type: DataTypes.STRING,
      defaultValue: "Get started"
    },
    Home_shopFeatureHeader: {
      type: DataTypes.STRING,
      defaultValue: "Shops"
    },
    Home_shopFeatureDescription: {
      type: DataTypes.STRING,
      defaultValue:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse."
    },
    Home_shopFeatureButton: {
      type: DataTypes.STRING,
      defaultValue: "Explore shops"
    },
    Home_artistFeatureHeader: {
      type: DataTypes.STRING,
      defaultValue: "Artists"
    },
    Home_artistFeatureDescription: {
      type: DataTypes.STRING,
      defaultValue:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse."
    },
    Home_artistFeatureButton: {
      type: DataTypes.STRING,
      defaultValue: "Explore artists"
    },
    Home_brandFeatureHeader: {
      type: DataTypes.STRING,
      defaultValue: "Brands"
    },
    Home_brandFeatureDescription: {
      type: DataTypes.STRING,
      defaultValue:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse."
    },
    Home_brandFeatureButton: {
      type: DataTypes.STRING,
      defaultValue: "Explore brands"
    },
    Home_pieceFeatureHeader: {
      type: DataTypes.STRING,
      defaultValue: "Pieces"
    },
    Home_pieceFeatureDescription: {
      type: DataTypes.STRING,
      defaultValue:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse."
    },
    Home_pieceFeatureButton: {
      type: DataTypes.STRING,
      defaultValue: "Explore pieces"
    }
  });

  return Verbiage;
};
