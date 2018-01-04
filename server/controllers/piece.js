const constants = require("../config/constants");
const { User, Piece } = require("../models");
const { genericPaginatedRead } = require("./common");

module.exports = {
  create: (req, res) =>
    respondWith(res, async () => {
      const { userId } = req.query;
      const { name, description, maker, price, location } = req.body;

      requireVariables(
        ["userId", "name", "description", "maker", "price", "location"],
        [userId, name, description, maker, price, location]
      );

      const user = await User.findById(+userId);

      if (!user) {
        return error(res, `Invalid user User#${userId}`);
      }

      if (
        !user.verified ||
        !user.linked ||
        user.type === constants.LINK_TYPES.BRAND
      ) {
        return error(
          res,
          `A piece can only upload by a verified, linked user that is not a brand`
        );
      }

      const piece = await Piece.create({
        userId,
        name,
        description,
        maker,
        price,
        location
      });

      return success(
        res,
        `Successfully created Piece#${piece.id} belonging to User#${userId}`,
        { piece }
      );
    }),
  read: async (req, res) =>
    await genericPaginatedRead(req, res, Piece, "piece", "pieces")
};

async function respondWith(res, func) {
  try {
    return await func();
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.toString()
    });
  }
}

function requireVariables(required, actual, cb) {
  for (let i = 0; i < required.length; i++) {
    const requirement = required[i];
    const variable = actual[i];

    if (!variable) throw Error(`Missing required variable > ${requirement}`);
  }
}

function error(res, error) {
  return res.status(400).json({
    success: false,
    error
  });
}

function success(res, message, payload) {
  return res.status(200).json({
    success: true,
    message,
    payload
  });
}
