var express = require("express");
const controller = require('../controller/ApplicantController')
var router = express.Router();

var sql = require('mssql/msnodesqlv8');

router.get('/get_charterer', controller.getCharterer);
router.get('/get_competency', controller.getCompetency);
router.get('/get_working', controller.getWorking);
router.get('/get_gender', controller.getGender);
router.get('/get_education', controller.getEducation);
router.get('/get_dynamicpos', controller.getDynamicPos);
router.get('/get_currency', controller.getCurrency);

router.get('/get_applicant', controller.getApplicant);
router.get('/get_applicantapply', controller.getApplicantApply);
router.get('/get_applicant/:Id', controller.getApplicantById);
router.get('/get_applicantapply/:LoginEmail', controller.getApplicantApplyByLoginEmail);
router.get('/get_applicantloginemail/:LoginEmail', controller.getApplicantByLoginEmail);
router.get('/get_applicantdropdown/:Id', controller.getApplicantDropdownId);
router.get('/get_applicantdocument/?', controller.getApplicantDocument);
router.get('/get_applicantstatus', controller.getApplicantStatus);
													
router.get('/get_applicantnextofkin/:UserID', controller.getApplicantNextOfKin);
router.get('/get_applicantseaexperience/:UserID', controller.getApplicantExperience); // Added by Hakim on 26 Jan 2021

router.get('/get_applicantmedicalreportquestion', controller.getApplicantMedicalReportQuestion); // Added by Hakim on 14 Jan 2021
router.get('/get_applicantmedicalreportanswer/:ApplyID', controller.getApplicantMedicalReportAnswerById); // Added by Hakim on 14 Jan 2021

router.get('/get_applicantgeneralquestion', controller.getApplicantGeneralQuestion);
router.get('/get_applicantgeneralanswer/:ApplyID', controller.getApplicantGeneralAnswerById);

router.put('/update_applicant/',controller.updateApplicant);
router.put('/update_confirmapplicant/',controller.updateConfirmApplicant);

module.exports = router;