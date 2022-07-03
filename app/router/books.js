const exprees = require("express");
const multer = require("multer");
const { s3storage } = require("../utils/s3service");
const router = exprees.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const Book = require("../models/books");
const { validate } = require("../models/books");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const storage = multer.memoryStorage({ dest: "uploads/" });
const upload = multer(storage);

router.get("/", async (req, res) => {
  const book = await Book.find();
  res.send(book);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book({ ...req.body, uploadBy: req.user._id });
  // await book.save();
  res.send(book);
});

router.post(
  "/upload",
  [auth, admin],
  upload.array("file", 2),
  async (req, res) => {
    const result = await s3storage("books", req.files[0]);
    res.json({ status: "sucess", result });
  }
);

module.exports = router;
