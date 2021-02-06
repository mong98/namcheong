const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class DocumentController {

    async getDocument(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getDocument)
          console.log(result.recordset)
          res.json(result.recordset)
        // uncomment this for stored procedure,
        // run the Document.sql in sql server to create stored proc
        /*const result = await pool.request().execute('sp_GetDocument', (err, result) => {
           console.log(result.recordset)
           res.json(result.recordset)
        })*/

      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async addDocument(req , res){
      try {
        console.log("addDocument: ", req.body);
        if(req.body.Document != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('document',sql.VarChar , req.body.Document)
          .query(queries.addDocument)
          console.log("addDocument result: ", result.recordset[0].Id);

          // Added by Hakim on 5 Feb 2021 - Start
          // Add document into position document
          const result2= await pool.request()
          .query(queries.getPosition)
          console.log("addDocument result: ", result2.rowsAffected)
          let positions = result2.recordset
          let queries_addPositionDocument = ''
          for(let i = 0; i < positions.length; i++) {
            let query = 'INSERT INTO [JobPortal].[dbo].[PositionDocument] ' +
            '(Position, Document, PositionID, DocumentID, DocNo, Chk, DtIssue, DtExpiry, DocType, DocFile, GradeChk, IssuingAuthorityChk, TypeCompetencyChk) VALUES '

            query += '('
            query += `'${positions[i].Position}',`
            query += `'${req.body.Document}',`
            query += `'${positions[i].Id}',`
            query += `'${result.recordset[0].Id}',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N',`
            query += `'N'`
            query += ') '

            queries_addPositionDocument += query
          }

          const result3 = await pool
            .request()
            .query(queries_addPositionDocument)
          console.log("addPosition addDocument result: ", result3.rowsAffected.length);
          // Added by Hakim on 5 Feb 2021 - End

          res.json(result.recordset[0])
          // uncomment this for stored procedure,
          // run the Document.sql in sql server to create stored proc
          /*const result = await pool.request()
          .input('document',sql.VarChar , req.body.documentname)
          .execute('sp_AddDocument', (err, result) => {
            console.log(result.recordset)
            console.log("err: ", err)
            if(err) {
                res.json({id: null})
            }
            else {
                res.json(result.recordset[0])
            }
          })*/
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    }
    async updateDocument(req, res){
      try {
        console.log("updateDocument: ", req.body);
        if(req.body.Id != null && req.body.Document != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('Document',sql.VarChar , req.body.Document)
          //.input('UpdatedBy',sql.VarChar , "Kevin Ng")
          .query(queries.updateDocument)

          // Added by Hakim on 6 Feb 2021 - Start
          // Update data in PositionDocument Table
          var updateDocumentCheckListStr =
          `UPDATE [JobPortal].[dbo].[PositionDocument] SET [Document]='${req.body.Document}' WHERE [DocumentID] = '${req.body.Id}'`

          const result2 = await pool
            .request()
            .query(updateDocumentCheckListStr)
          console.log("updateDocument result: ", result2.rowsAffected[0].length);
          // Added by Hakim on 6 Feb 2021 - End
          res.json(req.body)
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteDocument(req , res){
      try {
        console.log("deleteDocument")
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteDocument)
            res.json(result)
          } else {
            res.send('Please fill all the details!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new DocumentController()
module.exports = controller;