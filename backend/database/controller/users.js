const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../helpers/sendEmail");
const registerResource = require("../../public/resources/register.json");
const {
  getAllCocktails,
  createDocument,
  getDocument,
} = require("../interface");

//import logo
const fs = require("fs");
const logoImagePath = "../backend/public/images/logoEmail.jpg";
const logoImage = fs.readFileSync(logoImagePath, { encoding: "base64" });

/* POST - CREATE ACCOUNT */
router.post("/createAccount", async (req, res) => {
  const document = req.body;

  //check if user exist
  const checkUser = await getDocument("account", "email", document.email);

  if (checkUser)
    return res
      .status(200)
      .send({ status: false, serverError: true, msg: "Account già esistente" });

  const hashedPassword = await bcrypt.hash(document.password, 10);
  const user = {
    firstName: document.firstName,
    lastName: document.lastName,
    email: document.email,
    type: "customer",
    password: hashedPassword,
  };

  const result = await createDocument("account", user);

  if (result) {
    sendEmail(
      user.email,
      registerResource.email.subject,
      registerResource.email.title,
      registerResource.email.text,
      logoImage
    );
    return res
      .status(200)
      .send({
        status: true,
        serverError: false,
        msg: `Account creato. ${JSON.stringify(result)}`,
      });
  } else {
    return res
      .status(400)
      .send({
        status: false,
        serverError: true,
        msg: "Impossibile creare l'account",
      });
  }
});

module.exports = router;
