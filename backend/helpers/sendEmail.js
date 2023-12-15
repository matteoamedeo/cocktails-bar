const nodemailer = require("nodemailer");
const fs = require("fs");
const registerResource = require("../public/resources/register.json");
require("dotenv").config({ path: "../../backend/.env" });

function sendEmail(toEmail, subject, title, text, logoImage) {
  // Create a nodemailer transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "dococktails_campure@outlook.it",
      pass: process.env.EMAIL_PASS,
    },
  });

  //create html

  let textTitle = `<h1>${title}</h1>`;
  let textBody = `<p>${text}</p>`;
  let textLogo = `<img src="data:image/png;base64,${logoImage}" alt="Logo">`;
  let html = textTitle + textBody + textLogo;

  // Email options
  const mailOptions = {
    from: "dococktails_campure@outlook.it",
    to: toEmail,
    subject: subject,
    html: html,
  };

  // Send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
}

// sendEmail(
//   "matteoamedeo@outlook.it",
//   registerResource.email.subject,
//   registerResource.email.title,
//   registerResource.email.text
// );

module.exports = {
  sendEmail,
};
