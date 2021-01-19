const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class MatrixTemplateController {

    async getMatrixTemplate(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getMatrixTemplate)
          console.log(result.recordset)
          res.json(result.recordset)
        // uncomment this for stored procedure,
        // run the Documents.sql in sql server to create stored proc
        /*const result = await pool.request().execute('sp_GetDocuments', (err, result) => {
           console.log(result.recordset)
           res.json(result.recordset)
        })*/

      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async addMatrixTemplate(req , res){
      try {
        console.log("addMatrixTemplate: ", req.body);
        if(req.body.matrixs != null ) {
          for(var i=0; i < req.body.matrixs.length; i++){
            var matrixTemplate = req.body.matrixs[i]
            console.log('test')
            // Remove matrix template then reinsert
            const poolRemove = await poolPromise
            const result = await poolRemove.request()
            .input('MatrixName',sql.VarChar , matrixTemplate.matrixName)
            .query(queries.removeMatrixTemplate)
            for(var j=0; j < matrixTemplate.ItemDesc.length; j++) {
              const pool = await poolPromise
              const result = await pool.request()
              .input('MatrixName',sql.VarChar , matrixTemplate.matrixName)
              .input('Item',sql.VarChar , matrixTemplate.Item[j])
              .input('ItemDesc',sql.VarChar , matrixTemplate.ItemDesc[j])
              .input('SeqNo',sql.SmallInt , j+1)
              .query(queries.addMatrixTemplate)
            }
          }
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        console.log(error.message)
        res.send(error.message)
    }
    }
    async updateMatrixTemplate(req, res){
      try {
        console.log("updateMatrix: ", req.body);
        if(req.body.Id != null && req.body.Document != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('Document',sql.VarChar , req.body.Document)
          //.input('UpdatedBy',sql.VarChar , "Kevin Ng")
          .query(queries.updateMatrixTemplate)
          res.json(result)
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteMatrixTemplate(req , res){
      try {
          console.log(req);
        if(req.params.MatrixName != null && req.params.ItemDesc != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('MatrixName',sql.VarChar , req.params.MatrixName)
            .input('ItemDesc', sql.VarChar, req.params.ItemDesc)
            .query(queries.deleteMatrixTemplate)
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

const controller = new MatrixTemplateController()
module.exports = controller;