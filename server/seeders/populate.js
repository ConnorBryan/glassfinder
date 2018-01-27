const bcrypt = require("bcrypt-nodejs");
const chance = new (require("chance"))();
const _ = require("lodash");

const constants = require("../config/constants");

const sleep = ms => new Promise(r => setTimeout(r, ms));

module.exports = async function({
  User,
  Shop,
  Artist,
  Brand,
  Piece,
  Verbiage,
  About,
  Help,
  Update
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

  // Help
  const HELP_ITEMS = [
    {
      title: "Exploring shops",
      content: `
        <ul>
          <li>
            Click for the "Explore" dropdown in the navigation bar.
          </li>
          <li>
            Select "Shops" from the dropdown menu.
          </li>
          <li>
            The map shows all nearby shops that are registered with Glassfinder.
          </li>
          <li>
            Below the map, a more detailed list of shops are presented.
          </li>
          <li>
            To change the look and feel of the shop viewer, click the "Viewing as _" dropdown on the menu bar.
          </li>
          <li>
            To view the shops in a different order, select an option underneath the "Sort by" dropdown.
          </li>
          <li>
            The transporter in the middle of the menu can be used go go back and forth between pages of shops.
          </li>
        </ul>
      `
    },
    {
      title: "Exploring artists",
      content: `
        <ul>
          <li>
            Click for the "Explore" dropdown in the navigation bar.
          </li>
          <li>
            Select "Artists" from the dropdown menu.
          </li>
          <li>
            A detailed list of artists is presented.
          </li>
          <li>
            To change the look and feel of the artist viewer, click the "Viewing as _" dropdown on the menu bar.
          </li>
          <li>
            To view the artists in a different order, select an option underneath the "Sort by" dropdown.
          </li>
          <li>
            The transporter in the middle of the menu can be used go go back and forth between pages of artists.
          </li>
        </ul>
      `
    },
    {
      title: "Exploring brands",
      content: `
        <ul>
          <li>
            Click for the "Explore" dropdown in the navigation bar.
          </li>
          <li>
            Select "Brands" from the dropdown menu.
          </li>
            A detailed list of brands is presented.
          </li>
          <li>
            To change the look and feel of the brand viewer, click the "Viewing as _" dropdown on the menu bar.
          </li>
          <li>
            To view the brands in a different order, select an option underneath the "Sort by" dropdown.
          </li>
          <li>
            The transporter in the middle of the menu can be used go go back and forth between pages of brands.
          </li>
        </ul>
      `
    },
    {
      title: "Exploring pieces",
      content: `
        <ul>
          <li>
            Click for the "Explore" dropdown in the navigation bar.
          </li>
          <li>
            Select "Pieces" from the dropdown menu.
          </li>
          <li>
            A detailed list of pieces is presented.
          </li>
          <li>
            To change the look and feel of the piece viewer, click the "Viewing as _" dropdown on the menu bar.
          </li>
          <li>
            To view the pieces in a different order, select an option underneath the "Sort by" dropdown.
          </li>
          <li>
            The transporter in the middle of the menu can be used go go back and forth between pages of pieces.
          </li>
        </ul>
      `
    }
  ];

  HELP_ITEMS.forEach(async help => await Help.create(help));

  // Updates
  const UPDATE_ITEMS = [
    {
      image:
        "https://at-cdn-s01.audiotool.com/2013/03/06/documents/rVR63IUyL2n6ZQeScApwFDJLmztFkJ/0/cover256x256-c5f1e039e12d4009bd2e1b5919e3425a.jpg",
      title: "Developing is moving quickly",
      content: `
        <p>Things are moving quickly.</p>
      `,
      author: "Connor Bryan"
    },
    {
      image: "https://www.usnews.com/img/college-photo_1185_256x256mm.jpg",
      title: "Went to San Francisco",
      content: `
        <p>What a neat city.</p>
      `,
      author: "Connor Bryan"
    }
  ];

  UPDATE_ITEMS.forEach(async update => {
    await Update.create(update);
    await sleep(1000);
  });

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
  // _.times(constants.POPULATION_COUNT, async () => {
  //   const user = await User.create({
  //     email: chance.email(),
  //     password: await createSafePassword(constants.DEFAULT_PASSWORD),
  //     verified: false,
  //     verificationCode: chance.string({ length: 64 }),
  //     linked: false,
  //     type: null,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   });
  // });

  // Verified.
  // _.times(constants.POPULATION_COUNT, async () => {
  //   const user = await User.create({
  //     email: chance.email(),
  //     password: await createSafePassword(constants.DEFAULT_PASSWORD),
  //     verified: true,
  //     verificationCode: null,
  //     linked: false,
  //     type: null,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   });
  // });

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
  // _.times(constants.POPULATION_COUNT, async () => {
  //   const user = await User.create({
  //     email: chance.email(),
  //     password: await createSafePassword(constants.DEFAULT_PASSWORD),
  //     verified: true,
  //     verificationCode: null,
  //     linked: false,
  //     type: null,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   });

  //   const artist = await user.linkAs(
  //     constants.LINK_TYPES.ARTIST,
  //     {
  //       name: chance.name(),
  //       image: constants.PLACEHOLDER_IMAGE,
  //       description: chance.paragraph(),
  //       from: `${chance.city()}, ${chance.state()}`
  //     },
  //     Artist
  //   );

  //   _.times(constants.PIECE_COUNT, async () => {
  //     await Piece.create({
  //       name: chance.word(),
  //       image: constants.PLACEHOLDER_IMAGE,
  //       description: chance.paragraph(),
  //       maker: artist.name,
  //       price: chance.floating({ min: 5, max: 5000, fixed: 2 }),
  //       location: `${chance.city()}, ${chance.state()}`,
  //       userId: user.id
  //     });
  //   });
  // });

  // Brands
  // _.times(constants.POPULATION_COUNT, async () => {
  //   const user = await User.create({
  //     email: chance.email(),
  //     password: await createSafePassword(constants.DEFAULT_PASSWORD),
  //     verified: true,
  //     verificationCode: null,
  //     linked: false,
  //     type: null,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   });

  //   await user.linkAs(
  //     constants.LINK_TYPES.BRAND,
  //     {
  //       name: chance.word(),
  //       image: constants.PLACEHOLDER_IMAGE,
  //       description: chance.paragraph(),
  //       from: `${chance.city()}, ${chance.state()}`,
  //       site: constants.PLACEHOLDER_SITE
  //     },
  //     Brand
  //   );
  // });
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
