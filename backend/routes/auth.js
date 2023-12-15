const express = require("express");
const router = express.Router();
const { sendEmail } = require("../helpers/sendEmail");
const registerResource = require("../public/resources/register.json");

const {
  verifyToken,
  signToken,
  deleteToken,
} = require("../middleware/user-auth");

router.get("/checkToken", verifyToken, async (req,res)=>{
  res.send(true)
})

router.post("/login", signToken, async (req, res) => {
  res.send();
});

router.post("/logout", deleteToken, (req, res) => {
  res.send("logout effettuato");
});

module.exports = router;
