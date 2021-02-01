var express = require("express");
const controller = require('../controller/ApplicationController')
const fileUploadController = require('../controller/FileUploadController')
var router = express.Router();

var sql = require('mssql/msnodesqlv8');

router.put('/update_application/',controller.saveAsDraftApplication);
router.put('/update_submitapplication/',controller.submitApplication);
router.post('/add_saveapplication/',controller.addApplicationSaveAsDraft);
router.post('/add_submitapplication/',controller.addApplicationSubmit);
router.post('/update_existApplication/',controller.updateApplicantSubmit);

router.delete('/delete_applicantnextofkin/:Id',controller.deleteApplicantNextOfKin);
router.post('/add_applicantnextofkin/', controller.addApplicantNextOfKin);
router.put('/update_applicantnextofkin/',controller.updateApplicantNextOfKin);

// Added by Hakim on 13 Jan 2021 - Start
router.delete('/delete_applicantseaexperience/:Id',controller.deleteApplicantExperience);
router.post('/add_applicantseaexperience/', controller.addApplicantExperience);
router.put('/update_applicantseaexperience/',controller.updateApplicantExperience);
// Added by Hakim on 13 Jan 2021 - End

router.delete('/delete_document/:Id', fileUploadController.deleteDocument)
module.exports = router;