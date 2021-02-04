var express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controller/UserController')
const jwt = require('jsonwebtoken');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticateadmin' , controller.authenticateAdmin);
router.post('/add_admin' , controller.createAdmin);
router.post('/login_admin' , controller.loginAdmin);
router.put('/update_adminpassword' , controller.updatePasswordAdmin);

router.post('/authenticateuser' , controller.authenticateUser);
router.put('/authenticate_user_app' , controller.authenticateUserApp);
router.post('/add_user' , controller.createUser);
router.post('/login_user' , controller.loginUser);
router.put('/update_userpassword' , controller.updatePasswordUser);

router.put('/forgotpassword' , controller.forgotPassword);

module.exports = router;
