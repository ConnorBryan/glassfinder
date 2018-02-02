import * as config from "../../../config";
import { CRUR, respondWith, requireProperties, success } from "../../../util";
import models from "../../database/models";
import transporter, {
  glassfinder,
  slightlyBiggerText
} from "../../transporter";

const { User, LinkRequest } = models;

/**
 * @func read
 * @desc Retrieve the list of waiting link requests.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @returns {Array<LinkRequest>}
 */
function read(req, res) {
  return respondWith(res, async () => {
    const linkRequests = await LinkRequest.findAll();

    return success(res, `Successfully fetched link requests`, {
      linkRequests
    });
  });
}

/**
 * @func approve
 * @desc Allow a link request to go through.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */
function approve(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;

    requireProperties({ id });

    const linkRequest = await LinkRequest.findById(+id);
    const { userId, type, config } = linkRequest;
    const user = await User.findById(userId);
    const parsedConfig = JSON.parse(config);

    await linkRequest.destroy();
    await user.linkAs(type, parsedConfig);

    return transporter.sendMail(
      requestApprovedMailOptions(user.email),
      err =>
        err
          ? error(res, err)
          : success(res, `Successfully approved LinkRequest#${id}`)
    );
  });
}

/**
 * @func deny
 * @desc Prevent a link request from occurring.
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */
function deny(req, res) {
  return respondWith(res, async () => {
    const { id } = req.params;

    requireProperties({ id });

    const linkRequest = await LinkRequest.findById(+id);
    const user = await User.findById(linkRequest.userId);

    await linkRequest.destroy();
    await user.update({
      linked: false,
      link: null
    });

    return transporter.sendMail(
      requestDeniedMailOptions(user.email),
      err =>
        err
          ? error(res, err)
          : success(res, `Successfully denied LinkRequest#${id}`)
    );
  });
}

export default {
  read,
  approve,
  deny
};

function requestApprovedMailOptions(email) {
  return {
    from: config.TRANSPORTER_EMAIL_ADDRESS,
    to: email.trim(),
    subject: "Congratulations, your application was approved!",
    html: composeApprovedMessage()
  };
}

function composeApprovedMessage() {
  return `
    ${glassfinder}
    <p ${slightlyBiggerText}>We have approved your request. You may now log in and see new options.</p>
    <p ${slightlyBiggerText}>Thanks for using Glassfinder!</p>
  `;
}

function requestDeniedMailOptions(email) {
  return {
    from: config.TRANSPORTER_EMAIL_ADDRESS,
    to: email.trim(),
    subject: "Unfortunately, your application was denied",
    html: composeDeniedMessage()
  };
}

function composeDeniedMessage() {
  return `
    ${glassfinder}
    <p ${slightlyBiggerText}>We regret to inform you that we could not approve your request. We encourage you to try again at a later date.</p>
    <p ${slightlyBiggerText}>Thanks for using Glassfinder!</p>
  `;
}
