var express = require("express");
const controller = require('../controller/DocumentCheckListController')
var router = express.Router();

var sql = require('mssql/msnodesqlv8');

// TODO: move to config, replace Driver & server name to generic env. path
// use and replace the connection string below
// connectionString: 'Driver={ODBC Driver <version> for SQL Server};Server={<computer_name\\SQLSERVER>};Database={<db_name>};Trusted_Connection={yes};',
/*var config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server={LAPTOP-2L7LKFFQ\\SQLEXPRESS};Database={JobPortal};Trusted_Connection={yes};',
};*/

router.get('/get_documentchecklist', controller.getDocumentCheckList);
router.get('/get_documentchecklist/:Id', controller.getDocumentCheckListById);
router.put('/update_documentchecklist/:PositionID',controller.updateDocumentCheckList);

module.exports = router;