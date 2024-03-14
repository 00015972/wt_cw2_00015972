const { body } = require("express-validator");

const registerValidationRules = () => {
    return [
        body("firstName").notEmpty().withMessage("Please enter your name"),
        body("email").notEmpty().withMessage("Please enter your email address"),
        body("phoneNumber").notEmpty().withMessage("Please enter your phone number"),
        body("password").notEmpty().withMessage("Please create a new password"),
        body("password").notEmpty().withMessage("Please repeat your password"),
    ];
};

module.exports = registerValidationRules
