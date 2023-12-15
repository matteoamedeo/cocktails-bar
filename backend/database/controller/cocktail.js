const express = require("express");
const router = express.Router();
const {
  verifyToken,
  signToken,
  deleteToken,
} = require("../../middleware/user-auth");
const { getAllCocktails, createDocument } = require("../interface");

/* GET - ALL COCKTAILS */
router.get("/getAllCocktails", async (req, res) => {
  const result = await getAllCocktails();
  res.status(200).send(result);
});

/* POST CREATE COCKTAIL */
router.post("/createCocktail", verifyToken, async (req, res) => {
  const document = req.body;
  const createCocktail = await createDocument("cocktails", document);

  if (!createCocktail)
    return res.status(400).send("Impossibile creare il cocktail");

  res.status(200).send(`Cocktail creato: ${JSON.stringify(createCocktail)}`);
});
module.exports = router;
