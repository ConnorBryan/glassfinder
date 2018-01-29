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
    Updates_postedBy: {
      type: DataTypes.STRING,
      defaultValue: "Posted by"
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
    },

    // # Account Screens

    // ## MyAccount
    MyAccount_title: {
      type: DataTypes.STRING,
      defaultValue: "My account"
    },
    MyAccount_description: {
      type: DataTypes.STRING,
      defaultValue: "Make changes to your account and stay up to date."
    },
    MyAccount_basicsTitle: {
      type: DataTypes.STRING,
      defaultValue: "Basics"
    },
    MyAccount_updatePassword: {
      type: DataTypes.STRING,
      defaultValue: "Update password"
    },
    MyAccount_linkAccountTitle: {
      type: DataTypes.STRING,
      defaultValue: "Link account"
    },
    MyAccount_becomeAShop: {
      type: DataTypes.STRING,
      defaultValue: "Become a shop"
    },
    MyAccount_becomeAnArtist: {
      type: DataTypes.STRING,
      defaultValue: "Become an artist"
    },
    MyAccount_becomeABrand: {
      type: DataTypes.STRING,
      defaultValue: "Become a brand"
    },
    MyAccount_shopOptionsTitle: {
      type: DataTypes.STRING,
      defaultValue: "Manage shop profile"
    },
    MyAccount_updateShopInformation: {
      type: DataTypes.STRING,
      defaultValue: "Update shop information"
    },
    MyAccount_uploadImage: {
      type: DataTypes.STRING,
      defaultValue: "Upload image"
    },
    MyAccount_viewMyPieces: {
      type: DataTypes.STRING,
      defaultValue: "View my pieces"
    },
    MyAccount_artistOptionsTitle: {
      type: DataTypes.STRING,
      defaultValue: "Manage artist profile"
    },
    MyAccount_updateArtistInformation: {
      type: DataTypes.STRING,
      defaultValue: "Update artist information"
    },
    MyAccount_brandOptionsTitle: {
      type: DataTypes.STRING,
      defaultValue: "Manage brand profile"
    },
    MyAccount_updateBrandInformation: {
      type: DataTypes.STRING,
      defaultValue: "Update brand information"
    },
    MyAccount_uploadCatalog: {
      type: DataTypes.STRING,
      defaultValue: "Upload catalog"
    },

    // ## UpdatePassword
    UpdatePassword_title: {
      type: DataTypes.STRING,
      defaultValue: "Update password"
    },
    UpdatePassword_description: {
      type: DataTypes.STRING,
      defaultValue: "Change your password often for increased security."
    },

    // ## BecomeAShop
    BecomeAShop_title: {
      type: DataTypes.STRING,
      defaultValue: "Become a shop"
    },
    BecomeAShop_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Advertise your location and your pieces to the entire Glassfinder network."
    },

    // ## BecomeAnArtist
    BecomeAnArtist_title: {
      type: DataTypes.STRING,
      defaultValue: "Become an artist"
    },
    BecomeAnArtist_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Show off your creativity and crafty skills while earning money and growing your reputation."
    },

    // ## BecomeABrand
    BecomeABrand_title: {
      type: DataTypes.STRING,
      defaultValue: "Become a brand"
    },
    BecomeABrand_description: {
      type: DataTypes.STRING,
      defaultValue: "Upload your catalog and increase your online presence."
    },

    // ## UpdateShopInformation
    UpdateShopInformation_title: {
      type: DataTypes.STRING,
      defaultValue: "Update shop information"
    },
    UpdateShopInformation_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Keep this information up to date to make it easier for your customers to stay in the loop."
    },

    // ## UpdateArtistInformation
    UpdateArtistInformation_title: {
      type: DataTypes.STRING,
      defaultValue: "Update artist information"
    },
    UpdateArtistInformation_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Keep this information up to date to make it easier for your fans to stay in the loop."
    },

    // ## UpdateBrandInformation
    UpdateBrandInformation_title: {
      type: DataTypes.STRING,
      defaultValue: "Update brand information"
    },
    UpdateBrandInformation_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Keep this information up to date to make it easier for your fans to stay in the loop."
    },

    // ## UploadImage
    UploadImage_title: {
      type: DataTypes.STRING,
      defaultValue: "Upload image"
    },
    UploadImage_description: {
      type: DataTypes.STRING,
      defaultValue: "Show the world what you've got."
    },
    UploadImage_yourCurrentImage: {
      type: DataTypes.STRING,
      defaultValue: "Your current image"
    },
    UploadImage_send: {
      type: DataTypes.STRING,
      defaultValue: "Send"
    },

    // ## UploadPiece
    UploadPiece_title: {
      type: DataTypes.STRING,
      defaultValue: "Upload piece"
    },
    UploadPiece_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Add to your online collection and allow potential customers the ability to view what you have to offer."
    },

    // ## ViewMyPieces
    ViewMyPieces_title: {
      type: DataTypes.STRING,
      defaultValue: "View my pieces"
    },
    ViewMyPieces_description: {
      type: DataTypes.STRING,
      defaultValue: "Check out what you've already uploaded to the network."
    },
    ViewMyPieces_confirmRemoval: {
      type: DataTypes.STRING,
      defaultValue:
        "Are you sure you want to remove this piece?\nThis cannot be undone."
    },
    ViewMyPieces_unableToRemove: {
      type: DataTypes.STRING,
      defaultValue: "The piece was unable to be removed.\nTry again later."
    },
    ViewMyPieces_madeBy: {
      type: DataTypes.STRING,
      defaultValue: "Made by"
    },
    ViewMyPieces_locatedAt: {
      type: DataTypes.STRING,
      defaultValue: "Located at"
    },
    ViewMyPieces_uploadImage: {
      type: DataTypes.STRING,
      defaultValue: "Upload image"
    },
    ViewMyPieces_editPiece: {
      type: DataTypes.STRING,
      defaultValue: "Edit piece"
    },
    ViewMyPieces_removePiece: {
      type: DataTypes.STRING,
      defaultValue: "Remove piece"
    },

    // ## UploadPieceImage
    UploadPieceImage_title: {
      type: DataTypes.STRING,
      defaultValue: "Upload piece image"
    },
    UploadPieceImage_description: {
      type: DataTypes.STRING,
      defaultValue:
        "A good picture is the difference between a sale and a missed opportunity."
    },
    UploadPieceImage_currentImage: {
      type: DataTypes.STRING,
      defaultValue: "current image"
    },
    UploadPieceImage_uploadLabel: {
      type: DataTypes.STRING,
      defaultValue: "Upload image"
    },
    UploadPieceImage_send: {
      type: DataTypes.STRING,
      defaultValue: "Send"
    },
    UploadPieceImage_reset: {
      type: DataTypes.STRING,
      defaultValue: "Reset"
    },

    // ## UpdatePieceInformation
    UpdatePieceInformation_title: {
      type: DataTypes.STRING,
      defaultValue: "Update piece information"
    },
    UpdatePieceInformation_description: {
      type: DataTypes.STRING,
      defaultValue:
        "Keep your pieces up to date with the correct pricing, condition, and location."
    }
  });

  return Verbiage;
};
