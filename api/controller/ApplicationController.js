const { sql, poolPromise } = require('../database/db')
const fs = require('fs')
var rawdata = fs.readFileSync('./query/queries.json')
var queries = JSON.parse(rawdata)

class ApplicationController {
  // update the applicant tbl
  async updateApplicant(req) {
    var queryStr2 = queries.saveAsDraftApplication.join(' ')
    //console.log("queryStr2: ", queryStr2, " LoginEmail2: ", req.body.LoginEmail)
    const pool = await poolPromise
    const result2 = await pool
    .request()
    .input('Name', sql.VarChar, req.body.Name)
    .input('MiddleName', sql.VarChar, req.body.MiddleName)
    .input('LastName', sql.VarChar, req.body.LastName)
    .input('Email', sql.VarChar, req.body.LoginEmail)
    .input('Gender', sql.VarChar, req.body.Gender)
    .input('IC', sql.VarChar, req.body.IC)
    .input('Education', sql.SmallInt, req.body.Education)

    .input('Passport', sql.VarChar, req.body.Passport)
    .input('Passport_DtIssue', sql.VarChar, req.body.Passport_DtIssue)
    .input('Passport_DtExpiry', sql.VarChar, req.body.Passport_DtExpiry)
    .input('SubsePassport', sql.VarChar, req.body.SubsePassport)
    .input('SubsePassport_DtIssue', sql.VarChar, req.body.SubsePassport_DtIssue)
    .input('SubsePassport_DtExpiry', sql.VarChar, req.body.SubsePassport_DtExpiry)
    .input('SeamanBookNo', sql.VarChar, req.body.SeamanBookNo)
    .input('SeamanBook_DtIssue', sql.VarChar, req.body.SeamanBook_DtIssue)
    .input('SeamanBook_DtExpiry', sql.VarChar, req.body.SeamanBook_DtExpiry)
    .input('SeamanCardNo', sql.VarChar, req.body.SeamanCardNo)
    .input('SeamanCard_DtIssue', sql.VarChar, req.body.SeamanCard_DtIssue)
    .input('SeamanCard_DtExpiry', sql.VarChar, req.body.SeamanCard_DtExpiry)

    .input('ValidityDate', sql.VarChar, req.body.ValidityDate)
    .input('DOB', sql.Date, req.body.DOB)
    .input('PlaceofBirth', sql.VarChar, req.body.PlaceofBirth)
    .input('CountryOfOrigin', sql.VarChar, req.body.CountryOfOrigin)
    .input('MaritalStatus', sql.VarChar, req.body.MaritalStatus)
    .input('Nationality', sql.VarChar, req.body.Nationality)
    .input('NationalityOthers', sql.VarChar, req.body.NationalityOthers)

    .input('Race', sql.VarChar, req.body.Race)
    .input('RaceOthers', sql.VarChar, req.body.RaceOthers)
    .input('Religion', sql.VarChar, req.body.Religion)
    .input('ReligionOthers', sql.VarChar, req.body.ReligionOthers)

    .input('PermanentAddress', sql.VarChar, req.body.PermanentAddress)
    .input('PermanentAddress2', sql.VarChar, req.body.PermanentAddress2)
    .input('PermanentAddress3', sql.VarChar, req.body.PermanentAddress3)
    .input('PPostcode', sql.VarChar, req.body.PPostcode)
    .input('PCity', sql.VarChar, req.body.PCity) // Added by Hakim on 18 Jan 2021
    .input('PState', sql.VarChar, req.body.PState)
    .input('PStateOthers', sql.VarChar, req.body.PStateOthers)
    .input('PCountry', sql.VarChar, req.body.PCountry) // Added by Hakim on 18 Jan 2021

    .input('Residentialaddress', sql.VarChar, req.body.Residentialaddress)
    .input('Residentialaddress2', sql.VarChar, req.body.Residentialaddress2)
    .input('Residentialaddress3', sql.VarChar, req.body.Residentialaddress3)
    .input('RPostcode', sql.VarChar, req.body.RPostcode)
    .input('RCity', sql.VarChar, req.body.RCity) // Added by Hakim on 18 Jan 2021
    .input('RState', sql.VarChar, req.body.RState) 
    .input('RStateOthers', sql.VarChar, req.body.RStateOthers)
    .input('RCountry', sql.VarChar, req.body.RCountry) // Added by Hakim on 18 Jan 2021
    .input('Contact_MobileCtryCode', sql.VarChar, req.body.Contact_MobileCtryCode)
    .input('Contact_Mobile', sql.VarChar, req.body.Contact_Mobile)
    .input('Contact_HouseCtryCode', sql.VarChar, req.body.Contact_HouseCtryCode) // Added by Hakim on 19 Jan 2021
    .input('Contact_House', sql.VarChar, req.body.Contact_House) // Added by Hakim on 19 Jan 2021

    .input('RepatriationHomePort', sql.VarChar, req.body.RepatriationHomePort)
    .input('EmergencyContactName', sql.VarChar, req.body.EmergencyContactName)
    .input('EmergencyContactMiddleName', sql.VarChar, req.body.EmergencyContactMiddleName) // Added by Hakim 14 Jan 2021
    .input('EmergencyContactLastName', sql.VarChar, req.body.EmergencyContactLastName) // Added by Hakim 14 Jan 2021
    .input('EmergencyContactRelationship', sql.SmallInt, req.body.EmergencyContactRelationship)
    .input('EmergencyContact_Address', sql.VarChar, req.body.EmergencyContact_Address) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_Address2', sql.VarChar, req.body.EmergencyContact_Address2) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_Address3', sql.VarChar, req.body.EmergencyContact_Address3) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_City', sql.VarChar, req.body.EmergencyContact_City) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_Postcode', sql.VarChar, req.body.EmergencyContact_Postcode) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_State', sql.VarChar, req.body.EmergencyContact_State) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_Country', sql.VarChar, req.body.EmergencyContact_Country) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_HouseCtryCode', sql.VarChar, req.body.EmergencyContact_HouseCtryCode)
    .input('EmergencyContact_House', sql.VarChar, req.body.EmergencyContact_House)
    .input('EmergencyContact_MobileCtryCode', sql.VarChar, req.body.EmergencyContact_MobileCtryCode)
    .input('EmergencyContact_Mobile', sql.VarChar, req.body.EmergencyContact_Mobile)

    .input('Ref1Name', sql.VarChar, req.body.Ref1Name)
    .input('Ref1Company', sql.VarChar, req.body.Ref1Company)
    .input('Ref1Designation', sql.VarChar, req.body.Ref1Designation)
    .input('Ref1Contact', sql.VarChar, req.body.Ref1Contact)
    .input('Ref2Name', sql.VarChar, req.body.Ref2Name)
    .input('Ref2Company', sql.VarChar, req.body.Ref2Company)
    .input('Ref2Designation', sql.VarChar, req.body.Ref2Designation)
    .input('Ref2Contact', sql.VarChar, req.body.Ref2Contact)

    .input('IncomeTaxNo', sql.VarChar, req.body.IncomeTaxNo)
    .input('LoginEmail', sql.VarChar, req.body.LoginEmail)

    .input('SignatureName', sql.VarChar, req.body.SignatureName) // Added by Hakim on 19 Jan 2021
    .input('SignatureIcPassport', sql.VarChar, req.body.SignatureIcPassport) // Added by Hakim on 19 Jan 2021
    .input('SignatureDate', sql.VarChar, req.body.SignatureDate) // Added by Hakim on 19 Jan 2021

    .query(queryStr2)

    //console.log('addApplicationSaveAsDraft result2: ', result2)
    return result2
  }

  // Add applicant document
  async addApplicantDocument(req, res, ApplyID) {
    try {
      //console.log("come in add applicant document")
      var result4 = ''
      const pool = await poolPromise
      var queryStr4 = queries.addApplicantDocument.join(' ')
      //console.log("queryStr4: ", queryStr4, " LoginEmail: ", req.body.LoginEmail)

      // insert documents
      for(var i = 0; i < req.body.applicant_documents.length; i++) {
        // skip update for unchecked documents, shouldn't been displayed to users
        if(req.body.applicant_documents[i].Chk == 'N') {
          continue
        }

        /*//console.log("req.body.applicant_documents[i].Document[0]: ", req.body.applicant_documents[i].Document[0])
        //console.log("req.body.applicant_documents[i].DocumentID: ", req.body.applicant_documents[i].DocumentID)
        //console.log("req.body.applicant_documents[i].ApplicantDocNo: ", req.body.applicant_documents[i].ApplicantDocNo)
        //console.log("req.body.applicant_documents[i].ApplicantDocDtIssue: ", req.body.applicant_documents[i].ApplicantDocDtIssue)
        //console.log("req.body.applicant_documents[i].ApplicantDocDtExpiry: ", req.body.applicant_documents[i].ApplicantDocDtExpiry)
        //console.log("req.body.applicant_documents[i].ApplicantDocType: ", req.body.applicant_documents[i].ApplicantDocType)
        //console.log("req.body.applicant_documents[i].FilePath: ", req.body.applicant_documents[i].ApplicantDocFile)
        //console.log("req.body.applicant_documents[i].FileName: ", req.body.applicant_documents[i].ApplicantDocFileName)
        //console.log("req.body.applicant_documents[i].FileExtension: ", req.body.applicant_documents[i].FileExtension)*/
        var docName = ( req.body.applicant_documents[i].Document.isArray == true) ? req.body.applicant_documents[i].Document[0] : req.body.applicant_documents[i].Document

        result4 = await pool
        .request()
        .input('UserID', sql.VarChar, req.body.LoginEmail)
        .input('ApplyID', sql.VarChar, ApplyID)
        .input('Position', sql.VarChar, req.body.Position)
        .input('PositionID', sql.VarChar, req.body.PositionID)
        .input('Document', sql.VarChar, docName)
        .input('DocumentID', sql.VarChar, req.body.applicant_documents[i].DocumentID)
        .input('DocNo', sql.VarChar, req.body.applicant_documents[i].ApplicantDocNo)
        .input('Grade', sql.VarChar, req.body.applicant_documents[i].Grade)
        .input('IssuingAuthority', sql.VarChar, req.body.applicant_documents[i].IssuingAuthority)
        .input('DtIssue', sql.Date, (req.body.applicant_documents[i].DtIssue == 'Y' && req.body.applicant_documents[i].ApplicantDocDtIssue)
          ? new Date(req.body.applicant_documents[i].ApplicantDocDtIssue) : null)
        .input('DtExpiry', sql.Date, (req.body.applicant_documents[i].DtExpiry == 'Y' && req.body.applicant_documents[i].ApplicantDocDtExpiry)
          ? new Date(req.body.applicant_documents[i].ApplicantDocDtExpiry) : null)
        .input('Type', sql.VarChar, req.body.applicant_documents[i].Competency)
        .input('FilePath', sql.VarChar, req.body.applicant_documents[i].ApplicantDocFile)
        .input('FileName', sql.VarChar, req.body.applicant_documents[i].ApplicantDocFileName)
        .input('FileExtension', sql.VarChar, req.body.applicant_documents[i].FileExtension)
        .input('Charterer', sql.Int, req.body.applicant_documents[i].Charterer)
        .input('ChartererOthers', sql.VarChar, req.body.applicant_documents[i].ChartererOthers)
        .input('DynamicPositionCertType', sql.Int, req.body.applicant_documents[i].DynamicPositionCertType)
        .input('DynamicPositionCertFileName', sql.VarChar, req.body.applicant_documents[i].DynamicPositionCertFileName)
        .query(queryStr4)
        //console.log('addApplicantDocument result4: ', result4)
        if(result4 == null) {
          res.status(500)
          res.send(error.message)
          return
        }
      }
      //console.log('addApplicationSaveAsDraft result4: ', result4)
      return result4
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async addApplicantNextOfKin(req, res) {
    try {
      //console.log('addApplicantNextOfKin: ', req.body)
      if (req.body.Id != null && req.body.UserID != null) {
        var queryStr = queries.addApplicantNextOfKin.join(' ')
        //console.log("queryStr: ", queryStr, " UserID: ", req.body.UserID)
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('UserID', sql.VarChar, req.body.UserID)
          .input('NOKName', sql.VarChar, req.body.NOKName)
          .input('NOKMiddleName', sql.VarChar, req.body.NOKMiddleName) // Added by Hakim on 13 Jan 2021
          .input('NOKLastName', sql.VarChar, req.body.NOKLastName) // Added by Hakim on 13 Jan 2021
          .input('NOKRelationship', sql.VarChar, req.body.NOKRelationship)
          .input('NOKOccupaction', sql.VarChar, req.body.NOKOccupaction)
          .input('NOKContactNumber', sql.VarChar, req.body.NOKContactNumber)
          .input('NOKAge', sql.VarChar, req.body.NOKAge) 
          .input('NOKGender', sql.VarChar, req.body.NOKGender) 
          .input('NOKDOB', sql.Date, req.body.NOKDOB) 
          .input('NOKEmployment', sql.VarChar, req.body.NOKEmployment) // Updated by Hakim on 14 Jan 2021
          .input('NOKHandicap', sql.VarChar, req.body.NOKHandicap) // Added by Hakim on 13 Jan 2021
          .input('SeqNo', sql.Int, 1)
          .query(queryStr)
        //console.log('addApplicantNextOfKin result: ', result.recordset[0].Id)
        res.json(result.recordset[0])
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async deleteApplicantNextOfKin(req, res) {
    try {
      //console.log('addApplicantNextOfKin: ', req.body)
      if (req.params.Id != null) {
        //console.log("req.params.Id: ", req.params.Id)
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.params.Id)
          .query(queries.deleteApplicantNextOfKin)
        //console.log('addApplicantNextOfKin result: ', req.params.Id)
        res.json({ Id: req.params.Id })
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async updateApplicantNextOfKin(req, res) {
    try {
      //console.log('updateApplicantNextOfKin: ', req.body)
      if (req.body.Id != null && req.body.UserID != null) {
        var queryStr = queries.updateApplicantNextOfKin.join(' ')
        //console.log("queryStr: ", queryStr, " UserID: ", req.body.UserID)
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .input('UserID', sql.VarChar, req.body.UserID)
          .input('NOKName', sql.VarChar, req.body.NOKName)
          .input('NOKMiddleName', sql.VarChar, req.body.NOKMiddleName) // Added by Hakim on 14 Jan 2021
          .input('NOKLastName', sql.VarChar, req.body.NOKLastName) // Added by Hakim on 14 Jan 2021
          .input('NOKRelationship', sql.VarChar, req.body.NOKRelationship)
          .input('NOKOccupaction', sql.VarChar, req.body.NOKOccupaction)
          .input('NOKContactNumber', sql.VarChar, req.body.NOKContactNumber)
          .input('NOKDOB', sql.Date, req.body.NOKDOB)
          .input('NOKAge', sql.VarChar, req.body.NOKAge) // Added by Hakim on 14 Jan 2021
          .input('NOKEmployment', sql.VarChar, req.body.NOKEmployment) // Added by Hakim on 14 Jan 2021
          .input('NOKHandicap', sql.VarChar, req.body.NOKHandicap) // Added by Hakim on 14 Jan 2021
          .input('SeqNo', sql.Int, req.body.No)
          .query(queryStr)
        //console.log('updateApplicantNextOfKin result: ', req.body.Id)
        res.json({ Id: req.body.Id })
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  // Added by Hakim on 26 Jan 2021 - Start
  async addApplicantExperience(req, res) {
    try {
      //console.log('addApplicantExperience: ', req.body)
      if (req.body.Id != null && req.body.UserID != null) {
        var queryStr = queries.addApplicantExperience.join(' ')
        //console.log("queryStr: ", queryStr, " UserID: ", req.body.UserID)
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('UserID', sql.VarChar, req.body.UserID)
          .input('ApplyID', sql.VarChar, req.body.ApplyID)
          .input('Company', sql.VarChar, req.body.SeaExpCompany)
          .input('VesselName', sql.VarChar, req.body.SeaExpVesselName) 
          .input('ExpRank', sql.VarChar, req.body.SeaExpRank)
          .input('ExpPeriod', sql.VarChar, req.body.SeaExpPeriod)
          .query(queryStr)
        //console.log('addApplicantExperience result: ', result.recordset[0].Id)
        res.json(result.recordset[0])
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async deleteApplicantExperience(req, res) {
    try {
      //console.log('deleteApplicantExperience: ', req.body)
      if (req.params.Id != null) {
        //console.log("req.params.Id: ", req.params.Id)
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.params.Id)
          .query(queries.deleteApplicantExperience)
        //console.log('deleteApplicantExperience result: ', req.params.Id)
        res.json({ Id: req.params.Id })
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async updateApplicantExperience(req, res) {
    try {
      //console.log('updateApplicantExperience: ', req.body)
      if (req.body.Id != null && req.body.UserID != null) {
        var queryStr = queries.updateApplicantExperience.join(' ')
        //console.log("queryStr: ", queryStr, " UserID: ", req.body.UserID)
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .input('ApplyID', sql.VarChar, req.body.ApplyID)
          .input('UserID', sql.VarChar, req.body.UserID)
          .input('Company', sql.VarChar, req.body.SeaExpCompany)
          .input('VesselName', sql.VarChar, req.body.SeaExpVesselName) 
          .input('ExpRank', sql.VarChar, req.body.SeaExpRank)
          .input('ExpPeriod', sql.VarChar, req.body.SeaExpPeriod)
          .query(queryStr)
        //console.log('updateApplicantExperience result: ', req.body.Id)
        res.json({ Id: req.body.Id })
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  // Added by Hakim on 26 Jan 2021 - End

  async getApplicantByLoginEmailApplyPosition(req) {
    const pool = await poolPromise
    const result1 = await pool
      .request()
      .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
      .input('ApplyPositionID', sql.VarChar, req.body.PositionID)
      .query(queries.getApplicantByLoginEmailApplyPosition)
      //console.log('selectApplicantApply result1: ', result1)
    return result1
  }

  async getApplicantByLoginEmailApplyId(req, applyId) {
    const pool = await poolPromise
    const result1 = await pool
      .request()
      .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
      .input('Id', sql.VarChar, applyId)
      .query(queries.getApplicantByLoginEmailApplyId)
      //console.log('selectApplicantId result1: ', result1)
    return result1
  }

  async updateApplication(req) {
    const pool = await poolPromise
    const result2 = await pool
    .request()
    .input('Position', sql.VarChar, req.body.Position)
    .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
    .input('PositionID', sql.VarChar, req.body.PositionID)
    .query(queries.updateApplication)
    return result2
  }

  async deleteApplicantDocument(req, ApplyID) {
    const pool = await poolPromise
    const result3 = await pool
    .request()
    .input('UserID', sql.VarChar, req.body.LoginEmail)
    .input('ApplyID', sql.VarChar, ApplyID)
    .input('PositionID', sql.VarChar, req.body.PositionID)
    .query(queries.deleteApplicantDocument)
    return result3
  }

  async addApplicantGeneralAnswer(req, ApplyID) {
    try {
      //console.log('addApplicantGeneralAnswer: ', req.body)
      if (req.body.Id != null && ApplyID != null
        && req.body.LoginEmail != null) {
        var result = ''
        var queryStr = queries.addApplicantGeneralAnswer.join(' ')
        const pool = await poolPromise
        for(var i = 0; i < req.body.generalAnswer.length; i++) {
          // set the question type & question id based on index
          var Type = (i < 6) ? 1 : 2
          var QuestionId = i + 1
          result = await pool
          .request()
          .input('ApplyID', sql.VarChar, ApplyID)
          .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          .input('Type', sql.SmallInt, Type)
          .input('QuestionId', sql.SmallInt, QuestionId)
          .input('Answer', sql.VarChar, req.body.generalAnswer[i].Answer)
          .input('Description', sql.VarChar, req.body.generalAnswer[i].Description ? req.body.generalAnswer[i].Description : null)
          .input('FilePath', sql.VarChar, req.body.generalAnswer[i].FilePath ? req.body.generalAnswer[i].FilePath : null)
          .query(queryStr)
          //console.log('addApplicantGeneralAnswer result: ', req.body.Id)
        }
        return result
        //res.json({ Id: req.body.Id })
      } else {
        //console.log('All fields are required!')
        return null
      }
    } catch (error) {
      //console.log('addApplicantGeneralAnswer: Error!')
      return null
    }
  }

  async updateApplicantGeneralAnswerById(req, ApplyID) {
    try {
      ////console.log('updateApplicantGeneralAnswerById: ', req.body)
      if (req.body.Id != null && ApplyID != null
        && req.body.LoginEmail != null) {
        var result2 = ''
        const pool = await poolPromise
        const result = await pool.request()
        .input('ApplyID', sql.SmallInt, ApplyID)
        .query(queries.getApplicantGeneralAnswerById)
        //console.log("getApplicantGeneralAnswerById: ", result.recordset)
        if(result == null || result.recordset == null || result.recordset.length == 0) {
          const result1 = await module.exports.addApplicantGeneralAnswer(req, ApplyID)
          return result1
        }
        var queryStr = queries.updateApplicantGeneralAnswerById.join(' ')
        for(var i = 0; i < req.body.generalAnswer.length; i++) {
          result2 = await pool
            .request()
            .input('Id', sql.SmallInt, req.body.generalAnswer[i].Id)
            .input('ApplyID', sql.VarChar, ApplyID)
            .input('LoginEmail', sql.VarChar, req.body.generalAnswer[i].LoginEmail)
            .input('Type', sql.SmallInt, req.body.generalAnswer[i].Type)
            .input('QuestionId', sql.SmallInt, req.body.generalAnswer[i].QuestionId)
            .input('Answer', sql.VarChar, req.body.generalAnswer[i].Answer)
            .input('Description', sql.VarChar, req.body.generalAnswer[i].Description ? req.body.generalAnswer[i].Description : null)
            .input('FilePath', sql.VarChar, req.body.generalAnswer[i].FilePath ? req.body.generalAnswer[i].FilePath : null)
            .query(queryStr)
            ////console.log('updateApplicantGeneralAnswerById result2: ', result2)
          if(result2 == null) {
            console("result2: null")
            return
          }
        }
        ////console.log('updateApplicantGeneralAnswerById result2: ', result2)
        return result2
      } else {
        //console.log('All fields are required!')
        return false
      }
    } catch (error) {
      //console.log('error: ', error)
      return false
    }
  }

  // Updated by Hakim on 20 Jan 2021 - Start
  async addApplicantMedicalReportAnswer(req, ApplyID) {
    try {
      //console.log('addApplicantMedicalReportAnswer: ', req.body)
      if (req.body.Id != null && ApplyID != null
        && req.body.LoginEmail != null) {
        var result = ''
        var queryStr = queries.addApplicantMedicalReportAnswer.join(' ')
        const pool = await poolPromise
        for(var i = 0; i < req.body.medicalReportAnswer.length; i++) {
          // set the question type & question id based on index
          var Type = (i < 6) ? 1 : 2
          var QuestionId = i + 1
          result = await pool
          .request()
          .input('ApplyID', sql.VarChar, ApplyID)
          .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          .input('Type', sql.SmallInt, Type)
          .input('QuestionId', sql.SmallInt, QuestionId)
          .input('Answer', sql.VarChar, req.body.medicalReportAnswer[i].Answer)
          .input('Description', sql.VarChar, req.body.medicalReportAnswer[i].Description ? req.body.medicalReportAnswer[i].Description : null)
          .input('FilePath', sql.VarChar, req.body.medicalReportAnswer[i].FilePath ? req.body.medicalReportAnswer[i].FilePath : null)
          .input('AnsCheckupDt', sql.Date, req.body.medicalReportAnswer[i].AnsCheckupDt ? req.body.medicalReportAnswer[i].AnsCheckupDt : null)
          .input('AnsExpiryDt', sql.Date, req.body.medicalReportAnswer[i].AnsExpiryDt ? req.body.medicalReportAnswer[i].AnsExpiryDt : null)
          .query(queryStr)
          //console.log('addApplicantMedicalReportAnswer result: ', req.body.Id)
        }
        return result
        //res.json({ Id: req.body.Id })
      } else {
        //console.log('All fields are required!')
        return null
      }
    } catch (error) {
      //console.log('addApplicantMedicalReportAnswer: Error!')
      return null
    }
  }

  async updateApplicantMedicalReportAnswerById(req, ApplyID) {
    try {
      ////console.log('updateApplicantMedicalReportAnswerById: ', req.body)
      if (req.body.Id != null && ApplyID != null
        && req.body.LoginEmail != null) {
        var result2 = ''
        const pool = await poolPromise
        const result = await pool.request()
        .input('ApplyID', sql.SmallInt, ApplyID)
        .query(queries.getApplicantMedicalReportAnswerById)
        //console.log("getApplicantMedicalReportAnswerById: ", result.recordset)
        if(result == null || result.recordset == null || result.recordset.length == 0) {
          const result1 = await module.exports.addApplicantMedicalReportAnswer(req, ApplyID)
          return result1
        }
        var queryStr = queries.updateApplicantMedicalReportAnswerById.join(' ')
        for(var i = 0; i < req.body.medicalReportAnswer.length; i++) {
          result2 = await pool
            .request()
            .input('Id', sql.SmallInt, req.body.medicalReportAnswer[i].Id)
            .input('ApplyID', sql.VarChar, ApplyID)
            .input('LoginEmail', sql.VarChar, req.body.medicalReportAnswer[i].LoginEmail)
            .input('Type', sql.SmallInt, req.body.medicalReportAnswer[i].Type)
            .input('QuestionId', sql.SmallInt, req.body.medicalReportAnswer[i].QuestionId)
            .input('Answer', sql.VarChar, req.body.medicalReportAnswer[i].Answer)
            .input('Description', sql.VarChar, req.body.medicalReportAnswer[i].Description ? req.body.medicalReportAnswer[i].Description : null)
            .input('FilePath', sql.VarChar, req.body.medicalReportAnswer[i].FilePath ? req.body.medicalReportAnswer[i].FilePath : null)
            .input('AnsCheckupDt', sql.Date, req.body.medicalReportAnswer[i].AnsCheckupDt ? req.body.medicalReportAnswer[i].AnsCheckupDt : null)
            .input('AnsExpiryDt', sql.Date, new Date(req.body.medicalReportAnswer[i].AnsExpiryDt) ? new Date(req.body.medicalReportAnswer[i].AnsExpiryDt) : null)
            .query(queryStr)
            ////console.log('updateApplicantMedicalReportAnswerById result2: ', result2)
          if(result2 == null) {
            console("result2: null")
            return
          }
        }
        ////console.log('updateApplicantMedicalReportAnswerById result2: ', result2)
        return result2
      } else {
        //console.log('All fields are required!')
        return false
      }
    } catch (error) {
      //console.log('error: ', error)
      return false
    }
  }
  // Updated by Hakim on 20 Jan 2021 - End

  async saveAsDraftApplication(req, res) {
    try {
      ////console.log('saveAsDraftApplication: ', req.body)
      if (req.body.LoginEmail != null) {
        const pool = await poolPromise
        // update the applicant tbl
        const result = await module.exports.updateApplicant(req)
        ////console.log('addApplicationSaveAsDraft result: ', result)

        if(result != null) {
          // get applicant by login email & apply pos. from ApplicantApply tbl
          const result1 = await module.exports.getApplicantByLoginEmailApplyPosition(req)
          ////console.log('selectApplicantApply result1: ', result1)

          // record found in applicantapply
          if(result1 != null && result1.recordset[0] != '' &&
              result1.recordset[0] !=  null) {
            var ApplyID = result1.recordset[0].Id

            // update the application status: Position, Status='New', SubmitFlag='N'
            const result2 = await module.exports.updateApplication(req)
            ////console.log('updateApplication result2: ', result2)

            // delete applicant documents first, before add
            // TODO: check if needed to delete documents for same pos.
            const result3 = await module.exports.deleteApplicantDocument(req, ApplyID)
            ////console.log('deleteApplicantDocument result3: ', result3)

            // add applicant documents
            const result4 = await module.exports.addApplicantDocument(req, res, ApplyID)
            ////console.log('addApplicantDocument result4: ', result4)

            // save the general question answers
            const result5 = await module.exports.updateApplicantGeneralAnswerById(req, ApplyID)
            ////console.log('updateApplicantGeneralAnswerById result5: ', result5)

            const result6 = await module.exports.updateApplicantMedicalReportAnswerById(req, ApplyID)
            // //console.log('updateApplicantMedicalReportAnswerById result6: ', result6)
          }
        }
        res.json({ LoginEmail: req.body.LoginEmail })
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async updateApplicantSubmit(req) {
    //console.log("start in updateApplicant")
    var queryStr2 = queries.updateApplicantSubmit.join(' ')
    ////console.log("queryStr2: ", queryStr2, " LoginEmail2: ", req.body.LoginEmail)
    const pool = await poolPromise
    const result2 = await pool
    .request()
    .input('Name', sql.VarChar, req.body.Name)
    .input('MiddleName', sql.VarChar, req.body.MiddleName)
    .input('LastName', sql.VarChar, req.body.LastName)
    .input('Email', sql.VarChar, req.body.LoginEmail)
    .input('Gender', sql.VarChar, req.body.Gender)
    .input('IC', sql.VarChar, req.body.IC)
    .input('Education', sql.SmallInt, req.body.Education)

    .input('Passport', sql.VarChar, req.body.Passport)
    .input('Passport_DtIssue', sql.VarChar, req.body.Passport_DtIssue)
    .input('Passport_DtExpiry', sql.VarChar, req.body.Passport_DtExpiry)
    .input('SubsePassport', sql.VarChar, req.body.SubsePassport)
    .input('SubsePassport_DtIssue', sql.VarChar, req.body.SubsePassport_DtIssue)
    .input('SubsePassport_DtExpiry', sql.VarChar, req.body.SubsePassport_DtExpiry)
    .input('SeamanBookNo', sql.VarChar, req.body.SeamanBookNo)
    .input('SeamanBook_DtIssue', sql.VarChar, req.body.SeamanBook_DtIssue)
    .input('SeamanBook_DtExpiry', sql.VarChar, req.body.SeamanBook_DtExpiry)
    .input('SeamanCardNo', sql.VarChar, req.body.SeamanCardNo)
    .input('SeamanCard_DtIssue', sql.VarChar, req.body.SeamanCard_DtIssue)
    .input('SeamanCard_DtExpiry', sql.VarChar, req.body.SeamanCard_DtExpiry)

    .input('ValidityDate', sql.VarChar, req.body.ValidityDate)
    .input('DOB', sql.Date, req.body.DOB)
    .input('PlaceofBirth', sql.VarChar, req.body.PlaceofBirth)
    .input('CountryOfOrigin', sql.VarChar, req.body.CountryOfOrigin)
    .input('MaritalStatus', sql.VarChar, req.body.MaritalStatus)
    .input('Nationality', sql.VarChar, req.body.Nationality)
    .input('NationalityOthers', sql.VarChar, req.body.NationalityOthers)

    .input('Race', sql.VarChar, req.body.Race)
    .input('RaceOthers', sql.VarChar, req.body.RaceOthers)
    .input('Religion', sql.VarChar, req.body.Religion)
    .input('ReligionOthers', sql.VarChar, req.body.ReligionOthers)

    .input('PermanentAddress', sql.VarChar, req.body.PermanentAddress)
    .input('PermanentAddress2', sql.VarChar, req.body.PermanentAddress2)
    .input('PermanentAddress3', sql.VarChar, req.body.PermanentAddress3)
    .input('PPostcode', sql.VarChar, req.body.PPostcode)
    .input('PCity', sql.VarChar, req.body.PCity) // Added by Hakim on 18 Jan 2021
    .input('PState', sql.VarChar, req.body.PState)
    .input('PStateOthers', sql.VarChar, req.body.PStateOthers)
    .input('PCountry', sql.VarChar, req.body.PCountry) // Added by Hakim on 18 Jan 2021

    .input('Residentialaddress', sql.VarChar, req.body.Residentialaddress)
    .input('Residentialaddress2', sql.VarChar, req.body.Residentialaddress2)
    .input('Residentialaddress3', sql.VarChar, req.body.Residentialaddress3)
    .input('RPostcode', sql.VarChar, req.body.RPostcode)
    .input('RCity', sql.VarChar, req.body.RCity) // Added by Hakim on 18 Jan 2021
    .input('RState', sql.VarChar, req.body.RState) 
    .input('RStateOthers', sql.VarChar, req.body.RStateOthers)
    .input('RCountry', sql.VarChar, req.body.RCountry) // Added by Hakim on 18 Jan 2021
    .input('Contact_MobileCtryCode', sql.VarChar, req.body.Contact_MobileCtryCode)
    .input('Contact_Mobile', sql.VarChar, req.body.Contact_Mobile)
    .input('Contact_HouseCtryCode', sql.VarChar, req.body.Contact_HouseCtryCode) // Added by Hakim on 19 Jan 2021
    .input('Contact_House', sql.VarChar, req.body.Contact_House) // Added by Hakim on 19 Jan 2021

    .input('RepatriationHomePort', sql.VarChar, req.body.RepatriationHomePort)
    .input('EmergencyContactName', sql.VarChar, req.body.EmergencyContactName)
    .input('EmergencyContactMiddleName', sql.VarChar, req.body.EmergencyContactMiddleName) // Added by Hakim 14 Jan 2021
    .input('EmergencyContactLastName', sql.VarChar, req.body.EmergencyContactLastName) // Added by Hakim 14 Jan 2021
    .input('EmergencyContactRelationship', sql.SmallInt, req.body.EmergencyContactRelationship)
    .input('EmergencyContact_Address', sql.VarChar, req.body.EmergencyContact_Address) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_Address2', sql.VarChar, req.body.EmergencyContact_Address2) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_Address3', sql.VarChar, req.body.EmergencyContact_Address3) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_City', sql.VarChar, req.body.EmergencyContact_City) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_Postcode', sql.VarChar, req.body.EmergencyContact_Postcode) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_State', sql.VarChar, req.body.EmergencyContact_State) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_Country', sql.VarChar, req.body.EmergencyContact_Country) // Added by Hakim 14 Jan 2021
    .input('EmergencyContact_HouseCtryCode', sql.VarChar, req.body.EmergencyContact_HouseCtryCode)
    .input('EmergencyContact_House', sql.VarChar, req.body.EmergencyContact_House)
    .input('EmergencyContact_MobileCtryCode', sql.VarChar, req.body.EmergencyContact_MobileCtryCode)
    .input('EmergencyContact_Mobile', sql.VarChar, req.body.EmergencyContact_Mobile)

    .input('Ref1Name', sql.VarChar, req.body.Ref1Name)
    .input('Ref1Company', sql.VarChar, req.body.Ref1Company)
    .input('Ref1Designation', sql.VarChar, req.body.Ref1Designation)
    .input('Ref1Contact', sql.VarChar, req.body.Ref1Contact)
    .input('Ref2Name', sql.VarChar, req.body.Ref2Name)
    .input('Ref2Company', sql.VarChar, req.body.Ref2Company)
    .input('Ref2Designation', sql.VarChar, req.body.Ref2Designation)
    .input('Ref2Contact', sql.VarChar, req.body.Ref2Contact)

    .input('IncomeTaxNo', sql.VarChar, req.body.IncomeTaxNo)
    .input('LoginEmail', sql.VarChar, req.body.LoginEmail)

    .input('SignatureName', sql.VarChar, req.body.SignatureName) // Added by Hakim on 19 Jan 2021
    .input('SignatureIcPassport', sql.VarChar, req.body.SignatureIcPassport) // Added by Hakim on 19 Jan 2021
    .input('SignatureDate', sql.VarChar, req.body.SignatureDate) // Added by Hakim on 19 Jan 2021
    .query(queryStr2)

    //////console.log('addApplicationSaveAsDraft result2: ', result2)
    //console.log("done for updateApplicantSubmit")
    return result2
  }

  async submitApplication(req, res) {
    try {
      //console.log('go in submitApplication')
      //console.log('submitApplication: ', req.body)
      if (req.body.LoginEmail != null || req.body.Position != null) {
        var isSubmit = true
        const pool = await poolPromise
        const result = await module.exports.addApplication(req, isSubmit) 
        //console.log('addApplicationSubmit result: ', result)

        //console.log("check return id")
        //console.log(result.recordset[0].Id)
        var ApplyID = result.recordset[0].Id

        if(result != null) {
          // update the applicant tbl 
          //console.log("come in update submit")
          const result2 = await module.exports.updateApplicantSubmit(req)
          //console.log('addApplicationSubmit result: ', result2)

          // get applicant by login email & apply pos. from ApplicantApply tbl
          const result3 = await module.exports.getApplicantByLoginEmailApplyId(req, ApplyID)
          //console.log('selectApplicantApply result3: ', result3)
          //console.log("check before")
          

          // record found in applicantapply
          if(result3 != null && result3.recordset[0] != '' &&
              result3.recordset[0] !=  null) {
            
            // add applicant documents
            const result4 = await module.exports.addApplicantDocument(req, res, ApplyID)
            //console.log('addApplicationSaveAsDraft result4: ', result4)

            // save the general question answers
            const result6 = await module.exports.updateApplicantGeneralAnswerById(req, ApplyID)
            //console.log('updateApplicantGeneralAnswerById result6: ', result6)

            const result7 = await module.exports.updateApplicantMedicalReportAnswerById(req, ApplyID)
            //console.log('updateApplicantMedicalReportAnswerById result7: ', result7)

            // Updated by Hakim on 19 Jan 2021 - start
            // To solve issue of sending response two times
            if (result6 && result7) {
              res.json({LoginEmail: req.body.LoginEmail})
            }
            // Updated by Hakim on 19 Jan 2021 - End
          }
        }
        // res.json({ LoginEmail: req.body.LoginEmail })
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      // res.status(500)
      res.send(error.message)
    }
  }

  async addApplication(req, isSubmit) {
    var queryStr = queries.addApplication.join(' ')
    //console.log("queryStr: ", queryStr, " LoginEmail: ", req.body.LoginEmail)
    var result = ''
    const pool = await poolPromise
    if(isSubmit) {
      result = await pool
        .request()
        .input('Position', sql.VarChar, req.body.Position)
        .input('PositionID', sql.VarChar, req.body.PositionID)
        .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
        .input('Status', sql.VarChar, 'New')
        .input('SubmitFlag', sql.VarChar, 'Y')
        .input('SubmitBy', sql.VarChar, req.body.LoginEmail)
        .input('SubmitDt', sql.DateTime, new Date())
        .query(queryStr)
    }
    else {
      result = await pool
        .request()
        .input('Position', sql.VarChar, req.body.Position)
        .input('PositionID', sql.VarChar, req.body.PositionID)
        .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
        .input('Status', sql.VarChar, 'New')
        .input('SubmitFlag', sql.VarChar, 'N')
        .input('SubmitBy', sql.VarChar, null)
        .input('SubmitDt', sql.DateTime, null)
        .query(queryStr)
    }
    return result
  }

  async addApplicationSubmit(req, res) {
    try {
      //console.log('addApplicationSubmit: ', req.body)
      if (req.body.Position != null && req.body.LoginEmail != null
        && req.body.AddNew != null) {
        var isSubmit = true
        const pool = await poolPromise
        const result = await module.exports.addApplication(req, isSubmit) 
        //console.log('addApplicationSubmit result: ', result)

        // register new applicant first
        // TODO: move to register user account in authentication module
        // comment by joe coz it will create duplicate applicant details
        // const result1 = await pool
        //   .request()
        //   .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
        //   .input('Name', sql.VarChar, req.body.Name)
        //   .input('MiddleName', sql.VarChar, req.body.MiddleName)
        //   .input('LastName', sql.VarChar, req.body.LastName)
        //   .input('Password', sql.VarChar, "test123")
        //   .query(queries.registerApplicant)
        // //console.log('addApplicationSubmit result1: ', result1)

        if(result != null) {
          // update the applicant tbl 
          const result2 = await module.exports.updateApplicant(req)
          //console.log('addApplicationSubmit result: ', result2)

          // get applicant by login email & apply pos. from ApplicantApply tbl
          const result3 = await module.exports.getApplicantByLoginEmailApplyPosition(req)
          //console.log('selectApplicantApply result3: ', result3)

          // record found in applicantapply
          if(result3 != null && result3.recordset[0] != '' &&
              result3.recordset[0] !=  null) {
            var ApplyID = result3.recordset[0].Id

            // update the application status: Position, Status='New', SubmitFlag='N'
            var querySubmitApplicationStr = queries.submitApplication.join(' ')
            ////console.log("queryStr: ", querySubmitApplicationStr, " LoginEmail: ", req.body.LoginEmail)
            const submitApplicationResult = await pool
              .request()
              .input('Name', sql.VarChar, req.body.Name)
              .input('MiddleName', sql.VarChar, req.body.MiddleName)
              .input('LastName', sql.VarChar, req.body.LastName)
              .input('Position', sql.VarChar, req.body.Position)
              .input('PositionID', sql.VarChar, req.body.PositionID)
              .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
              .query(querySubmitApplicationStr)
            //console.log('submitApplicationResult submitApplicationResult: ', submitApplicationResult)

            // add applicant documents
            const result4 = await module.exports.addApplicantDocument(req, res, ApplyID)
            //console.log('addApplicationSaveAsDraft result4: ', result4)

            const result5 = await pool
              .request()
              .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
              .query(queries.getApplicantApplyByLoginEmail)
              //console.log('addApplicationSaveAsDraft result5: ', result5)

            // save the general question answers
            const result6 = await module.exports.updateApplicantGeneralAnswerById(req, ApplyID)
            //console.log('updateApplicantGeneralAnswerById result6: ', result6)

            const result7 = await module.exports.updateApplicantMedicalReportAnswerById(req, ApplyID)
            //console.log('updateApplicantMedicalReportAnswerById result7: ', result7)

            res.json({LoginEmail: result5.recordset[0].LoginEmail})
          }
        }
      } else {
        //console.log("data not complete")
        res.send('Please fill all the details!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async  addApplicationSaveAsDraft(req, res) {
    try {
      //console.log('addApplicationSaveAsDraft: ', req.body)
      if (req.body.Position != null && req.body.LoginEmail != null
        && req.body.AddNew != null) {
        var isSubmit = false
        const pool = await poolPromise
        const result = await module.exports.addApplication(req, isSubmit)
        //console.log('addApplicationSaveAsDraft result: ', result)

        // register new applicant first
        // TODO: move to register user account in authentication module
        const result1 = await pool
          .request()
          .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          .input('Name', sql.VarChar, req.body.Name)
          .input('MiddleName', sql.VarChar, req.body.MiddleName)
          .input('LastName', sql.VarChar, req.body.LastName)
          .input('Password', sql.VarChar, "test123")
          .query(queries.registerApplicant)
        //console.log('addApplicationSaveAsDraft result1: ', result1)

        if(result != null && result1 != null) {
          // update the applicant tbl 
          const result2 = await module.exports.updateApplicant(req)
          //console.log('addApplicationSaveAsDraft result2: ', result2)

          // get applicant by login email & apply pos. from ApplicantApply tbl
          const result3 = await module.exports.getApplicantByLoginEmailApplyPosition(req)
          //console.log('addApplicationSaveAsDraft result3: ', result3)

          // record found in applicantapply
          if(result3 != null && result3.recordset[0] != '' &&
              result3.recordset[0] !=  null) {
            var ApplyID = result3.recordset[0].Id

            // update the application status: Position, Status='New', SubmitFlag='N'
            var querySubmitApplicationStr = queries.submitApplication.join(' ')
            ////console.log("queryStr: ", querySubmitApplicationStr, " LoginEmail: ", req.body.LoginEmail)
            const submitApplicationResult = await pool
              .request()
              .input('Name', sql.VarChar, req.body.Name)
              .input('MiddleName', sql.VarChar, req.body.MiddleName)
              .input('LastName', sql.VarChar, req.body.LastName)
              .input('Position', sql.VarChar, req.body.Position)
              .input('PositionID', sql.VarChar, req.body.PositionID)
              .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
              .query(querySubmitApplicationStr)
            //console.log('addApplicationSaveAsDraft submitApplicationResult: ', submitApplicationResult)

            // add applicant documents
            const result4 = await module.exports.addApplicantDocument(req, res, ApplyID)
            //console.log('addApplicationSaveAsDraft result4: ', result4)

            const result5 = await pool
              .request()
              .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
              .query(queries.getApplicantApplyByLoginEmail)
              //console.log('addApplicationSaveAsDraft result5: ', result5)

            // save the general question answers
            const result6 = await module.exports.updateApplicantGeneralAnswerById(req, ApplyID)
            //console.log('updateApplicantGeneralAnswerById result6: ', result6)

            const result7 = await module.exports.updateApplicantMedicalReportAnswerById(req, ApplyID)
            //console.log('updateApplicantMedicalReportAnswerById result7: ', result7)

            res.json({LoginEmail: result5.recordset[0].LoginEmail})
          }
        }
      } else {
        res.send('Please fill all the details!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const controller = new ApplicationController()
module.exports = controller
