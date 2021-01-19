var express = require("express");
const controller = require('../controller/imonoController')
var router = express.Router();

var sql = require('mssql/msnodesqlv8');

// TODO: move to config, replace Driver & server name to generic env. path
// use and replace the connection string below
// connectionString: 'Driver={ODBC Driver <version> for SQL Server};Server={<computer_name\\SQLSERVER>};Database={<db_name>};Trusted_Connection={yes};',
/*var config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server={LAPTOP-2L7LKFFQ\\SQLEXPRESS};Database={JobPortal};Trusted_Connection={yes};',
};*/

router.get('/get_imono', controller.getIMONo);
router.get('/get_vessel', controller.getVessel);
router.post('/add_imono/' , controller.addIMONo);
router.put('/update_imono/',controller.updateIMONo);
router.delete('/delete_imono/:Id' , controller.deleteIMONo);

module.exports = router;