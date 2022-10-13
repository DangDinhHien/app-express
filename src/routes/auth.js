const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/AuthController");
const { fieldsValidation } = require("../middleware/fieldsValidation");
const { check } = require("express-validator");

router.post("/login", [
    check('email').isEmail(),
    check('password').notEmpty(),
    fieldsValidation
], authController.login);

router.post("/register", [
    check('firstName').exists().withMessage('firstName is required!'),
    check('lastName').exists(),
    check('email').isEmail(),
    check('password').notEmpty(),
    check('role').notEmpty(),
    fieldsValidation
], authController.register);


module.exports = router;
