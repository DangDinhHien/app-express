const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Course = new Schema(
  {
    name: { type: String, default: "", required: true },
    description: { type: String, default: "", required: true },
    image: { type: String, default: "" },
    slug: { type: String, slug: "name", unique: true },
    videoId: { type: String, default: "", required: true },
  },
  { timestamps: true }
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

// Mongo auto gen Course => courses
module.exports = mongoose.model("Course", Course);
