const mongoose = require("mongoose");

const Catches = mongoose.model(
  "Catches",
  new mongoose.Schema({
    fish: String,
    author: String,
    imgURL: String
  })
)

module.exports = Catches;