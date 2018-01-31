import nodemailer from "nodemailer";
import mailgun from "nodemailer-mailgun-transport";

import * as config from "../config";

const auth = {
  auth: {
    api_key: config.MAILGUN_API_KEY,
    domain: config.MAILGUN_DOMAIN
  }
};
const authSettings = mailgun(auth);

export default nodemailer.createTransport(authSettings);
