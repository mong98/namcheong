const { sql, poolPromise } = require('../database/db')
const fs = require('fs')
var rawdata = fs.readFileSync('./query/queries.json')
var queries = JSON.parse(rawdata)

class FileUploadController {
  async addFileUpload(req, res) {
    try {
      if (req.files && req.files.file[0].originalname != null) {
        // TODO: update the file path in db
        // return file uploaded success
        var result = ''
        var filename_generated = req.files.file[0].filename_generated
        const pool = await poolPromise
        console.log("ColumnType: ", req.body.ColumnType)
        if(req.body.ColumnType == "document") {
          //"updateDocumentPath" : "UPDATE [JobPortal].[dbo].[ApplicantDocument] SET [FileName] = @FileName, 
          //[UpdatedDate] = GETDATE() WHERE [DocumentID] = @DocumentID AND [UserID]=@UserID",
          console.log("DocumentID: ", req.body.Id, " UserID: ", req.body.UserID, " FileName: ", filename_generated)
          result = await pool
          .request()
          .input('DocumentID', sql.SmallInt, req.body.Id)
          .input('UserID', sql.VarChar, req.body.UserID)
          .input('FileName', sql.VarChar, filename_generated)
          .query(queries.updateDocumentPath)
          console.log("result: ", result)
        }
        else if(req.body.ColumnType == "signature"){
          result = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .input('Signature', sql.VarChar, filename_generated)
          .query(queries.updateFile)
        }
        else if(req.body.ColumnType == "signatureAdmin"){
          result = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .input('SignatureAdmin', sql.VarChar, filename_generated)
          .query(queries.updateAdminFile)
        }
        else if(req.body.ColumnType == "profile"){
          result = await pool
          .request()
          .input('LoginEmail', sql.VarChar, req.body.UserID)
          .input('FileName', sql.VarChar, filename_generated)
          .query(queries.updateApplicantProfile)
        }
        else if(req.body.ColumnType == "education"){
          result = await pool
          .request()
          .input('LoginEmail', sql.VarChar, req.body.UserID)
          .input('FileName', sql.VarChar, filename_generated) // Updated by Hakim on 2 Feb 2021
          .query(queries.updateApplicantEducation)
        }
        else if(req.body.ColumnType == "cv"){
          console.log("req.body.ColumnType cv: ", req.body.ColumnType, " req.body.UserID: ", req.body.UserID, " filename_generated: ", filename_generated)
          result = await pool
          .request()
          .input('LoginEmail', sql.VarChar, req.body.UserID)
          .input('FileName', sql.VarChar, filename_generated)
          .query(queries.updateApplicantCV)
          console.log("result: ", result)
        }
        res.json({ success_code: 0, messages: 'File Uploaded!' })
      } else {
        res.send('Please fill all the details!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async retriveFileName(Id, ColumnType) {
    try{
      var result = ''
      const pool = await poolPromise
      if(ColumnType == "document") {
        result = await pool
        .request()
        .input('Id', sql.VarChar, Id)
        .query(queries.getDocumentFileName)
      }
      else if(ColumnType == "signature"){
        result = await pool
        .request()
        .input('Id', sql.VarChar, Id)
        .query(queries.getSignatureFileName)
      }
      else if(ColumnType == "signatureAdmin"){
        result = await pool
        .request()
        .input('Id', sql.VarChar, Id)
        .query(queries.getSignatureAdminFileName)
      }
      
      console.log("getFileName: ", result)
      if(result== null || result.recordset == null
        || result.recordset[0] == null) {
        return null
      }
      
      if(ColumnType == "document") {
        return result.recordset[0].FileName
      }
      else if(ColumnType == "signature"){
        return result.recordset[0].Signature
      }
      else if(ColumnType == "signatureAdmin"){
        return result.recordset[0].SignatureAdmin
      }
    }
    catch (error) {
      return null
    }
  }

  async deleteDocument(req, res) {
    try {
      console.log("deleteDocument")
      await module.exports.deleteFile(req, res, "document")
      console.log("Retrieved Filename: ", FileName)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async deleteSignature(req, res) {
    try {
      console.log("deleteSignature")
      await module.exports.deleteFile(req, res, "signature")
      console.log("Retrieved Filename: ", FileName)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async deleteSignatureAdmin(req, res) {
    try {
      console.log("deleteSignatureAdmin")
      await module.exports.deleteFile(req, res, "signatureAdmin")
      console.log("Retrieved Filename: ", FileName)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async deleteFile(req, res, ColumnType) {
    try {
      if (req.params.Id && req.params.Id.length > 0) {
        var result = ''
        const pool = await poolPromise
        var FileName = await module.exports.retriveFileName(req.params.Id, ColumnType)
        if(FileName == null) {
          res.json({ success_code: 1, messages: 'File Not Found in Database!' })
          return
        }
        console.log("Retrieved Filename: ", FileName)
        if(ColumnType == "document") {
          result = await pool
          .request()
          .input('Id', sql.VarChar, req.params.Id)
          .query(queries.deleteDocumentFile)
        }
        else if(ColumnType == "signature"){
          result = await pool
          .request()
          .input('Id', sql.VarChar, req.params.Id)
          .query(queries.deleteSignatureFile)
        }
        else if(ColumnType == "signatureAdmin"){
          result = await pool
          .request()
          .input('Id', sql.VarChar, req.params.Id)
          .query(queries.deleteSignatureAdminFile)
        }
        console.log("deleteFile result: ", result)
        // CANNOT DELETE ALSO RESOLVE
        new Promise((resolve) => {
          try {
            let path = `../src/assets/UserDoc/`
            if(result.recordset != undefined){
              fs.unlink(path + FileName, function (err) {
                if (err) {
                  throw err;
                }
                resolve()
              })
            }
           
          } catch (e) {
            console.error(err)
            resolve()
            res.json({ success_code: 2, messages: 'Error: File Deleted!' })
            return
          }
        })
        res.json({ success_code: 0, messages: 'File Deleted!' })
      } else {
        res.send('Please fill all the details!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const controller = new FileUploadController()
module.exports = controller
