var sql = require('mssql/msnodesqlv8');

// use and replace the connection string below
// connectionString: 'Driver={ODBC Driver <version> for SQL Server};Server={<computer_name\\SQLSERVER>};Database={<db_name>};Trusted_Connection={yes};',
var config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server={parrot\\SQLEXPRESS};Database={JobPortal};Trusted_Connection={yes};',
};


sql.connect(config).then(pool => {
  console.log("connected");
  return pool.request().query('select * from [JobPortal].[dbo].[Document]')

}).then(result => {
  console.dir(result)
  console.log("result: %d", result);

})
.catch(function(err) {
  // ... connect error checks
  console.log("err: ", err);

});
