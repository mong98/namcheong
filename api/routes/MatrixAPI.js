var express = require("express");
const controller = require('../controller/MatrixController')
var router = express.Router();

var sql = require('mssql/msnodesqlv8');

// TODO: move to config, replace Driver & server name to generic env. path
// use and replace the connection string below
// connectionString: 'Driver={ODBC Driver <version> for SQL Server};Server={<computer_name\\SQLSERVER>};Database={<db_name>};Trusted_Connection={yes};',
/*var config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server={LAPTOP-2L7LKFFQ\\SQLEXPRESS};Database={JobPortal};Trusted_Connection={yes};',
};*/

router.get('/get_matrix', controller.getMatrix);
router.post('/add_matrix/' , controller.addMatrix);
router.delete('/delete_matrix/:Id',controller.deleteMatrix);
//router.delete('/delete_documents/:Id' , controller.deleteDocuments);

/*router.get("/get_documents", function(req, res, next) {
    sql.connect(config).then(pool => {
        console.log("connected");
        return pool.request().query('select * from [JobPortal].[dbo].[Document]')

      }).then(result => {
        console.dir(result)
        console.log("result: %d", result);
        let resultRows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(resultRows);
        sql.close();
      })
      .catch(function(err) {
        // ... connect error checks
        console.log("err: ", err);
        sql.close();
      });
    //res.send({"text": "API is working properly"});
});*/

module.exports = router;