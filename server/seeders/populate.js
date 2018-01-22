const bcrypt = require("bcrypt-nodejs");
const chance = new (require("chance"))();
const _ = require("lodash");

const constants = require("../config/constants");

module.exports = async function({
  Verbiage,
  About,
  User,
  Shop,
  Artist,
  Brand,
  Piece
}) {
  // Text for the app.
  await Verbiage.create();

  // About
  const ABOUT_ITEMS = [
    {
      image: "https://www.famousbirthdays.com/headshots/derek-jeter-9.jpg",
      name: "Derek Jeter",
      title: "Project Manager",
      description:
        "A real hard-hitter, always willing to go to bat for the team."
    },
    {
      image:
        "http://sleazeroxx.com/wp-content/uploads/Yngwie-Malmsteen-photo-e1501340474301.jpg",
      name: "Yngwie Malmsteen",
      title: "Growth Hacker",
      description:
        "Confident and ready to go, always building up the userbase and providing the metaphorical seeds for constant expansion."
    },
    {
      image: "http://connorbryan.com/images/avatar.jpg",
      name: "Connor Bryan",
      title: "Lead Developer",
      description: "A pretty good developer, I guess."
    }
  ];

  ABOUT_ITEMS.forEach(async about => await About.create(about));

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
    const imageSeed = chance.integer({ min: 1, max: 5 });
    const shop = await user.linkAs(
      constants.LINK_TYPES.SHOP,
      {
        name: chance.word(),
        image: `/examples/shop${imageSeed}.jpg`,
        description: chance.paragraph(),
        email: chance.email(),
        phone: `${chance.integer({ min: 100, max: 999 })}-${chance.integer({
          min: 100,
          max: 999
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
      const imageSeed = chance.integer({ min: 1, max: 5 });

      await Piece.create({
        name: chance.word(),
        image: `/examples/piece${imageSeed}.jpg`,
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
