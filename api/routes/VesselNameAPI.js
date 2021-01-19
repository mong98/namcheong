var express = require("express");
const controller = require('../controller/VesselNameController')
var router = express.Router();

var sql = require('mssql/msnodesqlv8');

router.get('/get_vessel_name', controller.getVesselName);

module.exports = router;