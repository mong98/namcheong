const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class MatrixController {

    async getMatrix(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getMatrix)
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
    async addMatrix(req , res){
      try {
        console.log("addMatrix: ", req.body);
        if(req.body.MatrixNames != null ) {
          for(var i=0; i<req.body.MatrixNames.length; i++) {
            // Remove matrix then reinsert
            const poolRemove = await poolPromise
            const resultRemove = await poolRemove.request()
            .input('MatrixName',sql.VarChar , req.body.MatrixNames[i])
            .query(queries.removeMatrix)
            const pool = await poolPromise
            const result = await pool.request()
            .input('MatrixName',sql.VarChar , req.body.MatrixNames[i])
            .query(queries.addMatrix)
            console.log("addMatrix result: ", result)
            res.status(200)
          }
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        console.log(error.message)
        res.status(500)
        res.send(error.message)
      }
    }
    async updateMatrix(req, res){
      try {
        console.log("updateMatrix: ", req.body);
        if(req.body.Id != null && req.body.Document != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('Document',sql.VarChar , req.body.Document)
          //.input('UpdatedBy',sql.VarChar , "Kevin Ng")
          .query(queries.updateDocuments)
          res.json(result)
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteMatrix(req , res){
      try {
        console.log("deleteMatrix: ", req.params.Id);
        if(req.params.Id != null ) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('MatrixName',sql.VarChar , req.params.Id)
          .query(queries.removeMatrix)
          console.log("deleteMatrix result: ", result)
          res.status(200)
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        console.log(error.message)
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new MatrixController()
module.exports = controller;