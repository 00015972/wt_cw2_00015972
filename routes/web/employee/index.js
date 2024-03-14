const express = require("express");
const router = express.Router();
const web_controller = require("../../../controllers/web/index")

router.get("/register-employee", web_controller.register_employee);
router.get("/employees-list", web_controller.get_employees);
router.get("/delete-employee/:id", web_controller.delete_employee);
router.get("/update-employee/:id", web_controller.update_employee);

module.exports = router; // exporting router