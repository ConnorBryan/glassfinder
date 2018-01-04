const transporter = require("./create-transporter");
const upload = require("./upload");
const requestResponse = require("./request-response");

module.exports = Object.assign({}, { transporter, upload }, requestResponse);
