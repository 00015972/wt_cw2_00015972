const express = require('express') // importing express
const employee_router = require('./employee')

const router = express.Router()

// the web route for get request: localhost:4000/employee/register
router.use('/employee', employee_router)

module.exports = router // exporting a route