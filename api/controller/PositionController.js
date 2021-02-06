const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class PositionController {

    async getPosition(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getPosition)
          console.log(result.recordset)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addPosition(req , res){
      try {
        console.log("addPosition: ", req.body);
        if(req.body.Position != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('Position', sql.VarChar, req.body.Position)
          .input('CreatedBy', sql.VarChar, req.body.CreatedBy)
          .query(queries.addPosition)
          console.log("addPosition result: ", result.recordset[0].Id);

          // Added by Hakim on 5 Feb 2021 - Start
          // Add position document
          const result2 = await pool.request()
          .query(queries.getDocument)
          console.log("addPosition getDocument result: ", result2.recordset);
          let documents = result2.recordset
          let queries_addPositionDocument = ''
          for(let i = 0; i < documents.length; i++) {
            let query = 'INSERT INTO [JobPortal].[dbo].[PositionDocument] ' +
            '(Position, Document, PositionID, DocumentID, DocNo, Chk, DtIssue, DtExpiry, DocType, DocFile, GradeChk, IssuingAuthorityChk, TypeCompetencyChk) VALUES '

            query += '('
            query += `'${req.body.Position}',`
            query += `'${documents[i].Document}',`
            query += `'${result.recordset[0].Id}',`
            query += `'${documents[i].Id}',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N'`
            query += '); '

            queries_addPositionDocument += query
          }

          const result3 = await pool
            .request()
            .query(queries_addPositionDocument)
          console.log("addPosition addDocument result: ", result3.rowsAffected.length);
          // Added by Hakim on 5 Feb 2021 - End

          res.json(result.recordset[0])
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async updatePosition(req, res){
      try {
        console.log("updatePosition: ", req.body);
        if(req.body.Id != null && req.body.Position != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('Position',sql.VarChar , req.body.Position)
          .query(queries.updatePosition)
          console.log("updatePosition result: ", req.body.Id);

          // Added by Hakim on 6 Feb 2021 - Start
          // Update data in PositionDocument Table
          var updateDocumentCheckListStr =
          `UPDATE [JobPortal].[dbo].[PositionDocument] SET [Postion]='${req.body.Position}' WHERE [PositionID] = '${req.body.Id}'`

          const result2 = await pool
            .request()
            .query(updateDocumentCheckListStr)
          console.log("updatePosition result: ", result2.rowsAffected[0].length);
          // Added by Hakim on 6 Feb 2021 - End

          res.json({Id: req.body.Id})
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async deletePosition(req , res){
      try {
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deletePosition)
            console.log("deletePosition result: ", req.params.Id);

            // Added by Hakim on 5 Feb 2021 - Start
            // Delete position document
            const result2 = await pool.request()
            .input('PositionId',sql.SmallInt , req.params.Id)
            .query(queries.deleteDocumentCheckListByPositionId)
            console.log("deletePosition result: ", result2.rowsAffected.length);
            // Added by Hakim on 5 Feb 2021 - End

            res.json({Id: req.params.Id})
          } else {
            res.send('Please fill all the details!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new PositionController()
module.exports = controller;