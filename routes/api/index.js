const express = require('express')
const employee_router = require('./employee')
const router = express.Router()

router.use('/employee', employee_router)

module.exports = router