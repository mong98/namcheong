var express = require("express");
const controller = require('../controller/ApplicationController')
const fileUploadController = require('../controller/FileUploadController')
var router = express.Router();

var sql = require('mssql/msnodesqlv8');

router.put('/update_application/',controller.saveAsDraftApplication);
router.put('/update_submitapplication/',controller.submitApplication);
router.post('/add_saveapplication/',controller.addApplicationSaveAsDraft);
router.post('/add_submitapplication/',controller.addApplicationSubmit);

router.delete('/delete_applicantnextofkin/:Id',controller.deleteApplicantNextOfKin);
router.post('/add_applicantnextofkin/', controller.addApplicantNextOfKin);
router.put('/update_applicantnextofkin/',controller.updateApplicantNextOfKin);

// Added by Hakim on 13 Jan 2021 - Start
router.delete('/delete_applicantcertificate/:Id',controller.deleteApplicantCertificate);
router.post('/add_applicantcertificate/', controller.addApplicantCertificate);
router.put('/update_applicantcertificate/',controller.updateApplicantCertificate);
// Added by Hakim on 13 Jan 2021 - End

router.delete('/delete_document/:Id', fileUploadController.deleteDocument)
module.exports = router;