const bcrypt = require("bcrypt-nodejs");
const chance = new (require("chance"))();
const _ = require("lodash");

const constants = require("../config/constants.json");

module.exports = async function({ User, Shop, Artist, Brand, Piece }) {
  /*
    Generate each type of user:
      * Unverified users.        [user@user.com / 111111]
      * Verified users.          [vuser@vuser.com / 111111]
      * Users linked as shop.    [shop@shop.com / 111111]
      * Users linked as artist.  [artist@artist.com / 111111]
      * Users linked as brand.   [brand@brand.com / 111111]

    For each linked user, generate pieces.
  */

  // Unverified.
  _.times(constants.POPULATION_COUNT, async () => {
    const user = await User.create({
      email: chance.email(),
      password: await createSafePassword(constants.DEFAULT_PASSWORD),
      verified: false,
      verificationCode: chance.string({ length: 64 }),
      linked: false,
      type: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });

  // Verified.
  _.times(constants.POPULATION_COUNT, async () => {
    const user = await User.create({
      email: chance.email(),
      password: await createSafePassword(constants.DEFAULT_PASSWORD),
      verified: true,
      verificationCode: null,
      linked: false,
      type: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });

  // Shops
  _.times(constants.POPULATION_COUNT, async () => {
    const user = await User.create({
      email: chance.email(),
      password: await createSafePassword(constants.DEFAULT_PASSWORD),
      verified: true,
      verificationCode: null,
      linked: false,
      type: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const shop = await user.linkAs(
      constants.LINK_TYPES.SHOP,
      {
        name: chance.word(),
        image: constants.PLACEHOLDER_IMAGE,
        description: chance.paragraph(),
        email: chance.email(),
        phone: `${chance.integer({ min: 1000, max: 9999 })}-${chance.integer({
          min: 1000,
          max: 9999
        })}-${chance.integer({ min: 1000, max: 9999 })}`,
        street: chance.street(),
        city: chance.city(),
        state: chance.state(),
        zip: chance.zip(),
        lat: chance.latitude(),
        lng: chance.longitude()
      },
      Shop
    );

    _.times(constants.PIECE_COUNT, async () => {
      await Piece.create({
        name: chance.word(),
        image: constants.PLACEHOLDER_IMAGE,
        description: chance.paragraph(),
        maker: shop.name,
        price: chance.floating({ min: 5, max: 5000, fixed: 2 }),
        location: `${chance.city()}, ${chance.state()}`,
        userId: user.id
      });
    });
  });

  // Artists
  _.times(constants.POPULATION_COUNT, async () => {
    const user = await User.create({
      email: chance.email(),
      password: await createSafePassword(constants.DEFAULT_PASSWORD),
      verified: true,
      verificationCode: null,
      linked: false,
      type: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const artist = await user.linkAs(
      constants.LINK_TYPES.ARTIST,
      {
        name: chance.name(),
        image: constants.PLACEHOLDER_IMAGE,
        description: chance.paragraph(),
        from: `${chance.city()}, ${chance.state()}`
      },
      Artist
    );

    _.times(constants.PIECE_COUNT, async () => {
      await Piece.create({
        name: chance.word(),
        image: constants.PLACEHOLDER_IMAGE,
        description: chance.paragraph(),
        maker: artist.name,
        price: chance.floating({ min: 5, max: 5000, fixed: 2 }),
        location: `${chance.city()}, ${chance.state()}`,
        userId: user.id
      });
    });
  });

  // Brands
  _.times(constants.POPULATION_COUNT, async () => {
    const user = await User.create({
      email: chance.email(),
      password: await createSafePassword(constants.DEFAULT_PASSWORD),
      verified: true,
      verificationCode: null,
      linked: false,
      type: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await user.linkAs(
      constants.LINK_TYPES.BRAND,
      {
        name: chance.word(),
        image: constants.PLACEHOLDER_IMAGE,
        description: chance.paragraph(),
        from: `${chance.city()}, ${chance.state()}`,
        site: constants.PLACEHOLDER_SITE
      },
      Brand
    );
  });
};

async function createSafePassword(password) {
  return new Promise((resolve, reject) => {
    return bcrypt.genSalt(constants.SALT_ROUNDS, (err, salt) => {
      if (err) return reject(err);

      return bcrypt.hash(password, salt, null, (err, hash) => {
        return err ? reject(err) : resolve(hash);
      });
    });
  });
}
