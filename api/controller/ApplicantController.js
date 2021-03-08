const { sql, poolPromise } = require('../database/db')
const fs = require('fs')
const sgMail = require('@sendgrid/mail')
var rawdata = fs.readFileSync('./query/queries.json')
var queries = JSON.parse(rawdata)
var GenerationController = require('./GenerationController.js')
var path = require('path')

//added 20/1/2021
const { PDFNet } = require('@pdftron/pdfnet-node')

class ApplicantController {
  async getApplicant(req, res) {
    //console.log('getApplicant')
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getApplicant)

      ////console.log(result.recordset)
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

      ////console.log(result.recordset)
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

      ////console.log(result.recordset)
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

      ////console.log(result.recordset)
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
      ////console.log(result.recordset)
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
      ////console.log(result.recordset)
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
      ////console.log(result.recordset)
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

      ////console.log(result.recordset)
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
      ////console.log(result.recordset)
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
      ////console.log(result.recordset)
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

      ////console.log(result.recordset[0])
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
      //console.log('getApplicantApplyByLoginEmail')

      ////console.log(result.recordset[0])
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

      ////console.log(result.recordset[0])
      res.json(result.recordset[0])
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantDropdownId(req, res) {
    try {
      var queryStr = queries.getApplicantDropdownId.join(' ')
      //console.log(queryStr)
      //console.log('req.params.Id: ', req.params.Id)
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('Id', sql.SmallInt, req.params.Id)
        .query(queryStr)

      ////console.log(result.recordset)
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

      ////console.log(result.recordset)
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
      ////console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  // Added by Hakim on 26 Jan 2021 - Start
  async getApplicantExperience(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('UserID', sql.VarChar, req.params.UserID)
        .query(queries.getApplicantExperience)
      ////console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  // Added by Hakim on 26 Jan 2021 - End

  async getCharterer(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getCharterer)

      ////console.log(result.recordset)
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

      ////console.log(result.recordset)
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

      ////console.log(result.recordset)
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

      ////console.log(result.recordset)
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

      ////console.log(result.recordset)
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

      ////console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getApplicantDocument(req, res) {
    try {
      //console.log("getApplicantDocument")
      //console.log(req.query)
      /* //console.log(req.query)
      //console.log(req.query.Id)
      //console.log(req.query.LoginEmail)
      //console.log(req.query.PositionID)
      //console.log(queries.getApplicantDocument) */
      var queryStr = queries.getApplicantDocument.join(' ')
      ////console.log(queryStr)
      const pool = await poolPromise
      const result = await pool
        .request()
        .input('Id', sql.VarChar, req.query.Id)
        .input('LoginEmail', sql.VarChar, req.query.LoginEmail)
        .input('PositionID', sql.VarChar, req.query.PositionID)
        .query(queryStr)
      // loop thru to get single Document name
      //console.log("get document result")
      ////console.log(result.recordset)
      if (result.recordset != null) {
        for (var documentItem of Object.values(result.recordset)) {
          ////console.log("documentItem: ", documentItem)
          if (documentItem != null && Array.isArray(documentItem.Document)) {
            documentItem.Document = documentItem.Document[0]
          }
        }
      }
      ////console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async updateApplicant(req, res) {
    try {
      //console.log('updateApplicant: ', req.body)
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
        // // Calculate daily rate
        // if (req.body.ContractPeriodFrom != null && req.body.ContractPeriodTo != null && req.body.Salary != null) {
        //   let startDate = new Date(req.body.ContractPeriodFrom)
        //   let endDate = new Date(req.body.ContractPeriodTo)
        //   let epochPeriod = endDate.valueOf() - startDate.valueOf()
        //   let numOfdays = epochPeriod / 86400000
        //   let totalSalary = req.body.Salary * Number(req.body.ContractPeriodFromInMth)
        //   req.body.DailyRate = (totalSalary / numOfdays).toFixed(2)
        // }

        var queryStr = queries.updateApplicant.join(' ')
        //console.log('queryStr: ', queryStr, ' IMONo: ', req.body.IMONo)
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .input('ApplyPosition', sql.VarChar, req.body.ApplyPosition)
          // .input('DailyRate', sql.VarChar, req.body.DailyRate) // Comment by Hakim on 16 Feb 2021
          .input('DailyRate', sql.VarChar, req.body.Salary) // Added by Hakim on 16 Feb 2021
          .input('StandbyRate', sql.VarChar, req.body.StandbyRate)
          .input('StandbyAllowance', sql.VarChar, req.body.StandbyAllowance) // Added by Hakim on 25 Jan 2021
          .input('Allowance', sql.VarChar, req.body.Allowance)
          .input('AllowanceRemarks', sql.VarChar, req.body.AllowanceRemarks) // Added by Hakim on 27 Jan 2021
          .input('TypesofAllowance', sql.VarChar, req.body.TypesofAllowance)
          .input(
            'RepatriationHomePort',
            sql.VarChar,
            req.body.RepatriationHomePort
          ) // Added by Hakim on 16 Feb 2021
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
          .input('Salary', sql.VarChar, req.body.Salary)
          .input('SalaryRemarks', sql.VarChar, req.body.SalaryRemarks) // Added by Hakim on 27 Jan 2021
          .input('OtherAllowance', sql.VarChar, req.body.OtherAllowance)
          .query(queryStr)
        //console.log('updateApplicant result: ', req.body.Id)

        // Set ApplyID for doc generation
        req.body.ApplyID = req.body.Id

        // Generate AFE/CV doc if Status = 'Review'
        // Generate SEA doc if Status = 'Offered'
        if (req.body.Status == 'Review') {
          //console.log('generate AFE/CV ', req.body.Id)
          var afe_result = await GenerationController.generateAFE(req, res)
          var cv_result = await GenerationController.generateCV(req, res)
        } else if (req.body.Status == 'Offered') {
          //console.log('generate SEA ', req.body.Id)
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
      //console.log('updateConfirmApplicant: ', req.body)
      if (
        req.body.Id != null &&
        req.body.OfferPosition != null &&
        req.body.Status != null
      ) {
        var queryStr = queries.updateConfirmApplicant.join(' ')
        //console.log('queryStr: ', queryStr)
        const pool = await poolPromise

        const applicant = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .query(queries.getApplicantById)

        //console.log(applicant)

        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .input('OfferPosition', sql.VarChar, req.body.OfferPosition)
          // .input('DailyRate', sql.VarChar, req.body.DailyRate) // Comment by Hakim on 16 Feb 2021
          .input('DailyRate', sql.VarChar, req.body.Salary) // Added by Hakim on 16 Feb 2021
          .input('StandbyRate', sql.VarChar, req.body.StandbyRate)
          .input('StandbyAllowance', sql.VarChar, req.body.StandbyAllowance) // Added by Hakim on 25 Jan 2021
          .input('Allowance', sql.VarChar, req.body.Allowance)
          .input('AllowanceRemarks', sql.VarChar, req.body.AllowanceRemarks) // Added by Hakim on 27 Jan 2021
          .input('TypesofAllowance', sql.VarChar, req.body.TypesofAllowance)
          .input(
            'RepatriationHomePort',
            sql.VarChar,
            req.body.RepatriationHomePort
          ) // Added by Hakim on 27 Jan 2021
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
          .input('Salary', sql.VarChar, req.body.Salary)
          .input('SalaryRemarks', sql.VarChar, req.body.SalaryRemarks) // Added by Hakim on 27 Jan 2021
          .input('OtherAllowance', sql.VarChar, req.body.OtherAllowance)
          .query(queryStr)

        // Set ApplyID & Status for doc generation
        req.body.ApplyID = req.body.Id
        req.body.Status = 'Review'

        // Generate AFE/CV/SEA doc if Status = 'Offered'
        console.log('generate AFE/CV ', req.body.Id)
        var afe_result = await GenerationController.generateAFE(req, res)
        if (afe_result == false) {
          console.log('AFE not generated due to file not found!')
          res.send('AFE not generated due to file not found!')
        }

        var cv_result = await GenerationController.generateCV(req, res)

        // Set ApplyID & Status for doc generation
        req.body.Status = 'Offered'

        console.log('generate SEA ', req.body.Id)
        var sea_result = await GenerationController.generateSEA(req, res)
        if (sea_result == false) {
          console.log('SEA not generated due to file not found!')
          res.send('SEA not generated due to file not found!')
        }

        if (
          result != null &&
          sea_result == true &&
          cv_result == true &&
          afe_result == true
        ) {
          const applicantApply = await pool
            .request()
            .input('Id', sql.SmallInt, req.body.Id)
            .query(queries.getApplicantApplyById)

          //added 20/1/2021
          const extend = '.pdf'
          let enterPath = path.resolve(
            '../dist/assets/UserDoc/' + applicantApply.recordset[0].FileSEA
          )
          const outputPath = path.resolve(
            '../dist/assets/UserDoc/' +
              applicantApply.recordset[0].FileSEA.replace('.docx', extend)
          )

          //added 20/1/2021
          const convertPDF = async () => {
            const pdfdoc = await PDFNet.PDFDoc.create()
            await pdfdoc.initSecurityHandler()
            await PDFNet.Convert.toPdf(pdfdoc, enterPath)
            pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized)
          }
          //added 20/1/2021
          await PDFNet.runWithCleanup(convertPDF)
            .then(() => {
              fs.readFileSync(outputPath, (err, data) => {
                if (err) {
                  res.status(500)
                  res.send(err)
                  console.log('PDF ERROR 1!')
                }
              })
            })
            .catch((err) => {
              res.status(500)
              res.send(err)
              console.log('PDF ERROR 2!')
            })
          //added 20/1/2021
          let attachmentPDF = fs.readFileSync(outputPath).toString('base64')
          let Filename = applicantApply.recordset[0].FileSEA.replace(
            '.docx',
            extend
          )

          //added 26/1/2021
          const adminDetails = await pool
            .request()
            .input('UserName', sql.VarChar, req.body.adminName)
            .query(queries.getLoginAdmin)

          console.log('AdminDetails')
          console.log(adminDetails)

          let AdminName = adminDetails.recordset[0].FirstName
          let AdminLastName = adminDetails.recordset[0].LastName
          let AdminEmail = adminDetails.recordset[0].Email

          console.log('AdminData')
          console.log(AdminName, AdminEmail)

          //send email
          // try {
          //   sgMail.setApiKey(
          //     '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'
          //   )

          let htmlText =
            '<strong>Dear <strong>' +
            (applicant.recordset[0].Name ? applicant.recordset[0].Name : '') +
            '<br />' +
            '<strong>Thank you for your application.<strong>' +
            '<br />' +
            '<strong>We are pleased to make the following offer of employment.<strong>' +
            '<br />' +
            '· [Rank] > ' +
            (applicantApply.recordset[0].OfferPosition ? applicantApply.recordset[0].OfferPosition : '') +
            '<br />' +
            '· [Vessel Name] > ' +
            (applicantApply.recordset[0].NameofVessel ? applicantApply.recordset[0].NameofVessel : '') +
            '<br />' +
            '· [Daily Rate] > ' +
            (applicantApply.recordset[0].DailyRate ? applicantApply.recordset[0].DailyRate : '') +
            '<br />' +
            '· [Standby Allowance] > ' +
            (applicantApply.recordset[0].StandbyAllowance ? applicantApply.recordset[0].StandbyAllowance : '') +
            '<br />' +
            '· [Other Allowance] > ' +
            (applicantApply.recordset[0].OtherAllowance ? applicantApply.recordset[0].OtherAllowance : '') +
            '<br />' +
            '· [Contract Period] > ' +
            (applicantApply.recordset[0].ContractPeriodFromInMth ? applicantApply.recordset[0].ContractPeriodFromInMth : '') +
            '	/month – this may subject to your final acceptance and sign on date.' +
            '<br />' +
            'Please acknowledge your acceptance of the above offer and email signed SEA to ' +
            (applicant.recordset[0].LoginEmail ? applicant.recordset[0].LoginEmail : '') +
            '<br />' +
            'Should you need further clarification, please contact ' +
            (AdminName ? AdminName : '') +
            ' ' +
            (AdminLastName ? AdminLastName : '') +
            ' at ' +
            (AdminEmail ? AdminEmail : '') +
            '<br />' +
            'SKOM Sdn. Bhd.' +
            '<br />' +
            'This is a computer generated message and no signature is required.'

          //   const msg = {
          //     to: 'desmond@wiserobot.com',
          //     //to: applicant.recordset[0].LoginEmail, // Change to your recipient
          //     from: 'desomond17@gmail.com', // Change to your verified sender
          //     subject: '[TEST]: SKOM eCrew Job Portal',
          //     text: 'SKOM eCrew Job Portal',
          //     html: htmlText,

          //     attachments: [
          //       {
          //         content: attachmentPDF,
          //         filename: Filename,
          //         type: 'application/pdf',
          //         disposition: 'attachment',
          //       },
          //     ],
          //   }
          //   sgMail
          //     .send(msg)
          //     .then(() => {
          //       console.log(
          //         'Email sent to ' + applicant.recordset[0].LoginEmail
          //       )
          //     })
          //     .catch((error) => {
          //       console.error(error)
          //     })
          // } catch (err) {
          //   res.status(400)
          //   res.send("Email Can't be sent!")
          // }

          // Added by Hakim on 5 March 2021 - Start
          var nodemailer = require('nodemailer')
          let transporter = nodemailer.createTransport({
            pool: false,
            host: "smtp.office365.com",
            port: 587,
            secureConnection: false,
            tls: { ciphers: 'SSLv3' },
            auth: {
              user: "e-crew@skom.com.my",
              pass: ""
            }
          });

          // let transporter = nodemailer.createTransport({
          //   sendmail: true,
          //   newline: 'windows',
          //   path: '/usr/lib/sendmail'
          // })

          transporter.verify(function (error, success) {
            if (error) {
              console.log(error)
            } else {
              console.log("Server ready to send email")
            }
          })

          transporter.sendMail({
            from: 'e-crew@skom.com.my',
            to:  'hakim@wiserobot.com',//applicant.recordset[0].LoginEmail,
            subject: '[TEST]: SKOM eCrew Job Portal',
            html: htmlText,
            attachments: [
              {
                filename: Filename,
                content: fs.createReadStream(outputPath)
              }
            ]
          }, 
          function(err, info) {
            if (!err) {
              res.json({ Id: req.body.Id })
            } else {
              res.status(400).send('Failed to send email!')
            }
          })
          // Added by Hakim on 5 March 2021 - End
          console.log('3 File is Generated inside userDoc folder!')
        }
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
	  console.log('Hakim')
	  console.log(error)
      res.status(500)
      res.send(error)
    }
  }
}

const controller = new ApplicantController()
module.exports = controller
