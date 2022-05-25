const express = require("express");
const registerControl = require('./register')
const router = express.Router()

router.post('/', registerControl.register);

module.exports = router