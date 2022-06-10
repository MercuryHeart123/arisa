const express = require("express");
const checkAuth = require("./chackAuth");
const router = express.Router()
const apiController = require('./api')

router.post('/post', checkAuth, apiController.Post);
router.post('/delete', checkAuth, apiController.deleteProject);
router.post('/postprofile', checkAuth, apiController.postProfile);

module.exports = router