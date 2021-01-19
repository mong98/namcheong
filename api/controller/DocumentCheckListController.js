const { sql, poolPromise } = require('../database/db')
const fs = require('fs')
var rawdata = fs.readFileSync('./query/queries.json')
var queries = JSON.parse(rawdata)

class DocumentCheckListController {
  async getDocumentCheckList(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getDocumentCheckList)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async getDocumentCheckListById(req, res) {
    try {
      if (req.params.Id != null) {
        const pool = await poolPromise
        console.log('req.params.Id: ', req.params.Id)
        const result = await pool
          .request()
          .input('Id', sql.VarChar, req.params.Id)
          .query(queries.getDocumentCheckListById)
        console.log(result.recordset)
        res.json(result.recordset)
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async updateDocumentCheckList(req, res) {
    try {
      if (
        req.body.constructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res.status(500)
        res.send(error.message)
      } else {
        const pool = await poolPromise
        const values = Object.values(req.body)

        var success_val = true
        var updateDocumentCheckListStr =
          'UPDATE [JobPortal].[dbo].[PositionDocument] SET '
        var queries_updateDocumentCheckList = updateDocumentCheckListStr
        if (req.params.PositionID == null) {
          success_val = false
        }

        for (let i = 0; i < values.length; i++) {
          if (
            values[i].DocNo == null ||
            values[i].Chk == null ||
            values[i].DtIssue == null ||
            values[i].DtExpiry == null ||
            values[i].DocType == null ||
            values[i].DocFile == null ||
            values[i].DocumentID == null
          ) {
            success_val = false
            break
          }

          queries_updateDocumentCheckList += `[DocNo] = '${values[i].DocNo}', `
          queries_updateDocumentCheckList += `[Chk] = '${values[i].Chk}', `
          queries_updateDocumentCheckList += `[DtIssue] = '${values[i].DtIssue}', `
          queries_updateDocumentCheckList += `[DtExpiry] = '${values[i].DtExpiry}', `
          queries_updateDocumentCheckList += `[DocType] = '${values[i].DocType}', `
          queries_updateDocumentCheckList += `[DocFile] = '${values[i].DocFile}' `
          queries_updateDocumentCheckList += `WHERE [PositionID] = '${req.params.PositionID}' `
          queries_updateDocumentCheckList += `AND [DocumentID] = '${values[i].DocumentID}';`
          if (i !== values.length - 1) {
            queries_updateDocumentCheckList += updateDocumentCheckListStr
          }
        }

        if (success_val) {
          const result = await pool
            .request()
            .query(queries_updateDocumentCheckList)
          res.json({ PositionID: req.params.PositionID })
        } else {
          res.send('All fields are required!')
        }
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const controller = new DocumentCheckListController()
module.exports = controller
