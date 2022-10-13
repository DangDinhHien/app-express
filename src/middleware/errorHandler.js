const STATUS_CODE = require("../constants/httpStatus");

const errorHandler = async (err, res) => {
    // Logger logger.(err);

    return res.status(err.status || STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        status: err.status || STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: err.message
    });
};

module.exports = { errorHandler };
