const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../../helpers/jwt");
const STATUS_CODE = require("../../constants/httpStatus");
const { makeResponseFail, makeResponseSuccess } = require("../../utils/apiResponse");

class AuthController {
    // [POST] / Login
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = await generateJWT(user._id);
                user.token = token;

                return res.status(STATUS_CODE.OK).json(makeResponseSuccess(user, STATUS_CODE.OK));
            }

            throw makeResponseFail(STATUS_CODE.BAD_REQUEST, "Email or password incorrect!");
        } catch (err) {
            next(err);
        }
    }

    // [POST] / Register
    async register(req, res, next) {
        try {
            const { firstName, lastName, email, password, role } = req.body;

            const oldUser = await User.findOne({ email });
            if (oldUser) {
                throw makeResponseFail(STATUS_CODE.UNPROCESSABLE_ENTITY, "User Already Exist. Please Login!");
            }

            // Create user in our database
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                firstName,
                lastName,
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
                role,
            });

            // Create token
            const token = await generateJWT(user._id);
            user.token = token;
            
            return res.status(STATUS_CODE.CREATED).json(makeResponseSuccess(user, STATUS_CODE.CREATED));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
