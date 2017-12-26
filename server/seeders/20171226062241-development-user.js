const chance = new (require("chance"))();

const { createSafePassword } = require("../config/passport");

const TOTAL_TIMES = 10;
const DEFAULT_PASSWORD = "111111";

const generateUsers = async (users = [], times = 0) => {
  if (times === TOTAL_TIMES) return users;

  users.push({
    email: chance.email(),
    password: await createSafePassword(DEFAULT_PASSWORD),
    verified: true,
    verificationCode: null,
    linked: false,
    type: null,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return await generateUsers(users, times + 1);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", await generateUsers(), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
