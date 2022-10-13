const STATUS_CODE = require("../../constants/httpStatus");
const { makeResponseSuccess } = require("../../utils/apiResponse");

class UsersController {
  // [GET] /
  getAll(req, res, next) {
    res.status(STATUS_CODE.OK).json(makeResponseSuccess([], STATUS_CODE.OK, "TEST ALL ROLES"));
  }

  // [GET] /:id
  getUser(req, res) {
    res.status(STATUS_CODE.OK).json(makeResponseSuccess([], STATUS_CODE.OK, "TEST USER ROLE"));
  }

  // [GET] /moderator
  getModerator(req, res) {
    res.status(STATUS_CODE.OK).json(makeResponseSuccess([], STATUS_CODE.OK, "TEST MODERATOR ROLE"));
  }

  // [GET] /admin
  getAdmin(req, res) {
    res.status(STATUS_CODE.OK).json(makeResponseSuccess([], STATUS_CODE.OK, "TEST ADMIN ROLE"));
  }
}

module.exports = new UsersController();
