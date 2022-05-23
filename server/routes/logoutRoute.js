const express = require("express");
const checkAuth = require("./chackAuth");
const logoutControl = require('./logout')
const router = express.Router()

router.post('/', checkAuth, logoutControl.logoutPost);

module.exports = router