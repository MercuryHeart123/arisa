const express = require("express")
const router = express.Router()
const loginControl = require('./login')

router.get('/', loginControl.loginGet);
router.post('/', loginControl.loginPost);

module.exports = router