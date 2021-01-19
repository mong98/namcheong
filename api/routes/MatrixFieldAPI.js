var express = require("express");
const controller = require('../controller/MatrixFieldController')
var router = express.Router();

var sql = require('mssql/msnodesqlv8');

router.get('/get_matrix_field', controller.getMatrixField);

module.exports = router;