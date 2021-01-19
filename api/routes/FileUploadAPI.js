var express = require('express')
const controller = require('../controller/FileUploadController')
var router = express.Router()
var fs = require('fs')
var multer = require('multer')

router.post('/update_fileupload', verifyFile)
router.delete('/delete_fileupload/:Id', controller.deleteFile)

function verifyFile(req, res) {
  var fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      let type = file.fieldname
      let path = `../src/assets/UserDoc/`
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
      }
      callback(null, path)
    },
    filename: function (req, file, callback) {
      var position = req.body.Position ? req.body.Position : ''
      var userID_LoginEmail = req.body.UserID
        ? req.body.UserID
        : req.body.LoginEmail
      // TODO: append with Position & LoginEmail, currently is empty
      filename_generated = Date.now() + '_' + file.originalname
      file.filename_generated = filename_generated
      console.log('filename_generated: ', filename_generated)
      callback(null, filename_generated)
    },
  })

  var uploadFile = multer({
    storage: fileStorage,
    //limits: { fileSize: maxSize }
  }).fields([
    {
      name: 'file',
      maxCount: 1,
    },
  ]) //Field name and max count

  uploadFile(req, res, function (err) {
    if (err) {
      return res.status(400).send(err)
    }
    if (!req.files.file) {
      return res.status(400).send({
        msg: 'Missing require fields.',
      })
    }

    // Check if file format supported
    var checkValid = true
    var tempUri = req.files.file[0].originalname.toLowerCase()
    var checkValid = true
    if (
      tempUri.indexOf('.txt') == -1 &&
      tempUri.indexOf('.doc') == -1 &&
      tempUri.indexOf('.docx') == -1 &&
      tempUri.indexOf('.png') == -1 &&
      tempUri.indexOf('.gif') == -1 &&
      tempUri.indexOf('.jpg') == -1 &&
      tempUri.indexOf('.jpeg') == -1 &&
      tempUri.indexOf('.pdf') == -1 &&
      tempUri.indexOf('.rtf') == -1 &&
      tempUri.indexOf('.tif') == -1 &&
      tempUri.indexOf('.xls') == -1 &&
      tempUri.indexOf('.xlsx') == -1
    ) {
      checkValid = false
    }

    if (!checkValid) {
      deleteFile(req.files.file[0].path)
      return res.status(400).send({
        msg: 'Wrong file type provided.',
      })
    }

    controller.addFileUpload(req, res)
  })
}

module.exports = router
