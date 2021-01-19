const { sql, poolPromise } = require('../database/db')
const fs = require('fs')
const sgMail = require('@sendgrid/mail')
var rawdata = fs.readFileSync('./query/queries.json')
var queries = JSON.parse(rawdata)
var GenerationController = require('./GenerationController.js')
var path = require('path')

class ApplicantController {
  async getApplicant(req, res) {
    console.log('getApplicant')
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getApplicant)

      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getCurrency(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getCurrency)
								 

      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantApply(req, res) {
			  
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getApplicantApply)

      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantGeneralQuestion(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .query(queries.getApplicantGeneralQuestion)
			   

      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }


  async getApplicantGeneralAnswerById(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('ApplyID', sql.SmallInt, req.params.ApplyID)
        .query(queries.getApplicantGeneralAnswerById)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  // Added by Hakim on 14 Jan 2021 - Start
  async getApplicantMedicalReportQuestion(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .query(queries.getApplicantMedicalReportQuestion)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantMedicalReportAnswerById(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('ApplyID', sql.SmallInt, req.params.ApplyID)
        .query(queries.getApplicantMedicalReportAnswerById)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  // Added by Hakim on 14 Jan 2021 - End

  async getApplicantApply(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getApplicantApply)

      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantGeneralQuestion(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .query(queries.getApplicantGeneralQuestion)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantGeneralAnswerById(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('ApplyID', sql.SmallInt, req.params.ApplyID)
        .query(queries.getApplicantGeneralAnswerById)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantById(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('Id', sql.SmallInt, req.params.Id)
        .query(queries.getApplicantById)

      console.log(result.recordset[0])
      res.json(result.recordset[0])
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantApplyByLoginEmail(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('LoginEmail', sql.VarChar, req.params.LoginEmail)
        .query(queries.getApplicantApplyByLoginEmail)
      console.log('getApplicantApplyByLoginEmail')

      console.log(result.recordset[0])
      res.json(result.recordset[0])
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantByLoginEmail(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('LoginEmail', sql.VarChar, req.params.LoginEmail)
        .query(queries.getApplicantByLoginEmail)

      console.log(result.recordset[0])
      res.json(result.recordset[0])
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantDropdownId(req, res) {
    try {
      var queryStr = queries.getApplicantDropdownId.join(' ')
      console.log(queryStr)
      console.log('req.params.Id: ', req.params.Id)
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('Id', sql.SmallInt, req.params.Id)
        .query(queryStr)

      console.log(result.recordset)
      res.json(result.recordset)
      //res.json("ok")
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantStatus(req, res) {
    try {
			
      const pool = await poolPromise
										 
      const result = await pool.request().query(queries.getApplicantStatus)

      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantNextOfKin(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('UserID', sql.VarChar, req.params.UserID)
        .query(queries.getApplicantNextOfKin)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  // Added by Hakim on 13 Jan 2021 - Start
  async getApplicantCertificates(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('UserID', sql.VarChar, req.params.UserID)
        .query(queries.getApplicantCertificates)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  // Added by Hakim on 13 Jan 2021 - End

  async getCharterer(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getCharterer)
									
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getCompetency(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getCompetency)
									 
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getWorking(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getWorking)
								  
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getGender(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getGender)
								 
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getEducation(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getEducation)
									
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getDynamicPos(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getDynamicPos)
									 
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantDocument(req, res) {
    try {
      /* console.log(req.query)
      console.log(req.query.Id)
      console.log(req.query.LoginEmail)
      console.log(req.query.PositionID)
      console.log(queries.getApplicantDocument) */
      var queryStr = queries.getApplicantDocument.join(' ')
      //console.log(queryStr)
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('Id', sql.VarChar, req.query.Id)
        .input('LoginEmail', sql.VarChar, req.query.LoginEmail)
        .input('PositionID', sql.VarChar, req.query.PositionID)
        .query(queryStr)
      // loop thru to get single Document name
      if (result.recordset != null) {
        for (var documentItem of Object.values(result.recordset)) {
          //console.log("documentItem: ", documentItem)
          if (documentItem != null && Array.isArray(documentItem.Document)) {
            documentItem.Document = documentItem.Document[0]
          }
        }
      }
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async updateApplicant(req, res) {
    try {
      console.log('updateApplicant: ', req.body)
      if (
        req.body.Id != null &&
        req.body.ApplyPosition != null &&
        //&& req.body.DailyRate != null && req.body.StandbyRate != null
        //&& req.body.Allowance != null && req.body.TypesofAllowance != null
        //&& req.body.ContractPeriodFromInMth != null && req.body.ContractPeriodFrom != null
        //&& req.body.ContractPeriodTo != null && req.body.NameofVessel != null
        //&& req.body.IMONo != null && req.body.PortofRegistry != null
        req.body.Status != null
      ) {
        var queryStr = queries.updateApplicant.join(' ')
        console.log('queryStr: ', queryStr, ' IMONo: ', req.body.IMONo)
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .input('ApplyPosition', sql.VarChar, req.body.ApplyPosition)
          .input('DailyRate', sql.VarChar, req.body.DailyRate)
          .input('StandbyRate', sql.VarChar, req.body.StandbyRate)
          .input('Allowance', sql.VarChar, req.body.Allowance)
          .input('TypesofAllowance', sql.VarChar, req.body.TypesofAllowance)
          .input(
            'ContractPeriodFromInMth',
            sql.VarChar,
            req.body.ContractPeriodFromInMth
          )
          .input('ContractPeriodFrom', sql.Date, req.body.ContractPeriodFrom)
          .input('ContractPeriodTo', sql.Date, req.body.ContractPeriodTo)
          .input('NameofVessel', sql.VarChar, req.body.NameofVessel)
          .input('IMONo', sql.VarChar, req.body.IMONo)
          .input('PortofRegistry', sql.VarChar, req.body.PortofRegistry)
          .input('Status', sql.VarChar, req.body.Status)
          .input('Currency', sql.VarChar, req.body.Currency)
          .query(queryStr)
        console.log('updateApplicant result: ', req.body.Id)

        // Set ApplyID for doc generation
        req.body.ApplyID = req.body.Id

        // Generate AFE/CV doc if Status = 'Review'
        // Generate SEA doc if Status = 'Offered'
        if (req.body.Status == 'Review') {
          console.log('generate AFE/CV ', req.body.Id)
          var afe_result = await GenerationController.generateAFE(req, res)
          var cv_result = await GenerationController.generateCV(req, res)
        } else if (req.body.Status == 'Offered') {
											   
          console.log('generate SEA ', req.body.Id)
          var afe_result = await GenerationController.generateAFE(req, res)
          var cv_result = await GenerationController.generateCV(req, res)
          var sea_result = await GenerationController.generateSEA(req, res)
        }
        res.json({ Id: req.body.Id })
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async updateConfirmApplicant(req, res) {
    try {
      console.log('updateConfirmApplicant: ', req.body)
      if (
        req.body.Id != null &&
        req.body.OfferPosition != null &&
        req.body.Status != null
      ) {
        var queryStr = queries.updateConfirmApplicant.join(' ')
        console.log('queryStr: ', queryStr)
        const pool = await poolPromise

        const applicant = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .query(queries.getApplicantById)

        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .input('OfferPosition', sql.VarChar, req.body.OfferPosition)
          .input('DailyRate', sql.VarChar, req.body.DailyRate)
          .input('StandbyRate', sql.VarChar, req.body.StandbyRate)
          .input('Allowance', sql.VarChar, req.body.Allowance)
          .input('TypesofAllowance', sql.VarChar, req.body.TypesofAllowance)
          .input(
            'ContractPeriodFromInMth',
            sql.VarChar,
            req.body.ContractPeriodFromInMth
          )
          .input('ContractPeriodFrom', sql.Date, req.body.ContractPeriodFrom)
          .input('ContractPeriodTo', sql.Date, req.body.ContractPeriodTo)
          .input('NameofVessel', sql.VarChar, req.body.NameofVessel)
          .input('IMONo', sql.VarChar, req.body.IMONo)
          .input('PortofRegistry', sql.VarChar, req.body.PortofRegistry)
					.input('Currency', sql.VarChar, req.body.Currency)										
          .query(queryStr)


        // Set ApplyID & Status for doc generation
        req.body.ApplyID = req.body.Id
        req.body.Status = 'Review'

        // Generate AFE/CV/SEA doc if Status = 'Offered'
        console.log('generate AFE/CV ', req.body.Id)
        var afe_result = await GenerationController.generateAFE(req, res)
        if(afe_result == false){
          console.log('AFE not generated due to file not found!');
          res.send('AFE not generated due to file not found!')
        }

        var cv_result = await GenerationController.generateCV(req, res)
        // console.log('CV')
        // console.log(res)
        // Set ApplyID & Status for doc generation
        req.body.Status = 'Offered'

        console.log('generate SEA ', req.body.Id)
        var sea_result = await GenerationController.generateSEA(req, res)
        if(sea_result == false){
          console.log('SEA not generated due to file not found!');
          res.send('SEA not generated due to file not found!')
        }
        // console.log('SEA')
        // console.log(res)

        if (result != null && sea_result == true&& cv_result == true&& afe_result == true) {
          const applicantApply = await pool
            .request()
            .input('Id', sql.SmallInt, req.body.Id)
            .query(queries.getApplicantApplyById)

          //send email
          // sgMail.setApiKey(
          //   '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'
          // )
          // let pathToAttachment = path.resolve(
          //   '../src/assets/UserDoc/' + applicantApply.recordset[0].FileSEA
          // )
          // let attachment = fs.readFileSync(pathToAttachment).toString('base64')
          // const msg = {
          //   to: applicant.recordset[0].LoginEmail, // Change to your recipient
          //   from: 'desomond17@gmail.com', // Change to your verified sender
          //   subject: '[TEST]: SKOM eCrew Job Portal',
          //   text: '<strong>You Have Been Offered!</strong>',
          //   html: '<strong>You Have Been Offered!</strong>',
          //   attachments: [
          //     {
          //       content: attachment,
          //       filename: applicantApply.recordset[0].FileSEA,
          //       type: 'application/docx',
          //       disposition: 'attachment',
          //     },
          //   ],
          // }
          // sgMail
          //   .send(msg)
          //   .then(() => {
          //     console.log('Email sent to ' + applicant.recordset[0].LoginEmail)
          //   })
          //   .catch((error) => {
          //     console.error(error)
          //   })
          console.log('3 File is Generated inside userDoc folder!');
        }

        res.json({ Id: req.body.Id })

      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      console.log('Error generating file!');
      res.status(500)
      res.send(error)
    }
  }
}

const controller = new ApplicantController()
module.exports = controller
