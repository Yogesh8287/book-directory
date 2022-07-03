const mongoose = require("mongoose");
const Joi = require("joi");

const Book = mongoose.model(
  "book",
  new mongoose.Schema({
    name: {
      type: String,
    },
    forAges: {
      type: String,
    },
    formatPaperback: {
      type: String,
    },
    publicationDate: {
      type: Date,
      default: Date.now,
    },
    uploadBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    imageURL: String,
    pdfURL: String,
    language: String,
    publisher: String,
  })
);

function validateBook(book) {
  const schema = Joi.object({
    name: Joi.string().required(),
    forAges: Joi.string().required(),
    formatPaperback: Joi.string().required(),
    publicationDate: Joi.string().required(),
    imageURL: Joi.string().required(),
    pdfURL: Joi.string().required(),
    language: Joi.string().required(),
    publisher: Joi.string().required(),
    uploadBy: Joi.string().required(),
  });
  return schema.validate(book);
}
module.exports = Book;
exports.validate = validateBook;
