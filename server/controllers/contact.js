const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "",
    domain: "sandboxb1e1fc4bcc2d4209b92f227ca03efaa9.mailgun.org"
  }
};
const authSettings = mailgun(auth);
const transporter = nodemailer.createTransport(authSettings);

module.exports = {
  send: async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({
        success: false,
        error: `A name, an email and a message are all required to send a contact message.`
      });

    const mailOptions = {
      from: "do_not_reply@glassfinder.com",
      to: "cchromium@gmail.com",
      subject: `Contact form message from ${email}`,
      html: composeMessage(name, email, message)
    };

    return transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        return res.status(500).json({
          success: false,
          error: err.toString()
        });

      return res.status(200).json({
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
