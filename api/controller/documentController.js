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
          res.json(result)
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