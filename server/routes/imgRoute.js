const express = require("express");
const checkAuth = require("./chackAuth");
const router = express.Router()
const imgController = require('./image')

router.get('/view/:filename', imgController.View);
router.get('/list', imgController.List);
router.delete('/delete/:filename', checkAuth, imgController.Delete);
router.post('/upload', checkAuth, imgController.upload.single('file'), imgController.Upload);

module.exports = router