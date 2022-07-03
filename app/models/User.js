const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    minlength: 5,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).trim(true).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).required(),
    age: Joi.number().required(),
    password: Joi.string().min(8).required(),
    isAdmin: Joi.boolean().default(false),
  });
  return schema.validate(user);
}

const { privatekey, JWT_EXPIRES_IN } = process.env;
userSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    name: this.name,
    isAdmin: this.isAdmin,
  };
  return jwt.sign(payload, privatekey, { expiresIn: JWT_EXPIRES_IN });
};
const User = mongoose.model("user", userSchema);

exports.User = User;
exports.validate = validateUser;
