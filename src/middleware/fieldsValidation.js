const { request, response } = require("express");
const { validationResult } = require("express-validator");
const STATUS_CODE = require("../constants/httpStatus");
const { makeResponseFail } = require("../utils/apiResponse");

const fieldsValidation = async (req = request, res = response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        next(makeResponseFail(STATUS_CODE.BAD_REQUEST, errors.mapped()))
    }

    next();
};

module.exports = { fieldsValidation };
