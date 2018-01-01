module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  BUCKET: process.env.BUCKET,
  SPACES_ENDPOINT: process.env.SPACES_ENDPOINT,
  SPACES_URL: process.env.SPACES_URL,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  LINK_TYPES: {
    SHOP: "SHOP",
    ARTIST: "ARTIST",
    BRAND: "BRAND"
  },
  PLACEHOLDER_IMAGE: "https://placehold.it/400x400",
  PLACEHOLDER_SITE: "https://google.com",
  MODEL_READ_LIMIT: 6,
  POPULATION_COUNT: 3,
  PIECE_COUNT: 3,
  DEFAULT_PASSWORD: "111111"
};
