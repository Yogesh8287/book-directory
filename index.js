require("dotenv").config();
const exprees = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const app = exprees();
const error = require("./app/middleware/error");
const book = require("./app/router/books");
const user = require("./app/router/user");
const auth = require("./app/router/auth");

mongoose
  .connect("mongodb://localhost/BookDirectory")
  .then(() => console.log("connect to mongodb.."))
  .catch(() => console.log("connect to mongodb.."));

app.use(exprees.json());
app.use("/", book);
app.use("/user", user);
app.use("/auth", auth);
app.use(error);

const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`Listening on port ${Port}...`));
