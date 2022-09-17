const Course = require("../models/Course");

class SiteController {
  // [GET] /
  index(req, res) {
    Course.find({}, (err, courses) => {
      if (err) res.status(400).json({ error: "Error!" });
      else {
        res.json(courses);
      }
    });
  }

  // [GET] /search
  search(req, res) {
    res.send("search");
  }
}

module.exports = new SiteController();
