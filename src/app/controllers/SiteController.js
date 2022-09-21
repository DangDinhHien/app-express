const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../utils/mongoose");

class SiteController {
  // [GET] /
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch((err) => next(err));
  }

  // [GET] /search
  search(req, res) {
    res.send("search");
  }
}

module.exports = new SiteController();
