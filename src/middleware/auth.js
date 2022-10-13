const jwt = require("jsonwebtoken");
const User = require("../app/models/User");
const STATUS_CODE = require("../constants/httpStatus");
const { makeResponseFail } = require("../utils/apiResponse");

const { JWT_SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        throw makeResponseFail(STATUS_CODE.FORBIDDEN, "A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.userId = decoded._id;
    } catch (err) {
        throw makeResponseFail(STATUS_CODE.UNAUTHORIZED, "Invalid Token");
    }
    return next();
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role === "admin") {
            next();
            return;
        }
        throw makeResponseFail(STATUS_CODE.FORBIDDEN, "Require Admin Role!");
    } catch (error) {
        next(error);
    }
};
  
const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role === "moderator") {
            next();
            return;
        }
        throw makeResponseFail(STATUS_CODE.FORBIDDEN, "Require Moderator Role!");
    } catch (error) {
        next(error);
    }
};
  
const isModeratorOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (["admin", "moderator"].includes(user.role)) {
            next();
            return;
        }
        throw makeResponseFail(STATUS_CODE.FORBIDDEN, "Require Moderator or Admin Role!");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    verifyToken, isAdmin, isModerator, isModeratorOrAdmin
};
