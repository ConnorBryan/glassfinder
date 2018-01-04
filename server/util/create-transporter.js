const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");

const constants = require("../config/constants");

const auth = {
  auth: {
    api_key: constants.MAILGUN_API_KEY,
    domain: constants.MAILGUN_DOMAIN
  }
};
const authSettings = mailgun(auth);

module.exports = nodemailer.createTransport(authSettings);
