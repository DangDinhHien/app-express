const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, default: "", required: true },
    description: { type: String, default: "", required: true },
    image: { type: String, default: "" },
    slug: { type: String, slug: "name", unique: true },
    videoId: { type: String, default: "", required: true },
  },
  { timestamps: true, _id: false }
);
Course.plugin(AutoIncrement);

// Custom query helpers
Course.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isValidType = ["asc", "desc"].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : "asc",
    });
  }

  return this;
};

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

// Mongo auto gen Course => courses
module.exports = mongoose.model("Course", Course);
