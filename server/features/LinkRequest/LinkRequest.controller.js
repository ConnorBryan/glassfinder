const CRUR = require("../../util/crur");
const { respondWith, requireProperties, success } = require("../../util");
const { User, LinkRequest } = require("../../models");

module.exports = {
  read,
  approve,
  deny
};

/* === */

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

    return success(res, `Successfully approved LinkRequest#${id}`);
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

    return success(res, `Successfully denied LinkRequest#${id}`);
  });
}
