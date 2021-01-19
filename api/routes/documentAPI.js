var express = require("express");
const controller = require('../controller/DocumentController')
const authenticationController = require('../controller/UserController')
var router = express.Router();

var sql = require('mssql/msnodesqlv8');

//router.get('/get_document', authenticationController.authenticateUser, controller.getDocument);
router.get('/get_document', controller.getDocument);
//router.get('/get_documentbyid/:Id', controller.getDocument);
router.post('/add_document/' , controller.addDocument);
router.put('/update_document/',controller.updateDocument);
router.delete('/delete_document/:Id' , controller.deleteDocument);

module.exports = router;
