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

  requireVariables(required, actual) {
    for (let i = 0; i < required.length; i++) {
      const requirement = required[i];
      const variable = actual[i];

      if (!variable) throw Error(`Missing required variable > ${requirement}`);
    }
  },

  error(res, error) {
    return res.status(400).json({
      success: false,
      error
    });
  },

  success(res, message, payload) {
    return res.status(200).json({
      success: true,
      message,
      payload
    });
  },

  userNotFound(res) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
};
