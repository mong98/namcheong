var express = require("express");
const controller = require('../controller/MatrixTemplateController')
var router = express.Router();

var sql = require('mssql/msnodesqlv8');

// TODO: move to config, replace Driver & server name to generic env. path
// use and replace the connection string below
// connectionString: 'Driver={ODBC Driver <version> for SQL Server};Server={<computer_name\\SQLSERVER>};Database={<db_name>};Trusted_Connection={yes};',
/*var config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server={LAPTOP-2L7LKFFQ\\SQLEXPRESS};Database={JobPortal};Trusted_Connection={yes};',
};*/

router.get('/get_matrix_template', controller.getMatrixTemplate);
router.post('/add_matrix_template/' , controller.addMatrixTemplate);
router.put('/update_matrix_template/',controller.updateMatrixTemplate);
router.delete('/delete_matrix_template/:template' , controller.deleteMatrixTemplate);

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