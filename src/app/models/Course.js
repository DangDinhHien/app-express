const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name: { type: String, default: "", maxLength: 255 },
  description: { type: String, default: "", maxLength: 600 },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

// Mongo auto gen Course => courses
module.exports = mongoose.model("Course", Course);
