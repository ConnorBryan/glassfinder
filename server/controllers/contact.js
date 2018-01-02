const constants = require("../config/constants");
const { transporter } = require("../util");

module.exports = {
  send: async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({
        success: false,
        error: `A name, an email and a message are all required to send a contact message.`
      });

    const mailOptions = {
      from: constants.TRANSPORTER_EMAIL_ADDRESS,
      to: constants.CONTACT_EMAIL_ADDRESS,
      subject: `Contact form message from ${email}`,
      html: composeMessage(name, email, message)
    };

    return transporter.sendMail(mailOptions, (err, info) => {
      return err
        ? res.status(500).json({
            success: false,
            error: err.toString()
          })
        : res.status(200).json({
            success: true,
            message: "Successfully sent a contact message"
          });
    });
  }
};

function composeMessage(name, email, message) {
  return `
    <h4>Message from <em>${name}</em> (<a href="mailto:${email}">${email}</a>)</h4>
    <p>${message}</p>
  `;
}
