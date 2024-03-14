let express = require('express');
let { validationResult } = require('express-validator');
const registerValidationRules = require("../../../validators/validation");
let api_controller = require("../../../controllers/api")
let router = express.Router();

router.post('/register-employee', registerValidationRules(), (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    api_controller.register(req, res);
});
router.post('/update-employee/:id', registerValidationRules(), (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    api_controller.update(req, res);
});

module.exports = router;