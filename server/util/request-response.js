module.exports = {
  async respondWith(res, func) {
    try {
      return await func();
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: e.toString()
      });
    }
  },

  requireProperties(requirements) {
    const err = Object.keys(requirements)
      .map(
        requirement =>
          !requirements[requirement] &&
          `Missing required variable >${requirement}<`
      )
      .filter(Boolean)
      .join("\n");

    if (err.length > 0) {
      throw Error(err);
    }
  },

  error: (res, error) =>
    res.status(400).json({
      success: false,
      error: error.toString()
    }),

  success: (res, message, payload) =>
    res.status(200).json({
      success: true,
      message,
      payload
    }),

  userNotFound: res =>
    res.status(404).json({ success: false, error: "User not found" }),
  userNotLinked: res =>
    res.status(400).json({ success: false, error: "User must be linked" })
};
