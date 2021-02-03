var express = require('express')
const controller = require('../controller/UserIdConfigureController')
const fileUploadController = require('../controller/FileUploadController')
var router = express.Router()

// TODO: move to config, replace Driver & server name to generic env. path
// use and replace the connection string below
// connectionString: 'Driver={ODBC Driver <version> for SQL Server};Server={<computer_name\\SQLSERVER>};Database={<db_name>};Trusted_Connection={yes};',
/*var config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server={LAPTOP-2L7LKFFQ\\SQLEXPRESS};Database={JobPortal};Trusted_Connection={yes};',
};*/

router.get('/get_usermodule', controller.getUserModule)
router.get('/get_managerlist', controller.getManagerList)
router.get('/get_useridconfigure/', controller.getUserIdConfigure)
router.get('/getadminDetails/:Id', controller.getAdminDetails)
router.get(
  '/get_useridconfigure/:UserConfigureID',
  controller.getUserIdConfigureById
)
router.post('/add_useridconfigure/', controller.addUserIdConfigure)
router.put(
  '/update_useridconfigure/:UserConfigureID',
  controller.updateUserIdConfigure
)
// Added by Hakim on 3 Feb 2021 - Start
router.put(
  '/update_useridconfigurepassword/:UserConfigureID',
  controller.updateUserIdConfigurePassword
)
// Added by Hakim on 3 Feb 2021 - End
router.delete(
  '/delete_useridconfigure/:UserConfigureID',
  controller.deleteUserIdConfigure
)

router.delete('/delete_signature/:Id', fileUploadController.deleteSignature)
router.delete('/delete_signatureAdmin/:Id', fileUploadController.deleteSignatureAdmin)
module.exports = router
