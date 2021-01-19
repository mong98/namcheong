const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class ContactListController {

    async getContactLists(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getContactLists)
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
    async addContactLists(req , res){
      try {
        console.log("addContactLists: ", req.body);
        if(req.body.Name != null && req.body.Email != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('Name',sql.VarChar , req.body.Name)
          .input('Email',sql.VarChar , req.body.Email)
          .input('ContactNo',sql.VarChar , req.body.ContactNo)
          .input('Message',sql.VarChar , req.body.Message)
          .query(queries.addContactLists)
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    }
    async updateDocuments(req, res){
      try {
        console.log("updateDocuments: ", req.body);
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
    async deleteDocuments(req , res){
      try {
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteDocuments)
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

const controller = new ContactListController()
module.exports = controller;