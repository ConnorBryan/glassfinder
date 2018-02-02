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

export const fancy = `style="text-transform:uppercase; letter-spacing: 0.25rem"`;
export const spacer = `style="margin: 0 1rem 1 0rem"`;
export const slightlyBiggerText = `style="font-size: 1.2rem"`;
export const glassfinder = `
<h1>
  <span ${fancy}>GLASSFINDER</span> <span ${spacer}>|</span> Paraphernalia, revolutionized.
</h1>
`;

export default nodemailer.createTransport(authSettings);
