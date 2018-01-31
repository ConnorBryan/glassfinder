import * as config from "../../../config";
import { respondWith, requireProperties, success } from "../../../util";
import transporter from "../../transporter";

/**
 * @func send
 * @desc Send a contact form message to the specified email address.
 * @param {ExpressRequest} req 
 * @param {ExpressRequest} res 
 */
function send(req, res) {
  return respondWith(res, async () => {
    const { name, email, message } = req.body;

    requireProperties({ name, email, message });

    const mailOptions = {
      from: config.TRANSPORTER_EMAIL_ADDRESS,
      to: config.CONTACT_EMAIL_ADDRESS,
      subject: `Contact form message from ${email}`,
      html: composeMessage(name, email, message)
    };

    const info = await sendMail(transporter, mailOptions);

    return success(res, `Successfully sent a message`);
  });
}

/* === */

/**
 * @func composeMessage
 * @desc Convenience formatter for nodemailer.
 * @param {string} name - The recipient's name
 * @param {string} email - The recipient's email address
 * @param {string} message - The recipient's comments
 * @returns {string}
 */
function composeMessage(name, email, message) {
  return `
    <h4>Message from <em>${name}</em> (<a href="mailto:${email}">${email}</a>)</h4>
    <p>${message}</p>
  `;
}

/**
 * @func sendMail
 * @desc A promisified version of nodemailer's transporter's sendMail method.
 * @param {Transporter} transporter 
 * @param {object} options 
 * @returns {Promise}
 */
function sendMail(transporter, options) {
  return new Promise((resolve, reject) => {
    return transporter.sendMail(
      options,
      (err, info) => (err ? reject(err) : resolve(info))
    );
  });
}

export default {
  send
};
