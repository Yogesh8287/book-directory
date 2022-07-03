const exprees = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = exprees.Router();
const mongoose = require("mongoose");
const { User, validate } = require("../models/User");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", [auth, admin], async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("user not found");
  user.name = req.body.name;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.age = req.body.age;
  user.password = req.body.password;
  const salt = await bcrypt.genSalt();
  user.password = bcrypt.hash(user.password, salt);
  await user.save();
  res.send(user);
});

module.exports = router;
