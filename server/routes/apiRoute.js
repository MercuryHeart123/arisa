const express = require("express");
const checkAuth = require("./chackAuth");
const router = express.Router()
const apiController = require('./api')

router.post('/post', checkAuth, apiController.Post);
router.post('/delete', checkAuth, apiController.deleteProject);

module.exports = router