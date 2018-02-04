import * as config from "../../config";

export default {
  development: {
    username: config.DATABASE_DEVELOPMENT_USERNAME,
    password: config.DATABASE_DEVELOPMENT_PASSWORD,
    database: config.DATABASE_DEVELOPMENT_DATABASE,
    host: config.DATABASE_DEVELOPMENT_HOST,
    port: config.DATABASE_DEVELOPMENT_PORT,
    dialect: config.DATABASE_DEVELOPMENT_DIALECT
  },
  test: {
    username: config.DATABASE_TEST_USERNAME,
    password: config.DATABASE_TEST_PASSWORD,
    database: config.DATABASE_TEST_DATABASE,
    host: config.DATABASE_TEST_HOST,
    port: config.DATABASE_TEST_PORT,
    dialect: config.DATABASE_TEST_DIALECT
  },
  production: {
    username: config.DATABASE_PRODUCTION_USERNAME,
    password: config.DATABASE_PRODUCTION_PASSWORD,
    database: config.DATABASE_PRODUCTION_DATABASE,
    host: config.DATABASE_PRODUCTION_HOST,
    port: config.DATABASE_PRODUCTION_PORT,
    dialect: config.DATABASE_PRODUCTION_DIALECT
  }
};
