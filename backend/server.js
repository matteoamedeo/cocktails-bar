const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const cors = require("cors");
const deleteExpiredTokenJob = require("./helpers/deleteExpiredTokenJob");
const {
  verifyToken,
  signToken,
  deleteToken,
} = require("./middleware/user-auth");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.get("/user/dashboard", verifyToken, (req, res) => {
  res.send("Sei autenticato!");
});

/* ROUTERS */
const cocktailsRouter = require("./database/controller/cocktail"); /* MONGO */
const usersRouter = require("./database/controller/users"); /* MONGO */
const authRouter = require("./routes/auth"); /* AUTH */

/* AUTH */
app.use("/account", authRouter);

/* COCKTAILS */
app.use("/api/cocktails", cocktailsRouter);

/* USERS */
app.use("/account", usersRouter);

app.listen(port, () => console.log(`SERVER ON ${port}`));
