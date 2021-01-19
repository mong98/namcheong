const { sql, poolPromise } = require('../database/db')
const fs = require('fs')
var rawdata = fs.readFileSync('./query/queries.json')
var queries = JSON.parse(rawdata)

var Docxtemplater = require('docxtemplater')
var ImageModule = require('docxtemplater-image-module-free')
var moment = require('moment')

var PizZip = require('pizzip')
var path = require('path')
const { createNotEmittedStatement } = require('typescript')

var opts = { centered: false }

opts.getImage = function (tagValue, tagName) {
  return fs.readFileSync(tagValue, 'binary')
}
// opts.getImage = function (tagValue) {
//   return fs.readFileSync(tagValue, "binary");
// };

opts.getSize = function (img, tagValue, tagName) {
  return [150, 150]
}

class GenerationController {
  async generateCV(req, res) {
    try {
      //get data from dbo.applicant
      if (req.body.LoginEmail != null && req.body.ApplyID != null) {
        //checking status
        const pool = await poolPromise

        const checkApplicant = await pool
          .request()
          //.input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          .input('Id', sql.VarChar, req.body.ApplyID)
          .query(queries.getApplicantApplyById)

        const Status = await pool
          .request()
          .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          .input('Position', sql.VarChar, checkApplicant.recordset[0].Position)
          //.input('Position', sql.VarChar, 'Master')
          .query(queries.getApplicantApplyAllStatus)

        if (
          Status.recordset[0].Status == 'Review' ||
          Status.recordset[0].Status == 'Offered'
        ) {
          let applicant = ''
          //let applicantApply = "";
          let document = ''
          let documentData = ''
          let PassportDocument = ''

          let DOB = '-'
          let Ager = null
          let Position = '-' //document
          let Name = '-' //applicant
          let PermanentAddress = '-' //applicant
          let PPostcode = '-' //applicant
          let PState = '-' //applicant
          let PlaceofBirth = '-' //applicant
          let Race = '-' //applicant
          let Religion = '-' //applicant
          let IC = '-' //applicant
          let IncomeTaxNo = '-' //applicant
          let Email = '-' //applicant
          let Passport = '-' //applicant
          let PassDtIssue = '-' //PassportDocument
          let PassDtExpiry = '-' //PassportDocument

          //added 15/1/2021
          let MiddleName = '-'
          let LastName = '-'
          let PermanentAddress2 = '-'
          let PermanentAddress3 = '-'
          let PCity = '-'
          let PCountry = '-'
          let Nationality = '-'

          let documentList = []

          //poolPromise
          const pool = await poolPromise

          // get applicant data
          const resultApplicant = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .query(queries.getApplication)

          applicant = resultApplicant.recordset[0]

          //get full documents
          const resultApplicantDocument = await pool
            .request()
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.getApplicantDocumentById)

          document = resultApplicantDocument.recordset
          documentData = resultApplicantDocument.recordset[0]

          console.log(checkApplicant)

          //comment 15/1/2021
          //get passport result
          // const resultPassport = await pool
          //   .request()
          //   .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          //   .input('ApplyID', sql.VarChar, req.body.ApplyID)
          //   .input('Document', sql.VarChar, 'International Passport')
          //   .query(queries.getPassport)

          // PassportDocument = resultPassport.recordset[0]

          //condition
          if (checkApplicant.recordset[0].Position != null) {
            Position = checkApplicant.recordset[0].Position
          } else {
            Position = '-'
          }

          if (applicant != []) {
            if (applicant.Name != null) {
              Name = applicant.Name
            } else {
              Name = '-'
            }
            if (applicant.PermanentAddress != null) {
              PermanentAddress = applicant.PermanentAddress
            } else {
              PermanentAddress = '-'
            }
            if (applicant.PPostcode != null) {
              PPostcode = applicant.PPostcode
            } else {
              PPostcode = '-'
            }
            if (applicant.PState != null) {
              if (applicant.PState != 'Others') {
                PState = applicant.PState
              } else {
                PState = applicant.PState
                //PState = applicant.PStateOthers
              }
            } else {
              PState = '-'
            }
            if (applicant.CountryOfOrigin != null) {
              PCountry = applicant.CountryOfOrigin
            } else {
              PCountry = '-'
            }
            if (applicant.PlaceofBirth != null) {
              PlaceofBirth = applicant.PlaceofBirth
            } else {
              PlaceofBirth = '-'
            }
            if (applicant.Race != null) {
              if (applicant.Race != 'Others') {
                Race = applicant.Race
              } else {
                Race = applicant.Race
                //Race = applicant.RaceOthers
              }
            } else {
              Race = '-'
            }
            if (applicant.Religion != null) {
              if (applicant.Religion != 'Others') {
                Religion = applicant.Religion
              } else {
                Religion = applicant.Religion
                //Religion = applicant.ReligionOthers
              }
            } else {
              Religion = '-'
            }
            if (applicant.IC != null) {
              IC = applicant.IC
            } else {
              IC = '-'
            }
            if (applicant.IncomeTaxNo != null) {
              IncomeTaxNo = applicant.IncomeTaxNo
            } else {
              IncomeTaxNo = '-'
            }
            if (applicant.LoginEmail != null) {
              Email = applicant.LoginEmail
            } else {
              Email = '-'
            }
            if (applicant.Passport != null) {
              Passport = applicant.Passport
            } else {
              Passport = '-'
            }
            if (applicant.DOB != null) {
              DOB = new Date(applicant.DOB)

              var dob = new Date(DOB)

              //calculate month difference from current date in time
              var month_diff = Date.now() - dob.getTime()

              //convert the calculated difference in date format
              var age_dt = new Date(month_diff)

              //extract year from date
              var year = age_dt.getUTCFullYear()

              //now calculate the age of the user
              Ager = Math.abs(year - 1970)
              DOB = moment(DOB).format('DD/MM/YYYY')
            } else {
              DOB = '-'
              Ager = '-'
            }
            //added 15/1/2021
            if (applicant.MiddleName != null) {
              MiddleName = applicant.MiddleName
            } else {
              MiddleName = ''
            }
            if (applicant.LastName != null) {
              LastName = applicant.LastName
            } else {
              LastName = ''
            }
            if (applicant.PermanentAddress2 != null) {
              PermanentAddress2 = applicant.PermanentAddress2
            } else {
              PermanentAddress2 = '-'
            }
            if (applicant.PermanentAddress3 != null) {
              PermanentAddress3 = applicant.PermanentAddress3
            } else {
              PermanentAddress3 = '-'
            }
            if (applicant.PCity != null) {
              PCity = applicant.PCity
            } else {
              PCity = '-'
            }
            if (applicant.Passport_DtIssue != null) {
              let date1 = new Date(applicant.Passport_DtIssue)
              var date2 = moment(date1).format('DD/MM/YYYY')
              PassDtIssue = date2
            } else {
              PassDtIssue = '-'
            }
            if (applicant.Passport_DtExpiry != null) {
              let date1 = new Date(applicant.Passport_DtExpiry)
              var date2 = moment(date1).format('DD/MM/YYYY')
              PassDtExpiry = date2
            } else {
              PassDtExpiry = '-'
            }
            if (applicant.Nationality != null) {
              if (applicant.Nationality != 'Others') {
                Nationality = applicant.Nationality
              } else {
                Nationality = applicant.Nationality
                //Nationality = applicant.NationalityOthers
              }
            } else {
              Nationality = '-'
            }
          }

          //comment 15/1/2021
          // if (PassportDocument != []) {
          //   if (
          //     PassportDocument.DtIssue != null ||
          //     PassportDocument.DtIssue != ''
          //   ) {
          //     let date1 = new Date(PassportDocument.DtIssue)
          //     var date2 = moment(date1).format('DD/MM/YYYY')
          //     PassDtIssue = date2
          //   } else {
          //     PassDtIssue = '-'
          //   }
          //   if (
          //     PassportDocument.DtExpiry != null ||
          //     PassportDocument.DtExpiry != ''
          //   ) {
          //     let date1 = new Date(PassportDocument.DtExpiry)
          //     var date2 = moment(date1).format('DD/MM/YYYY')
          //     PassDtExpiry = date2
          //   } else {
          //     PassDtExpiry = '-'
          //   }
          // }

          if (document.length != 0) {
            for (let i = 0; i < document.length; i++) {
              let Document = '-'
              let DocNo = '-'
              let DtIssue = '-'
              let DtExpiry = '-'

              if (document[i].Document == null || document[i].Document == '') {
                Document = '-'
              } else {
                Document = document[i].Document
              }
              if (document[i].DocNo == null || document[i].DocNo == '') {
                DocNo = '-'
              } else {
                DocNo = document[i].DocNo
              }
              if (document[i].DtIssue == null || document[i].DtIssue == '') {
                DtIssue = '-'
              } else {
                let date1 = new Date(document[i].DtIssue)
                var date2 = moment(date1).format('DD/MM/YYYY')
                DtIssue = date2
              }
              if (document[i].DtExpiry == null || document[i].DtExpiry == '') {
                DtExpiry = '-'
              } else {
                let date1 = new Date(document[i].DtExpiry)
                var date2 = moment(date1).format('DD/MM/YYYY')
                DtExpiry = date2
              }
              documentList.push({
                Document: Document,
                DocNo: DocNo,
                DtIssue: DtIssue,
                DtExpiry: DtExpiry,
              })
            }
          }

          var content = fs.readFileSync(
            path.resolve('./Templates/', 'CVtemp.docx'),
            'binary'
          )

          var zip = new PizZip(content)
          var doc

          doc = new Docxtemplater(zip)

          //set the templateVariables
          doc.setData({
            Position: Position,
            Name: Name,
            PermanentAddress: PermanentAddress,
            PPostcode: PPostcode,
            PState: PState,
            DOB: DOB,
            PlaceofBirth: PlaceofBirth,
            Race: Race,
            Religion: Religion,
            IC: IC,
            IncomeTaxNo: IncomeTaxNo,
            Email: Email,
            Ager: Ager,
            PassDocumentID: Passport,
            PassDtIssue: PassDtIssue,
            PassDtExpiry: PassDtExpiry,
            docs: documentList,
            //added 15/1/2021
            MiddleName: MiddleName,
            LastName: LastName,
            PermanentAddress2: PermanentAddress2,
            PermanentAddress3: PermanentAddress3,
            PCity: PCity,
            PCountry: PCountry,
            Nationality: Nationality,
          })

          doc.render() //apply them

          var buf = doc.getZip().generate({ type: 'nodebuffer' })

          //calculate date and time
          var today = new Date()
          var dd = String(today.getDate()).padStart(2, '0')
          var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
          var yyyy = today.getFullYear()
          var hh = today.getHours()
          var min = today.getMinutes()
          var sec = today.getSeconds()

          today = yyyy + mm + dd + hh + min + sec

          const updateCv = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input(
              'Position',
              sql.VarChar,
              checkApplicant.recordset[0].Position
            )
            .input(
              'FileCV',
              sql.VarChar,
              checkApplicant.recordset[0].Position +
                '_' +
                applicant.LoginEmail +
                '_CV_' +
                today +
                '.docx'
            )
            .query(queries.updateCV)

          const updateCvDate = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input(
              'Position',
              sql.VarChar,
              checkApplicant.recordset[0].Position
            )
            .input('FileCVCreateDt', sql.DateTime, Date())
            .query(queries.updateCVDate)

          // console.log(
          //   'updateCv: ',
          //   checkApplicant.recordset[0].Position,
          //   ' applicant.LoginEmail: ',
          //   applicant.LoginEmail
          // )
          //create docx file
          fs.writeFileSync(
            path.resolve(
              '../src/assets/UserDoc/' +
                checkApplicant.recordset[0].Position +
                '_' +
                applicant.LoginEmail +
                '_CV_' +
                today +
                '.docx'
            ),
            buf
          )

          const updateGenDoc = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input(
              'Position',
              sql.VarChar,
              checkApplicant.recordset[0].Position
            )
            .input('GenDoc', '1')
            .query(queries.updategenDoc)

          //res.send("Successfully generated CV for " + applicant.Name);
          // return success code
          console.log('Successfully generated CV for ' + applicant.Name)
          return true
        } else {
          //res.send("This Applicant Record's Status is not SET as Review !");
          console.log("This Applicant Record's Status is not SET as Review !")
          return false
        }
      } else {
        //res.send("Login Email and ApplyID are required!");
        console.log('Login Email and ApplyID are required!')
        return false
      }
    } catch (error) {
      //res.status(500);
      //res.send(error.message);
      console.log('Error: ', error)
      return false
    }
  }

  async generateAFE(req, res) {
    try {
      if (req.body.LoginEmail != null && req.body.ApplyID != null) {
        //checking status
        console.log('inside generateafe')
        const pool = await poolPromise

        const checkApplicant = await pool
          .request()
          // .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          .input('Id', sql.VarChar, req.body.ApplyID)
          .query(queries.getApplicantApplyById)

        console.log('after generate')
        //console.log(checkApplicant)

        const Status = await pool
          .request()
          .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          .input('Position', sql.VarChar, checkApplicant.recordset[0].Position)
          .query(queries.getApplicantApplyAllStatus)

        console.log('after Status')
        //console.log(Status)

        if (
          Status.recordset[0].Status == 'Review' ||
          Status.recordset[0].Status == 'Offered'
        ) {
          let DOB = '-'
          let Ager = null
          let admin = '-'
          let applicant = ''
          let document = ''
          let documentData = ''
          let PassportDocument = ''
          let NOK = ''
          let PMUDocument = ''
          let MarineDocument = ''

          let profileImage = ''
          let Position = '-' //documentData
          let Name = '-' //applicant
          let MiddleName = '-'
          let LastName = '-'
          let CountryOfOrigin = '-' //applicant
          let PermanentAddress = '-' //applicant
          let PPostcode = '-' //applicant
          let PState = '-' //applicant
          let Contact_HouseCtryCode = '-' //applicant
          let Contact_MobileCtryCode = '-' //applicant
          //let C = '-' //applicant
          let Contact_Mobile = '-' //applicant
          let Gender = '-' //applicant
          let MaritalStatus = '-' //applicant
          let PlaceofBirth = '-' //applicant
          let Race = '-' //applicant
          let Religion = '-' //applicant
          let IC = '-' //applicant
          let Nationality = '-' //applicant
          let IncomeTaxNo = '-' //applicant
          let Email = '-' //applicant
          let Passport = '-' //applicant
          let PassDtIssue = '-' //passport
          let PassDtExpiry = '-' //passport
          let SeamanBookNo = '-' //applicant
          let SeamanBookDtIssue = '-' //applicant
          let SeamanBookDtExpiry = '-' //applicant
          let SeamanCardNo = '-' //applicant
          let SeamanCardDtIssue = '-' //applicant
          let SeamanCardDtExpiry = '-' //applicant
          let EmergencyContactName = '-'
          let EmergencyContactRelationship = '-'
          let EmergencyContact_MobileCtryCode = '-'
          let EmergencyContact_Mobile = '-'
          let EmergencyContact_HouseCtryCode = '-'
          let EmergencyContact_House = '-'
          let PMUDtIssue = '-'
          let PMUDtExpiry = '-'
          let MarineDtIssue = '-'
          let MarineDtExpiry = '-'
          let Ref1Name = '-'
          let Ref2Name = '-'
          let Ref1Company = '-'
          let Ref2Company = '-'
          let Ref1Designation = '-'
          let Ref2Designation = '-'
          let Ref1Contact = '-'
          let Ref2Contact = '-'
          let NOKList = []
          let documentList = []

          let Q1 = '-'
          let Q2 = '-'
          let Q3 = '-'
          let Q4 = '-'
          let Q5 = '-'
          let Q6 = '-'
          let Q7 = '-'
          let Q8 = '-'
          let Q9 = '-'
          let Q10 = '-'

          let Q5Description = '-'
          let Q6Description = '-'
          let Q7Description = '-'
          let Q8Description = '-'
          let Q9Description = '-'
          let Q10Description = '-'

          let SignatureExecutive = ''
          let SignatureExecutiveName = ''
          let SignDtExecutive = ''
          let SignatureManager = ''
          let SignatureManagerName = ''
          let SignDtManager = ''

          //added 15/1/2021
          let PCity = '-'
          let PermanentAddress2 = '-'
          let PermanentAddress3 = '-'
          let Contact_House = '-'
          let SubsePassport = '-'
          let SubseDtIssue = '-'
          let SubseDtExpiry = '-'
          let EmergencyContactMiddleName = '-'
          let EmergencyContactLastName = '-'
          let EmergencyContactAddress = '-'
          let EmergencyContactAddress2 = '-'
          let EmergencyContactAddress3 = '-'
          let EmergencyContactPostcode = '-'
          let EmergencyContactCity = '-'
          let EmergencyContactState = '-'
          let EmergencyContactCountry = '-'
          let SignatureName = '-'
          let SignatureIcPassport = '-'
          let SignatureDate = '-'

          //poolPromise
          const pool = await poolPromise

          // get admin data
          const resultAdmin = await pool
            .request()
            .input('Id', sql.VarChar, req.body.adminName)
            .query(queries.getAdminDetails)

          admin = resultAdmin.recordset[0]

          console.log('abc admin')

          // get applicant data
          const resultApplicant = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .query(queries.getApplication)

          applicant = resultApplicant.recordset[0]

          console.log('abc applicant')

          //get full documents
          // const resultApplicantDocument = await pool
          //   .request()
          //   //.input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          //   .input('Id', sql.VarChar, req.body.ApplyID)
          //   .query(queries.getApplicantApplyById)

          // document = resultApplicantDocument.recordset
          // documentData = resultApplicantDocument.recordset[0]

          const resultApplicantDocument = await pool
            .request()
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.getApplicantDocumentById)

          document = resultApplicantDocument.recordset
          documentData = resultApplicantDocument.recordset[0]

          console.log('abc doc')
          //console.log(document)
          console.log('abc doc data')
          //console.log(documentData)

          //comment 15/1/2021
          //get passport result
          // const resultPassport = await pool
          //   .request()
          //   .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          //   .input('ApplyID', sql.VarChar, req.body.ApplyID)
          //   .input('Document', sql.VarChar, 'International Passport')
          //   .query(queries.getPassport)

          // PassportDocument = resultPassport.recordset[0]

          //get PMU result
          const resultPMU = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 1)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalMedicalAnswer)

          if (resultPMU.recordset.length != 0) {
            if (resultPMU.recordset[0].CheckupDt != null) {
              let date1 = new Date(resultPMU.recordset[0].CheckupDt)
              var date2 = moment(date1).format('DD/MM/YYYY')
              PMUDtIssue = date2
            } else {
              PMUDtIssue = '-'
            }
            if (resultPMU.recordset[0].ExpiryDt != null) {
              let date1 = new Date(resultPMU.recordset[0].ExpiryDt)
              var date2 = moment(date1).format('DD/MM/YYYY')
              PMUDtExpiry = date2
            } else {
              PMUDtIssue = '-'
            }
          }

          //get Marine result
          const resultMarine = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 2)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalMedicalAnswer)

          if (resultMarine.recordset.length != 0) {
            if (resultMarine.recordset[0].CheckupDt != null) {
              let date1 = new Date(resultMarine.recordset[0].CheckupDt)
              var date2 = moment(date1).format('DD/MM/YYYY')
              MarineDtIssue = date2
            } else {
              MarineDtIssue = '-'
            }
            if (resultMarine.recordset[0].ExpiryDt != null) {
              let date1 = new Date(resultMarine.recordset[0].ExpiryDt)
              var date2 = moment(date1).format('DD/MM/YYYY')
              MarineDtExpiry = date2
            } else {
              MarineDtExpiry = '-'
            }
          }

          //getNOK data
          const resultNOK = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .query(queries.getApplicantNOK)

          NOK = resultNOK.recordset

          //get answer 1
          const answer1 = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 1)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalAnswer)

          if (answer1.recordset.length != 0) {
            if (
              answer1.recordset[0].Answer != null &&
              answer1.recordset[0].Answer != ''
            ) {
              Q1 = answer1.recordset[0].Answer
            } else {
              Q1 = '-'
            }
          }

          const answer2 = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 2)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalAnswer)

          if (answer2.recordset.length != 0) {
            if (
              answer2.recordset[0].Answer != null &&
              answer2.recordset[0].Answer != ''
            ) {
              Q2 = answer2.recordset[0].Answer
            } else {
              Q2 = '-'
            }
          }

          const answer3 = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 3)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalAnswer)

          if (answer3.recordset.length != 0) {
            if (
              answer3.recordset[0].Answer != null &&
              answer3.recordset[0].Answer != ''
            ) {
              Q3 = answer3.recordset[0].Answer
            } else {
              Q3 = '-'
            }
          }

          const answer4 = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 4)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalAnswer)

          if (answer4.recordset.length != 0) {
            if (
              answer4.recordset[0].Answer != null &&
              answer4.recordset[0].Answer != ''
            ) {
              Q4 = answer4.recordset[0].Answer
            } else {
              Q4 = '-'
            }
          }

          const answer5 = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 5)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalAnswer)

          if (answer5.recordset.length != 0) {
            if (
              answer5.recordset[0].Answer != null &&
              answer5.recordset[0].Answer != ''
            ) {
              Q5 = answer5.recordset[0].Answer
            } else {
              Q5 = '-'
            }
            if (
              answer5.recordset[0].Description != null &&
              answer5.recordset[0].Description != ''
            ) {
              Q5Description = answer5.recordset[0].Description
            } else {
              Q5Description = '-'
            }
          }

          const answer6 = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 6)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalAnswer)

          if (answer6.recordset.length != 0) {
            if (
              answer6.recordset[0].Answer != null &&
              answer6.recordset[0].Answer != ''
            ) {
              Q6 = answer6.recordset[0].Answer
            } else {
              Q6 = '-'
            }
            if (
              answer6.recordset[0].Description != null &&
              answer6.recordset[0].Description != ''
            ) {
              Q6Description = answer6.recordset[0].Description
            } else {
              Q6Description = '-'
            }
          }

          const answer7 = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 7)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalAnswer)

          if (answer7.recordset.length != 0) {
            if (
              answer7.recordset[0].Answer != null &&
              answer7.recordset[0].Answer != ''
            ) {
              Q7 = answer7.recordset[0].Answer
            } else {
              Q7 = '-'
            }
            if (
              answer7.recordset[0].Description != null &&
              answer7.recordset[0].Description != ''
            ) {
              Q7Description = answer7.recordset[0].Description
            } else {
              Q7Description = '-'
            }
          }

          const answer8 = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 8)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalAnswer)

          if (answer8.recordset.length != 0) {
            if (
              answer8.recordset[0].Answer != null &&
              answer8.recordset[0].Answer != ''
            ) {
              Q8 = answer8.recordset[0].Answer
            } else {
              Q8 = '-'
            }
            if (
              answer8.recordset[0].Description != null &&
              answer8.recordset[0].Description != ''
            ) {
              Q8Description = answer8.recordset[0].Description
            } else {
              Q8Description = '-'
            }
          }

          const answer9 = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 9)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalAnswer)

          if (answer9.recordset.length != 0) {
            if (
              answer9.recordset[0].Answer != null &&
              answer9.recordset[0].Answer != ''
            ) {
              Q9 = answer9.recordset[0].Answer
            } else {
              Q9 = '-'
            }
            if (
              answer9.recordset[0].Description != null &&
              answer9.recordset[0].Description != ''
            ) {
              Q9Description = answer9.recordset[0].Description
            } else {
              Q9Description = '-'
            }
          }

          const answer10 = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input('QuestionId', sql.SmallInt, 10)
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.generalAnswer)

          if (answer10.recordset.length != 0) {
            if (
              answer10.recordset[0].Answer != null &&
              answer10.recordset[0].Answer != ''
            ) {
              Q10 = answer10.recordset[0].Answer
            } else {
              Q10 = '-'
            }
            if (
              answer10.recordset[0].Description != null &&
              answer10.recordset[0].Description != ''
            ) {
              Q10Description = answer10.recordset[0].Description
            } else {
              Q10Description = '-'
            }
          }

          if (checkApplicant.recordset[0].Position != null) {
            Position = checkApplicant.recordset[0].Position
          } else {
            Position = '-'
          }

          if (applicant != []) {
            if (applicant.Name != null) {
              Name = applicant.Name
            } else {
              Name = '-'
            }
            if (applicant.MiddleName != null) {
              MiddleName = applicant.MiddleName
            } else {
              MiddleName = '-'
            }
            if (applicant.LastName != null) {
              LastName = applicant.LastName
            } else {
              LastName = '-'
            }
            if (applicant.PermanentAddress != null) {
              PermanentAddress = applicant.PermanentAddress
            } else {
              PermanentAddress = '-'
            }
            if (applicant.PPostcode != null) {
              PPostcode = applicant.PPostcode
            } else {
              PPostcode = '-'
            }
            if (applicant.PState != null) {
              if (applicant.PState != 'Others') {
                PState = applicant.PState
              } else {
                PState = applicant.PState
                //PState = applicant.PStateOthers
              }
            } else {
              PState = '-'
            }
            if (applicant.CountryOfOrigin != null) {
              CountryOfOrigin = applicant.CountryOfOrigin
            } else {
              CountryOfOrigin = '-'
            }
            if (applicant.Contact_HouseCtryCode != null) {
              Contact_HouseCtryCode = applicant.Contact_HouseCtryCode
            } else {
              Contact_HouseCtryCode = '-'
            }
            if (applicant.Contact_MobileCtryCode != null) {
              Contact_MobileCtryCode = applicant.Contact_MobileCtryCode
            } else {
              Contact_MobileCtryCode = '-'
            }
            // if (applicant.Contact_House != null) {
            //   C = applicant.Contact_House
            // } else {
            //   C = '-'
            // }
            if (applicant.Contact_Mobile != null) {
              Contact_Mobile = applicant.Contact_Mobile
            } else {
              Contact_Mobile = '-'
            }
            if (applicant.Gender != null) {
              try{ const gender = await pool
                .request()
                .input('id', sql.VarChar, applicant.Gender)
                .query(queries.getNameById)
              Gender = gender.recordset[0].TableField}catch{Gender = applicant.Gender}
             
            } else {
              Gender = '-'
            }
            if (applicant.MaritalStatus != null) {
              MaritalStatus = applicant.MaritalStatus
            } else {
              MaritalStatus = '-'
            }
            if (applicant.PlaceofBirth != null) {
              PlaceofBirth = applicant.PlaceofBirth
            } else {
              PlaceofBirth = '-'
            }
            if (applicant.Race != null) {
              if (applicant.Race != 'Others') {
                Race = applicant.Race
              } else {
                Race = applicant.Race
                //Race = applicant.RaceOthers
              }
            } else {
              Race = '-'
            }
            if (applicant.Religion != null) {
              if (applicant.Religion != 'Others') {
                Religion = applicant.Religion
              } else {
                Religion = applicant.Religion
                //Religion = applicant.ReligionOthers
              }
            } else {
              Religion = '-'
            }
            if (applicant.IC != null) {
              IC = applicant.IC
            } else {
              IC = '-'
            }
            if (applicant.Nationality != null) {
              if (applicant.Nationality != 'Others') {
                Nationality = applicant.Nationality
              } else {
                Nationality = applicant.Nationality
                //Nationality = applicant.NationalityOthers
              }
            } else {
              Nationality = '-'
            }
            if (applicant.IncomeTaxNo != null) {
              IncomeTaxNo = applicant.IncomeTaxNo
            } else {
              IncomeTaxNo = '-'
            }
            if (applicant.Email != null) {
              Email = applicant.Email
            } else {
              Email = '-'
            }
            if (applicant.Passport != null) {
              Passport = applicant.Passport
            } else {
              Passport = '-'
            }

            if (applicant.SeamanBookNo != null) {
              SeamanBookNo = applicant.SeamanBookNo
            } else {
              SeamanBookNo = '-'
            }

            if (applicant.SeamanBook_DtIssue != null) {
              let date1 = new Date(applicant.SeamanBook_DtIssue)
              var date2 = moment(date1).format('DD/MM/YYYY')
              SeamanBookDtIssue = date2
            } else {
              SeamanBookDtIssue = '-'
            }

            if (applicant.SeamanBook_DtExpiry != null) {
              let date1 = new Date(applicant.SeamanBook_DtExpiry)
              var date2 = moment(date1).format('DD/MM/YYYY')
              SeamanBookDtExpiry = date2
            } else {
              SeamanBookDtExpiry = '-'
            }

            if (applicant.SeamanCardNo != null) {
              SeamanCardNo = applicant.SeamanCardNo
            } else {
              SeamanCardNo = '-'
            }

            if (applicant.SeamanCard_DtIssue != null) {
              let date1 = new Date(applicant.SeamanCard_DtIssue)
              var date2 = moment(date1).format('DD/MM/YYYY')
              SeamanCardDtIssue = date2
            } else {
              SeamanCardDtIssue = '-'
            }

            if (applicant.SeamanCard_DtExpiry != null) {
              let date1 = new Date(applicant.SeamanCard_DtExpiry)
              var date2 = moment(date1).format('DD/MM/YYYY')
              SeamanCardDtExpiry = date2
            } else {
              SeamanCardDtExpiry = '-'
            }

            if (applicant.EmergencyContactName != null) {
              EmergencyContactName = applicant.EmergencyContactName
            } else {
              EmergencyContactName = '-'
            }
            if (applicant.EmergencyContactRelationship != null) {
              if(applicant.EmergencyContactRelationship )
              try{const relationship = await pool
                .request()
                .input('id', sql.VarChar, applicant.EmergencyContactRelationship)
                .query(queries.getNameById)
              EmergencyContactRelationship = relationship.recordset[0].TableField }catch(e){
                EmergencyContactRelationship =applicant.EmergencyContactRelationship;
              }
              
            } else {
              EmergencyContactRelationship = '-'
            }
            if (applicant.EmergencyContact_MobileCtryCode != null) {
              EmergencyContact_MobileCtryCode =
                applicant.EmergencyContact_MobileCtryCode
            } else {
              EmergencyContact_MobileCtryCode = '-'
            }
            if (applicant.EmergencyContact_Mobile != null) {
              EmergencyContact_Mobile = applicant.EmergencyContact_Mobile
            } else {
              EmergencyContact_Mobile = '-'
            }
            if (applicant.EmergencyContact_HouseCtryCode != null) {
              EmergencyContact_HouseCtryCode =
                applicant.EmergencyContact_HouseCtryCode
            } else {
              EmergencyContact_HouseCtryCode = '-'
            }
            if (applicant.EmergencyContact_House != null) {
              EmergencyContact_House = applicant.EmergencyContact_House
            } else {
              EmergencyContact_House = '-'
            }
            if (applicant.Ref1Name != null) {
              Ref1Name = applicant.Ref1Name
            } else {
              Ref1Name = '-'
            }
            if (applicant.Ref2Name != null) {
              Ref2Name = applicant.Ref2Name
            } else {
              Ref2Name = '-'
            }
            if (applicant.Ref1Company != null) {
              Ref1Company = applicant.Ref1Company
            } else {
              Ref1Company = '-'
            }
            if (applicant.Ref2Company != null) {
              Ref2Company = applicant.Ref2Company
            } else {
              Ref2Company = '-'
            }
            if (applicant.Ref1Designation != null) {
              Ref1Designation = applicant.Ref1Designation
            } else {
              Ref1Designation = '-'
            }
            if (applicant.Ref2Designation != null) {
              Ref2Designation = applicant.Ref2Designation
            } else {
              Ref2Designation = '-'
            }
            if (applicant.Ref1Contact != null) {
              Ref1Contact = applicant.Ref1Contact
            } else {
              Ref1Contact = '-'
            }
            if (applicant.Ref2Contact != null) {
              Ref2Contact = applicant.Ref2Contact
            } else {
              Ref2Contact = '-'
            }

            if (SignDtManager == null && SignDtManager == '') {
              var today = new Date()
              var dd = String(today.getDate()).padStart(2, '0')
              var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
              var yyyy = today.getFullYear()
              var hh = today.getHours()
              var min = today.getMinutes()
              var sec = today.getSeconds()

              today = dd + '/' + mm + '/' + yyyy
              SignDtExecutive = today
              SignDtManager = today
            }

            if (applicant.DOB != null) {
              DOB = new Date(applicant.DOB)

              var dob = new Date(DOB)

              //calculate month difference from current date in time
              var month_diff = Date.now() - dob.getTime()

              //convert the calculated difference in date format
              var age_dt = new Date(month_diff)

              //extract year from date
              var year = age_dt.getUTCFullYear()

              //now calculate the age of the user
              Ager = Math.abs(year - 1970)
              // DOB =
              //   applicant.DOB.getDate() +
              //   '/' +
              //   (applicant.DOB.getMonth() + 1) +
              //   '/' +
              //   applicant.DOB.getFullYear()
              console.log(Ager)
            } else {
              DOB = '-'
            }

            if (applicant.FileName != null) {
              //profileImage = applicant.FilePath + applicant.FileName;
              profileImage = '../src/assets/UserDoc/' + applicant.FileName

              console.log('check profile image')
              //console.log(profileImage)
              //profileImage = ""
            }

            //added 15/1/2021
            if (applicant.PCity != null) {
              PCity = applicant.PCity
            } else {
              PCity = '-'
            }
            if (applicant.PermanentAddress2 != null) {
              PermanentAddress2 = applicant.PermanentAddress2
            } else {
              PermanentAddress2 = '-'
            }
            if (applicant.PermanentAddress3 != null) {
              PermanentAddress3 = applicant.PermanentAddress3
            } else {
              PermanentAddress3 = '-'
            }
            if (applicant.Contact_House != null) {
              Contact_House = applicant.Contact_House
            } else {
              Contact_House = '-'
            }
            if (applicant.SubsePassport != null) {
              SubsePassport = applicant.SubsePassport
            } else {
              SubsePassport = '-'
            }
            if (applicant.SubsePassport_DtIssue != null) {
              let date1 = new Date(applicant.SubsePassport_DtIssue)
              var date2 = moment(date1).format('DD/MM/YYYY')
              SubseDtIssue = date2
            } else {
              SubseDtIssue = '-'
            }
            if (applicant.SubsePassport_DtExpiry != null) {
              let date1 = new Date(applicant.SubsePassport_DtExpiry)
              var date2 = moment(date1).format('DD/MM/YYYY')
              SubseDtExpiry = date2
            } else {
              SubseDtExpiry = '-'
            }
            if (applicant.EmergencyContactMiddleName != null) {
              EmergencyContactMiddleName = applicant.EmergencyContactMiddleName
            } else {
              EmergencyContactMiddleName = '-'
            }
            if (applicant.EmergencyContactLastName != null) {
              EmergencyContactLastName = applicant.EmergencyContactLastName
            } else {
              EmergencyContactLastName = '-'
            }
            if (applicant.EmergencyContact_Address != null) {
              EmergencyContactAddress = applicant.EmergencyContact_Address
            } else {
              EmergencyContactAddress = '-'
            }
            if (applicant.EmergencyContact_Address2 != null) {
              EmergencyContactAddress2 = applicant.EmergencyContact_Address2
            } else {
              EmergencyContactAddress2 = '-'
            }
            if (applicant.EmergencyContact_Address3 != null) {
              EmergencyContactAddress3 = applicant.EmergencyContact_Address3
            } else {
              EmergencyContactAddress3 = '-'
            }
            if (applicant.EmergencyContact_Postcode != null) {
              EmergencyContactPostcode = applicant.EmergencyContact_Postcode
            } else {
              EmergencyContactPostcode = '-'
            }
            if (applicant.EmergencyContact_City != null) {
              EmergencyContactCity = applicant.EmergencyContact_City
            } else {
              EmergencyContactCity = '-'
            }
            if (applicant.EmergencyContact_State != null) {
              EmergencyContactState = applicant.EmergencyContact_State
            } else {
              EmergencyContactState = '-'
            }
            if (applicant.EmergencyContact_Country != null) {
              EmergencyContactCountry = applicant.EmergencyContact_Country
            } else {
              EmergencyContactCountry = '-'
            }
            if (applicant.SignatureName != null) {
              SignatureName = applicant.SignatureName
            } else {
              SignatureName = '-'
            }
            if (applicant.SignatureIcPassport != null) {
              SignatureIcPassport = applicant.SignatureIcPassport
            } else {
              SignatureIcPassport = '-'
            }
            if (applicant.SignatureDate != null) {
              SignatureDate = applicant.SignatureDate
            } else {
              SignatureDate = '-'
            }
            if (applicant.Passport_DtIssue != null) {
              let date1 = new Date(applicant.Passport_DtIssue)
              var date2 = moment(date1).format('DD/MM/YYYY')
              PassDtIssue = date2
            } else {
              PassDtIssue = '-'
            }
            if (applicant.Passport_DtExpiry != null) {
              let date1 = new Date(applicant.Passport_DtExpiry)
              var date2 = moment(date1).format('DD/MM/YYYY')
              PassDtExpiry = date2
            } else {
              PassDtExpiry = '-'
            }
          }

          if (admin !== null && admin != []) {
            if (admin.Signature != null) {
              SignatureExecutive = path.resolve(
                '../src/assets/UserDoc/' + admin.Signature
              )
            } else {
              SignatureExecutive = '-'
            }
            if (admin.SignatureAdmin != null) {
              SignatureManager = path.resolve(
                '../src/assets/UserDoc/' + admin.SignatureAdmin
              )
            } else {
              SignatureManager = '-'
            }
            if (admin.UserName != null) {
              SignatureExecutiveName = admin.UserName
            } else {
              SignatureExecutiveName = '-'
            }
            if (admin.ManagerName != null) {
              SignatureManagerName = admin.ManagerName
            } else {
              SignatureManagerName = '-'
            }
          }

          if (NOK.length != 0) {
            for (let i = 0; i < NOK.length; i++) {
              let nokName = ''
              let nokMiddleName = ''
              let nokLastName = ''
              let nokHandicap = ''
              let nokWorkStudy = ''
              let nokRelationship = ''
              let nokOccupaction = ''
              let nokAge = ''
              let nokGender = ''

              if (NOK[i].NOKName == null || NOK[i].NOKName == '') {
                nokName = '-'
              } else {
                nokName = NOK[i].NOKName
              }
              if (NOK[i].NOKMiddleName == null || NOK[i].NOKMiddleName == '') {
                nokMiddleName = '-'
              } else {
                nokMiddleName = NOK[i].NOKMiddleName
              }
              if (NOK[i].NOKLastName == null || NOK[i].NOKLastName == '') {
                nokLastName = '-'
              } else {
                nokLastName = NOK[i].NOKLastName
              }
              if (NOK[i].NOKHandicap == null || NOK[i].NOKHandicap == '') {
                nokHandicap = '-'
              } else {
                nokHandicap = NOK[i].NOKHandicap
              }
              if (NOK[i].NOKWorkStudy == null || NOK[i].NOKWorkStudy == '') {
                nokWorkStudy = '-'
              } else {
                nokWorkStudy = NOK[i].NOKWorkStudy
              }
              if (
                NOK[i].NOKRelationship == null ||
                NOK[i].NOKRelationship == ''
              ) {
                nokRelationship = '-'
              } else {
                try{  const relationship = await pool
                  .request()
                  .input('id', sql.VarChar, NOK[i].NOKRelationship)
                  .query(queries.getNameById)
                  nokRelationship = relationship.recordset[0].TableField}catch{
                    nokRelationship = NOK[i].NOKRelationship
                }
              
              }
              if (NOK[i].NOKEmployment == null || NOK[i].NOKEmployment == '') {
                nokOccupaction = '-'
              } else {
                nokOccupaction = NOK[i].NOKEmployment
              }
              if (NOK[i].NOKAge == null || NOK[i].NOKAge == '') {
                nokAge = '-'
              } else {
                nokAge = NOK[i].NOKAge
              }
              if (NOK[i].NOKGender == null || NOK[i].NOKGender == '') {
                
                nokGender = '-'
              } else {
                try{ const gender = await pool
                  .request()
                  .input('id', sql.VarChar, NOK[i].NOKGender)
                  .query(queries.getNameById)
                nokGender = gender.recordset[0].TableField}catch(e){
                  nokGender =NOK[i].NOKGender
                }
               
              }
              NOKList.push({
                NOKName: nokName,
                NOKMiddleName: nokMiddleName,
                NOKLastName: nokLastName,
                NOKHandicap: nokHandicap,
                NOKWorkStudy: nokWorkStudy,
                NOKRelationship: nokRelationship,
                NOKOccupaction: nokOccupaction,
                NOKAge: nokAge,
                NOKGender: nokGender,
              })
            }
          }

          if (document.length != 0 && document != []) {
            console.log('document!!!!!!!!!!!!!')
            //console.log(document)
            for (let i = 0; i < document.length; i++) {
              let Document = ''
              let DocNo = ''
              let Type = ''
              let DtIssue = ''
              let DtExpiry = ''
              let Grade = ''
              let IssueAuth = ''

              if (document[i].Document == null || document[i].Document == '') {
                Document = '-'
              } else {
                Document = document[i].Document
              }
              if (document[i].DocNo == null || document[i].DocNo == '') {
                DocNo = '-'
              } else {
                DocNo = document[i].DocNo
              }
              if (document[i].Type == null || document[i].Type == '') {
                Type = '-'
              } else {
                Type = document[i].Type
              }
              if (document[i].DtIssue == null || document[i].DtIssue == '') {
                DtIssue = '-'
              } else {
                let date1 = new Date(document[i].DtIssue)
                var date2 = moment(date1).format('DD/MM/YYYY')
                DtIssue = date2
              }
              if (document[i].DtExpiry == null || document[i].DtExpiry == '') {
                DtExpiry = '-'
              } else {
                let date1 = new Date(document[i].DtExpiry)
                var date2 = moment(date1).format('DD/MM/YYYY')
                DtExpiry = date2
              }
              if (document[i].Grade == null || document[i].Grade == '') {
                Grade = '-'
              } else {
                Grade = document[i].Grade
              }
              if (
                document[i].IssuingAuthority == null ||
                document[i].IssuingAuthority == ''
              ) {
                IssueAuth = '-'
              } else {
                IssueAuth = document[i].IssuingAuthority
              }
              documentList.push({
                Document: Document,
                DocNo: DocNo,
                Type: Type,
                DtIssue: DtIssue,
                DtExpiry: DtExpiry,
                Grade: Grade,
                IssueAuth: IssueAuth,
              })
            }
          }

          //commented 15/1/2021
          // if (PassportDocument != []) {
          //   if (PassportDocument.DtIssue != null) {
          //     let date1 = new Date(PassportDocument.DtIssue)
          //     var date2 = moment(date1).format('DD/MM/YYYY')
          //     PassDtIssue = date2
          //   } else {
          //     PassDtIssue = '-'
          //   }
          //   if (PassportDocument.DtExpiry != null) {
          //     let date1 = new Date(PassportDocument.DtExpiry)
          //     var date2 = moment(date1).format('DD/MM/YYYY')
          //     PassDtExpiry = date2
          //   } else {
          //     PassDtExpiry = '-'
          //   }
          // } else {
          //   PassDtIssue = '-'
          //   PassDtExpiry = '-'
          // }

          var content = fs.readFileSync(
            path.resolve('./Templates/', 'AFEtemp.docx'),
            'binary'
          )

          var zip = new PizZip(content)
          var doc
          var imageModule = new ImageModule(opts)
          doc = new Docxtemplater(zip, { modules: [imageModule] })

          //set the templateVariables
          try {
            doc.setData({
              Position: Position,
              Name: Name,
              MiddleName: MiddleName,
              LastName: LastName,
              PermanentAddress: PermanentAddress,
              PPostcode: PPostcode,
              PState: PState,
              DOB: DOB,
              CountryOfOrigin: CountryOfOrigin,
              PlaceofBirth: PlaceofBirth,
              Race: Race,
              Religion: Religion,
              Gender: Gender,
              IC: IC,
              IncomeTaxNo: IncomeTaxNo,
              Email: Email,
              MaritalStatus: MaritalStatus,
              Contact_HouseCtryCode: Contact_HouseCtryCode,
              Contact_MobileCtryCode: Contact_MobileCtryCode,
              //C: C,
              Contact_Mobile: Contact_Mobile,
              Nationality: Nationality,
              SeamanBookNo: SeamanBookNo,
              SeamanBookDtIssue: SeamanBookDtIssue,
              SeamanBookDtExpiry: SeamanBookDtExpiry,
              SeamanCardNo: SeamanCardNo,
              SeamanCardDtIssue: SeamanCardDtIssue,
              SeamanCardDtExpiry: SeamanCardDtExpiry,
              Ager: Ager,
              Passport: Passport,
              PassDtIssue: PassDtIssue,
              PassDtExpiry: PassDtExpiry,
              image: applicant.FileName,
              EmergencyContactName: EmergencyContactName,
              EmergencyContactRelationship: EmergencyContactRelationship,
              EmergencyContact_MobileCtryCode: EmergencyContact_MobileCtryCode,
              EmergencyContact_Mobile: EmergencyContact_Mobile,
              EmergencyContact_HouseCtryCode: EmergencyContact_HouseCtryCode,
              EmergencyContact_House: EmergencyContact_House,
              PMUDtIssue: PMUDtIssue,
              PMUDtExpiry: PMUDtExpiry,
              MarineDtIssue: MarineDtIssue,
              MarineDtExpiry: MarineDtExpiry,
              Ref1Name: Ref1Name,
              Ref2Name: Ref2Name,
              Ref1Company: Ref1Company,
              Ref2Company: Ref2Company,
              Ref1Designation: Ref1Designation,
              Ref2Designation: Ref2Designation,
              Ref1Contact: Ref1Contact,
              Ref2Contact: Ref2Contact,
              docs: documentList,
              NOK: NOKList,
              profileImage: profileImage,
              Q1: Q1,
              Q2: Q2,
              Q3: Q3,
              Q4: Q4,
              Q5: Q5,
              Q6: Q6,
              Q7: Q7,
              Q8: Q8,
              Q9: Q9,
              Q10: Q10,
              Q5Description: Q5Description,
              Q6Description: Q6Description,
              Q7Description: Q7Description,
              Q8Description: Q8Description,
              Q9Description: Q9Description,
              Q10Description: Q10Description,
              SignDtExecutive: SignDtExecutive,
              SignDtManager: SignDtManager,
              SignatureExecutive: SignatureExecutive,
              SignatureExecutiveName: SignatureExecutiveName,
              SignatureManager: SignatureManager,
              SignatureManagerName: SignatureManagerName,
              //added 15/1/2021
              PCity: PCity,
              PermanentAddress2: PermanentAddress2,
              PermanentAddress3: PermanentAddress3,
              Contact_House: Contact_House,
              SubsePassport: SubsePassport,
              SubseDtIssue: SubseDtIssue,
              SubseDtExpiry: SubseDtExpiry,
              EmergencyContactMiddleName: EmergencyContactMiddleName,
              EmergencyContactLastName: EmergencyContactLastName,
              EmergencyContactAddress: EmergencyContactAddress,
              EmergencyContactAddress2: EmergencyContactAddress2,
              EmergencyContactAddress3: EmergencyContactAddress3,
              EmergencyContactPostcode: EmergencyContactPostcode,
              EmergencyContactCity: EmergencyContactCity,
              EmergencyContactState: EmergencyContactState,
              EmergencyContactCountry: EmergencyContactCountry,
              SignatureName: SignatureName,
              SignatureIcPassport: SignatureIcPassport,
              SignatureDate: SignatureDate,
            })
            doc.render() //apply them

            var buf = doc
              .getZip()
              .generate({ type: 'nodebuffer', compression: 'DEFLATE' })

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0')
            var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
            var yyyy = today.getFullYear()
            var hh = today.getHours()
            var min = today.getMinutes()
            var sec = today.getSeconds()

            today = yyyy + mm + dd + hh + min + sec

            const updateAFE = await pool
              .request()
              .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
              .input(
                'Position',
                sql.VarChar,
                checkApplicant.recordset[0].Position
              )
              .input(
                'FileAFE',
                sql.VarChar,
                checkApplicant.recordset[0].Position +
                  '_' +
                  applicant.LoginEmail +
                  '_AFE_' +
                  today +
                  '.docx'
              )
              .query(queries.updateAFE)

            const updateAFEDate = await pool
              .request()
              .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
              .input(
                'Position',
                sql.VarChar,
                checkApplicant.recordset[0].Position
              )
              .input('FileAFECreateDt', sql.DateTime, Date())
              .query(queries.updateAFEDate)

            const updateGenDoc = await pool
              .request()
              .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
              .input(
                'Position',
                sql.VarChar,
                checkApplicant.recordset[0].Position
              )
              .input('GenDoc', '1')
              .query(queries.updategenDoc)
            // console.log(
            //   'updateAFE: ',
            //   checkApplicant.recordset[0].Position,
            //   ' applicant.LoginEmail: ',
            //   applicant.LoginEmail
            // )
            fs.writeFileSync(
              path.resolve(
                '../src/assets/UserDoc/' +
                  checkApplicant.recordset[0].Position +
                  '_' +
                  applicant.LoginEmail +
                  '_AFE_' +
                  today +
                  '.docx'
              ),
              buf
            )

            //res.send("Successfully generated AFE for " + applicant.Name);
            // return success code
            console.log('Successfully generated AFE for ' + applicant.Name)
            return true
          } catch (error) {
            res.status(400)
            res.send('Error Message: ' + error.message)
            console.log('Error: ', error)
            return false
          }
        } else {
          //res.send("This Applicant Record's Status is not SET as Review !");
          console.log("This Applicant Record's Status is not SET as Review !")
          return false
        }
      } else {
        //res.send("All fields are required!");
        console.log('All fields are required!')
        return false
      }
    } catch (error) {
      //res.status(500);
      //res.send("Error Message: " + error.message);
      console.log('Error: ', error)
      return false
    }
  }

  async generateSEA(req, res) {
    try {
      if (req.body.LoginEmail != null && req.body.ApplyID != null) {
        //checking status
        const pool = await poolPromise

        const checkApplicant = await pool
          .request()
          //.input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          .input('Id', sql.VarChar, req.body.ApplyID)
          .query(queries.getApplicantApplyById)

        //console.log(checkApplicant)

        const Status = await pool
          .request()
          .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
          .input('Position', sql.VarChar, checkApplicant.recordset[0].Position)
          .query(queries.getApplicantApplyAllStatus)

        if (Status.recordset[0].Status == 'Offered') {
          let DOB = '-'
          let applicant = ''
          let admin = ''
          let applicantApply = ''
          let document = ''
          let documentData = ''
          let PassportDocument = ''
          let NOK = ''

          let SubmitDt = '-'
          let NameOfVessel = '-'
          let Name = '-'
          let MiddleName = '-'
          let LastName = '-'
          let CountryOfOrigin = '-' //applicant
          let Nationality = '-'
          let IC = '-'
          let PlaceofBirth = '-'
          let PermanentAddress = '-'
          let PPostcode = '-'
          let PState = '-'
          let Contact_HouseCtryCode = '-'
          let Contact_MobileCtryCode = '-'
          //let C = '-'
          let Contact_Mobile = '-'
          let Email = '-'
          let Passport = '-'
          let PassportDtExpiry = '-'
          let SeamanBook = '-'
          let SeamanBookDtExpiry = '-'
          let SeamanID = '-'
          let SeamanIDDtExpiry = '-'
          let COCNo = '-'
          let COC_DtExpiry = '-'
          let CORNo = '-'
          let COR_DtExpiry = '-'
          let Position = '-'
          let ContactPeriod = '-'
          let RepatriationHomePort = '-'
          let IMONo = '-'
          let PortofRegistry = '-'
          let Allowance = '-'
          let StandbyRate = '-'
          let DailyRate = '-'
          let ConfirmBy = '-'
          let ConfirmByName = '-'
          let ConfirmDt = '-'
          let OtherAllowance = '-'
          let Currency = '-'

          let SignatureExecutive = ''
          let SignatureExecutiveName = ''
          let SignDtExecutive = ''
          let SignatureManager = ''
          let SignatureManagerName = ''
          let SignDtManager = ''

          //added 15/1/2021
          let PermanentAddress2 = '-'
          let PermanentAddress3 = '-'
          let PCity = '-'
          let Contact_House = '-'
          let SubseDtExpiry = '-'
          let SubsePassport = '-'
          let NOKName = '-'
          let NOKRelationship = '-'
          let NokContactNumber = '-'
          let NOKMiddleName = '-'
          let NOKLastName = '-'
          let NOKCtryCode = '-'
          let NOKAddress = '-'
          let NOKAddress2 = '-'
          let NOKAddress3 = '-'

          //get data from dbo.applicant
          const pool = await poolPromise

          // get admin data
          const resultAdmin = await pool
            .request()
            .input('Id', sql.VarChar, req.body.adminName)
            .query(queries.getAdminDetails)

          admin = resultAdmin.recordset[0]

          // get applicant data
          const resultApplicant = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .query(queries.getApplication)

          applicant = resultApplicant.recordset[0]

          //get full documents
          const resultApplicantDocument = await pool
            .request()
            .input('ApplyID', sql.VarChar, req.body.ApplyID)
            .query(queries.getApplicantDocumentById)

          document = resultApplicantDocument.recordset
          documentData = resultApplicantDocument.recordset[0]

          //get applicant apply
          const resultApplicantApply = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .input(
              'Position',
              sql.VarChar,
              checkApplicant.recordset[0].Position
            )
            .query(queries.getApplicantApplyAllStatus)

          applicantApply = resultApplicantApply.recordset[0]

          console.log('applicantApply')
          //console.log(resultApplicantApply)

          const resultNOK = await pool
            .request()
            .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
            .query(queries.getApplicantNOK)

          NOK = resultNOK.recordset[0]

          if (applicantApply != []) {
            if (applicantApply.SubmitDt != null) {
              let date1 = new Date(applicantApply.SubmitDt)
              var date2 = moment(date1).format('DD/MM/YYYY')
              SubmitDt = date2
            } else {
              SubmitDt = '-'
            }
            if (applicantApply.NameofVessel != null) {
              NameOfVessel = applicantApply.NameofVessel
            } else {
              NameOfVessel = '-'
            }
            if (applicantApply.ContractPeriodFromInMth != null) {
              ContactPeriod = applicantApply.ContractPeriodFromInMth
            } else {
              ContactPeriod = '-'
            }
            if (applicantApply.IMONo != null) {
              IMONo = applicantApply.IMONo
            } else {
              IMONo = '-'
            }
            if (applicantApply.PortofRegistry != null) {
              PortofRegistry = applicantApply.PortofRegistry
            } else {
              PortofRegistry = '-'
            }
            if (applicantApply.Allowance != null) {
              Allowance = applicantApply.Allowance
            } else {
              Allowance = '-'
            }
            if (applicantApply.StandbyRate != null) {
              StandbyRate = applicantApply.StandbyRate
            } else {
              StandbyRate = '-'
            }
            if (applicantApply.DailyRate != null) {
              DailyRate = applicantApply.DailyRate
            } else {
              DailyRate = '-'
            }
            if (applicantApply.ConfirmBy != null) {
              ConfirmBy = applicantApply.ConfirmBy
            } else {
              ConfirmBy = '-'
            }
            if (applicantApply.ConfirmByName != null) {
              ConfirmByName = applicantApply.ConfirmByName
            } else {
              ConfirmByName = '-'
            }
            if (applicantApply.ConfirmDt != null) {
              ConfirmDt = applicantApply.ConfirmDt
            } else {
              ConfirmDt = '-'
            }
            if (applicantApply.TypesofAllowance != null) {
              OtherAllowance = applicantApply.TypesofAllowance
            } else {
              OtherAllowance = '-'
            }
            if (applicantApply.Currency != null) {
              Currency = applicantApply.Currency
            } else {
              Currency = '-'
            }
          }
          if (applicant.Passport_DtExpiry != null) {
            let date1 = new Date(applicant.Passport_DtExpiry)
            var date2 = moment(date1).format('DD/MM/YYYY')
            PassportDtExpiry = date2
          } else {
            PassportDtExpiry = '-'
          }
          //comment 15/1/2021
          // if (PassportDocument != []) {
          //   if (PassportDocument.DtExpiry != null) {
          //     let date1 = new Date(PassportDocument.DtExpiry)
          //     var date2 = moment(date1).format('DD/MM/YYYY')
          //     PassportDtExpiry = date2
          //   } else {
          //     PassportDtExpiry = '-'
          //   }
          // }

          if (applicant != [] || applicant != null) {
            if (applicant.Name != null) {
              Name = applicant.Name
            } else {
              Name = '-'
            }
            if (applicant.MiddleName != null) {
              MiddleName = applicant.MiddleName
            } else {
              MiddleName = '-'
            }
            if (applicant.LastName != null) {
              LastName = applicant.LastName
            } else {
              LastName = '-'
            }
            if (applicant.CountryOfOrigin != null) {
              CountryOfOrigin = applicant.CountryOfOrigin
            } else {
              CountryOfOrigin = '-'
            }
            if (applicant.Nationality != null) {
              if (applicant.Nationality != 'Others') {
                Nationality = applicant.Nationality
              } else {
                Nationality = applicant.Nationality
                //Nationality = applicant.NationalityOthers
              }
            } else {
              Nationality = '-'
            }

            if (applicant.IC != null) {
              IC = applicant.IC
            } else {
              IC = '-'
            }
            if (applicant.PlaceofBirth != null) {
              PlaceofBirth = applicant.PlaceofBirth
            } else {
              PlaceofBirth = '-'
            }
            if (applicant.PermanentAddress != null) {
              PermanentAddress = applicant.PermanentAddress
            } else {
              PermanentAddress = '-'
            }
            if (applicant.PPostcode != null) {
              PPostcode = applicant.PPostcode
            } else {
              PPostcode = '-'
            }
            if (applicant.PState != null) {
              if (applicant.PState != 'Others') {
                PState = applicant.PState
              } else {
                PState = applicant.PState
                //PState = applicant.PStateOthers
              }
            } else {
              PState = '-'
            }
            if (applicant.Contact_HouseCtryCode != null) {
              Contact_HouseCtryCode = applicant.Contact_HouseCtryCode
            } else {
              Contact_HouseCtryCode = '-'
            }
            if (applicant.Contact_MobileCtryCode != null) {
              Contact_MobileCtryCode = applicant.Contact_MobileCtryCode
            } else {
              Contact_MobileCtryCode = '-'
            }
            // if (applicant.Contact_House != null) {
            //   C = applicant.Contact_House
            // } else {
            //   C = '-'
            // }
            if (applicant.Contact_Mobile != null) {
              Contact_Mobile = applicant.Contact_Mobile
            } else {
              Contact_Mobile = '-'
            }
            if (applicant.Email != null) {
              Email = applicant.Email
            } else {
              Email = '-'
            }
            if (applicant.Passport != null) {
              Passport = applicant.Passport
            } else {
              Passport = '-'
            }
            if (applicant.SeamanBookNo != null) {
              SeamanBook = applicant.SeamanBookNo
            } else {
              SeamanBook = '-'
            }
            if (applicant.SeamanBook_DtExpiry != null) {
              let date1 = new Date(applicant.SeamanBook_DtExpiry)
              var date2 = moment(date1).format('DD/MM/YYYY')
              SeamanBookDtExpiry = date2
            } else {
              SeamanBookDtExpiry = '-'
            }
            if (applicant.SeamanCardNo != null) {
              SeamanID = applicant.SeamanCardNo
            } else {
              SeamanID = '-'
            }
            if (applicant.SeamanCard_DtExpiry != null) {
              let date1 = new Date(applicant.SeamanCard_DtExpiry)
              var date2 = moment(date1).format('DD/MM/YYYY')
              SeamanIDDtExpiry = date2
            } else {
              SeamanIDDtExpiry = '-'
            }
            if (applicant.COCNo != null) {
              COCNo = applicant.COCNo
            } else {
              COCNo = '-'
            }
            if (applicant.COC_DtExpiry != null) {
              let date1 = new Date(applicant.COC_DtExpiry)
              var date2 = moment(date1).format('DD/MM/YYYY')
              COC_DtExpiry = date2
            } else {
              COC_DtExpiry = '-'
            }
            if (applicant.CORNo != null) {
              CORNo = applicant.CORNo
            } else {
              CORNo = '-'
            }
            if (applicant.COR_DtExpiry != null) {
              let date1 = new Date(applicant.COR_DtExpiry)
              var date2 = moment(date1).format('DD/MM/YYYY')
              COR_DtExpiry = date2
            } else {
              COR_DtExpiry = '-'
            }
            if (checkApplicant.recordset[0].Position != null) {
              Position = checkApplicant.recordset[0].Position
            } else {
              Position = '-'
            }
            if (applicant.RepatriationHomePort != null) {
              RepatriationHomePort = applicant.RepatriationHomePort
            } else {
              RepatriationHomePort = '-'
            }

            if (SignDtManager == null || SignDtManager == '') {
              var today = new Date()
              var dd = String(today.getDate()).padStart(2, '0')
              var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
              var yyyy = today.getFullYear()
              var hh = today.getHours()
              var min = today.getMinutes()
              var sec = today.getSeconds()

              today = dd + '/' + mm + '/' + yyyy
              SignDtExecutive = today
              SignDtManager = today
            }

            if (applicant.DOB != null) {
              DOB =
                applicant.DOB.getDate() +
                '/' +
                (applicant.DOB.getMonth() + 1) +
                '/' +
                applicant.DOB.getFullYear()
            }
            //added 15/1/2021
            if (applicant.PermanentAddress2 != null) {
              PermanentAddress2 = applicant.PermanentAddress2
            } else {
              PermanentAddress2 = '-'
            }
            if (applicant.PermanentAddress3 != null) {
              PermanentAddress3 = applicant.PermanentAddress3
            } else {
              PermanentAddress3 = '-'
            }
            if (applicant.PCity != null) {
              PCity = applicant.PCity
            } else {
              PCity = '-'
            }
            if (applicant.Contact_House != null) {
              Contact_House = applicant.Contact_House
            } else {
              Contact_House = '-'
            }
            if (applicant.SubsePassport_DtExpiry != null) {
              let date1 = new Date(applicant.SubsePassport_DtExpiry)
              var date2 = moment(date1).format('DD/MM/YYYY')
              SubseDtExpiry = date2
            } else {
              SubseDtExpiry = '-'
            }
            if (applicant.SubsePassport != null) {
              SubsePassport = applicant.SubsePassport
            } else {
              SubsePassport = '-'
            }
            if (applicant.EmergencyContactName != null) {
              NOKName = applicant.EmergencyContactName
            } else {
              NOKName = '-'
            }
            if (applicant.EmergencyContactMiddleName != null) {
              NOKMiddleName = applicant.EmergencyContactMiddleName
            } else {
              NOKMiddleName = '-'
            }
            if (applicant.EmergencyContactLastName != null) {
              NOKLastName = applicant.EmergencyContactLastName
            } else {
              NOKLastName = '-'
            }
            if (applicant.EmergencyContactRelationship != null) {
              try{
                const relationship = await pool
                .request()
                .input('id', sql.VarChar, applicant.EmergencyContactRelationship)
                .query(queries.getNameById)
                NOKRelationship = relationship.recordset[0].TableField
              }catch{
                NOKRelationship =applicant.EmergencyContactRelationship
              }
             
            } else {
              NOKRelationship = '-'
            }
            if (applicant.EmergencyContact_MobileCtryCode != null) {
              NOKCtryCode = applicant.EmergencyContact_MobileCtryCode
            } else {
              NOKCtryCode = '-'
            }
            if (applicant.EmergencyContact_Mobile != null) {
              NokContactNumber = applicant.EmergencyContact_Mobile
            } else {
              NokContactNumber = '-'
            }
            if (applicant.EmergencyContact_Address != null) {
              NOKAddress = applicant.EmergencyContact_Address
            } else {
              NOKAddress = '-'
            }
            if (applicant.EmergencyContact_Address2 != null) {
              NOKAddress2 = applicant.EmergencyContact_Address2
            } else {
              NOKAddress2 = '-'
            }
            if (applicant.EmergencyContact_Address3 != null) {
              NOKAddress3 = applicant.EmergencyContact_Address3
            } else {
              NOKAddress3 = '-'
            }
          }

          if (admin != null || admin != []) {
            if (admin.Signature != null) {
              SignatureExecutive = path.resolve(
                '../src/assets/UserDoc/' + admin.Signature
              )
            } else {
              SignatureExecutive = '-'
            }
            if (admin.SignatureAdmin != null) {
              SignatureManager = path.resolve(
                '../src/assets/UserDoc/' + admin.SignatureAdmin
              )
            } else {
              SignatureManager = '-'
            }
            if (admin.UserName != null) {
              SignatureExecutiveName = admin.UserName
            } else {
              SignatureExecutiveName = '-'
            }
            if (admin.ManagerName != null) {
              SignatureManagerName = admin.ManagerName
            } else {
              SignatureManagerName = '-'
            }
          }

          var content = fs.readFileSync(
            path.resolve('./Templates/', 'SEAtemp.docx'),
            'binary'
          )

          var zip = new PizZip(content)
          var doc
          var imageModule = new ImageModule(opts)
          doc = new Docxtemplater(zip, { modules: [imageModule] })

          //set the templateVariables
          try {
            doc.setData({
              SubmitDt: SubmitDt,
              NameOfVessel: NameOfVessel,
              Name: Name,
              MiddleName: MiddleName,
              LastName: LastName,
              CountryOfOrigin: CountryOfOrigin,
              Nationality: Nationality,
              IC: IC,
              DOB: DOB,
              PermanentAddress: PermanentAddress,
              PlaceofBirth: PlaceofBirth,
              PPostcode: PPostcode,
              PState: PState,
              Contact_HouseCtryCode: Contact_HouseCtryCode,
              Contact_MobileCtryCode: Contact_MobileCtryCode,
              // C: C,
              Contact_Mobile: Contact_Mobile,
              Email: Email,
              Passport: Passport,
              PassportDtExpiry: PassportDtExpiry,
              SeamanBook: SeamanBook,
              SeamanBookDtExpiry: SeamanBookDtExpiry,
              SeamanID: SeamanID,
              SeamanIDDtExpiry: SeamanIDDtExpiry,
              COCNo: COCNo,
              COC_DtExpiry: COC_DtExpiry,
              CORNo: CORNo,
              COR_DtExpiry: COR_DtExpiry,
              Position: Position,
              ContactPeriod: ContactPeriod,
              RepatriationHomePort: RepatriationHomePort,
              IMONo: IMONo,
              PortofRegistry: PortofRegistry,
              Allowance: Allowance,
              StandbyRate: StandbyRate,
              DailyRate: DailyRate,
              ConfirmBy: ConfirmBy,
              ConfirmByName: ConfirmByName,
              ConfirmDt: ConfirmDt,
              SignDtExecutive: SignDtExecutive,
              SignDtManager: SignDtManager,
              SignatureExecutive: SignatureExecutive,
              SignatureExecutiveName: SignatureExecutiveName,
              SignatureManager: SignatureManager,
              SignatureManagerName: SignatureManagerName,
              Currency: Currency,
              OtherAllowance: OtherAllowance,
              //added 15/1/2021
              PermanentAddress2: PermanentAddress2,
              PermanentAddress3: PermanentAddress3,
              PCity: PCity,
              Contact_House: Contact_House,
              SubseDtExpiry: SubseDtExpiry,
              SubsePassport: SubsePassport,
              NOKName: NOKName,
              NOKMiddleName: NOKMiddleName,
              NOKLastName: NOKLastName,
              NOKRelationship: NOKRelationship,
              NOKCtryCode: NOKCtryCode,
              NokContactNumber: NokContactNumber,
              NOKAddress: NOKAddress,
              NOKAddress2: NOKAddress2,
              NOKAddress3: NOKAddress3,
            })

            doc.render() //apply them

            var buf = doc
              .getZip()
              .generate({ type: 'nodebuffer', compression: 'DEFLATE' })

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0')
            var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
            var yyyy = today.getFullYear()
            var hh = today.getHours()
            var min = today.getMinutes()
            var sec = today.getSeconds()

            today = yyyy + mm + dd + hh + min + sec

            //Update fields in applicant apply
            const updateSEA = await pool
              .request()
              .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
              .input(
                'Position',
                sql.VarChar,
                checkApplicant.recordset[0].Position
              )
              .input(
                'FileSEA',
                sql.VarChar,
                checkApplicant.recordset[0].Position +
                  '_' +
                  applicant.LoginEmail +
                  '_SEA_' +
                  today +
                  '.docx'
              )
              .query(queries.updateSEA)

            const updateSEADate = await pool
              .request()
              .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
              .input(
                'Position',
                sql.VarChar,
                checkApplicant.recordset[0].Position
              )
              .input('FileSEACreateDt', sql.DateTime, Date())
              .query(queries.updateSEADate)

            const updateGenDoc = await pool
              .request()
              .input('LoginEmail', sql.VarChar, req.body.LoginEmail)
              .input(
                'Position',
                sql.VarChar,
                checkApplicant.recordset[0].Position
              )
              .input('GenDoc', '2')
              .query(queries.updategenDoc)

            fs.writeFileSync(
              path.resolve(
                '../src/assets/UserDoc/' +
                  checkApplicant.recordset[0].Position +
                  '_' +
                  applicant.LoginEmail +
                  '_SEA_' +
                  today +
                  '.docx'
              ),
              buf
            )

            //res.send("Successfully generated SEA for " + applicant.Name);
            // return success code
            console.log('Successfully generated SEA for ' + applicant.Name)
            return true
          } catch (error) {
            res.status(400)
            res.send('Error Message: ' + error.message)
            console.log('Error: ', error)
            return false
          }
        } else {
          //res.send("This Applicant Record's Status is not SET as Approved !");
          console.log("This Applicant Record's Status is not SET as Approved !")
          return false
        }
      } else {
        //res.send("All fields are required!");
        console.log('All fields are required!')
        return false
      }
    } catch (error) {
      //res.status(500);
      //res.send(error.message);
      console.log('Error: ', error)
      return false
    }
  }
}

const controller = new GenerationController()
module.exports = controller
