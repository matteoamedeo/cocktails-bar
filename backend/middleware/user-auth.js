const jwt = require("jsonwebtoken");
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const moment = require("moment");
const {
  getAllCocktails,
  createDocument,
  getDocument,
  deleteDocument,
} = require("../database/interface");

const expire = { num: 1, format: "d" };
const options = { expiresIn: expire.num + expire.format, algorithm: "RS256" };

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token || token == null)
    return res.status(401).send("Nessun token fornito!");
  try {
    const checkToken = await getDocument("whitelistToken", "token", token);

    if (checkToken) {
      const pub_key = fs.readFileSync("rsa.public");
      req.user = jwt.verify(token, pub_key, options);
      next();
    } else {
      return res.status(401).send("Il token non è valido oppure è scaduto");
    }
  } catch (err) {
    return res.status(401).send(err);
  }
}

async function signToken(req, res, next) {
  const payload = { email: req.body.email, password: req.body.password };

  //check if user exist
  const checkUser = await getDocument("account", "email", payload.email);

  if (!checkUser) return res.status(200).send("Account non trovato");

  if (await bcrypt.compare(payload.password, checkUser[0].password)) {
    //create token with private key
    const prv_key = fs.readFileSync("rsa.private");
    const token = jwt.sign(payload, prv_key, options);
    const whitelistToken = await createDocument("whitelistToken", {
      token,
      email: payload.email,
      timestamp: moment().format(),
      expire: moment().add(expire.num, expire.format),
    });

    if (whitelistToken) {
      res.json({ token, payload, user: checkUser });
      next();
    } else {
      return res.status(400).send({
        statusCode: 401,
        error: "Impossibile salvare il token",
      });
    }
  } else {
    return res.status(401).json({
      statusCode: 401,
      error: "incorrect password",
    });
  }
}

async function deleteToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).send("Nessun token fornito!");

  try {
    const logout = await deleteDocument("whitelistToken", "token", token);
    if (logout) {
      next();
    } else {
      return res.status(403).send("Impossibile effettuare il logout");
    }
  } catch (error) {
    return res.status(401).send("Impossibile effettuare il logout");
  }
  next();
}

module.exports = {
  verifyToken,
  signToken,
  deleteToken,
};
