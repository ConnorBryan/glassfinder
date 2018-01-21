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
        "High quality vendors with tons of items in their great selections."
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
        "Talented invidiuals making the world a better place through their creative abilities."
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
        "Manufacturers with a passion for the industry and catalogs full of must-have pieces."
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
      defaultValue: "Beautiful, intricate designs with form and function."
    },
    Home_pieceFeatureButton: {
      type: DataTypes.STRING,
      defaultValue: "Explore pieces"
    },

    // ## About
    About_title: {
      type: DataTypes.STRING,
      defaultValue: "Our team"
    },
    About_description: {
      type: DataTypes.STRING,
      defaultValue:
        "We're a strong willed group of individuals with a mission to revolutionize the headshop industry."
    },

    // ## Help
    Help_title: {
      type: DataTypes.STRING,
      defaultValue: "Help topics"
    },
    Help_description: {
      type: DataTypes.STRING,
      defaultValue:
        "We strive to keep our platform easy to use, but sometimes you need to know more."
    },

    // ## Updates
    Updates_title: {
      type: DataTypes.STRING,
      defaultValue: "Latest updates"
    },
    Updates_description: {
      type: DataTypes.STRING,
      defaultValue: "Here's what's been going on at Glassfinder recently."
    },

    // ## Contact
    Contact_title: {
      type: DataTypes.STRING,
      defaultValue: "Get in touch"
    },
    Contact_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Send us a message and let us know how we're doing, or request some help."
    },

    // ## Sign in
    Signin_title: {
      type: DataTypes.STRING,
      defaultValue: "Welcome back"
    },
    Signin_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Sign in to access your account and interact with your slice of the platform."
    },

    // ## Sign in
    Signup_title: {
      type: DataTypes.STRING,
      defaultValue: "Create an account"
    },
    Signup_description: {
      type: DataTypes.STRING,
      defaultValue:
        "You're a few seconds away from unlocking a new world of features."
    },

    // # Feature Screens

    // ## Shops
    ExploreShops_title: {
      type: DataTypes.STRING,
      defaultValue: "Explore shops"
    },
    ExploreShops_description: {
      type: DataTypes.STRING,
      defaultValue:
        "High quality vendors with tons of items in their great selections."
    },

    // ## Artists
    ExploreArtists_title: {
      type: DataTypes.STRING,
      defaultValue: "Explore artists"
    },
    ExploreArtists_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Talented invidiuals making the world a better place through their creative abilities."
    },

    // ## Brands
    ExploreBrands_title: {
      type: DataTypes.STRING,
      defaultValue: "Explore brands"
    },
    ExploreBrands_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Manufacturers with a passion for the industry and catalogs full of must-have pieces."
    },

    // ## Pieces
    ExplorePieces_title: {
      type: DataTypes.STRING,
      defaultValue: "Explore pieces"
    },
    ExplorePieces_description: {
      type: DataTypes.STRING,
      defaultValue: "Beautiful, intricate designs with form and function."
    }
  });

  return Verbiage;
};
