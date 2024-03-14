const express = require("express");
const router = express.Router();
const web_controller = require("../../../controllers/web/index")
// const {user_register_controller, user_update_controller} = require("../../../controllers/web/user");

router.get("/register", web_controller.register);
// router.get("/update/:id", user_update_controller.update)

module.exports = router; // exporting router