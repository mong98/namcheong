const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class IssuingAuthorityController {

    async getIssuingAuthority(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getIssuingAuthority)
          console.log(result.recordset)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addIssuingAuthority(req , res){
      try {
        console.log("addIssuingAuthority: ", req.body);
        if(req.body.Name != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('Name', sql.VarChar, req.body.Name)
          .input('Description', sql.VarChar, req.body.Description)
          .query(queries.addIssuingAuthority)
          console.log("addIssuingAuthority result: ", result.recordset[0].Id);
          res.json(result.recordset[0])
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async updateIssuingAuthority(req, res){
      try {
        console.log("updateIssuingAuthority: ", req.body);
        if(req.body.Id != null && req.body.Name != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('Name',sql.VarChar , req.body.Name)
          .input('Description', sql.VarChar, req.body.Description)
          .query(queries.updateIssuingAuthority)
          console.log("updateIssuingAuthority result: ", req.body.Id);
          res.json({Id: req.body.Id})
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async deleteIssuingAuthority(req , res){
      try {
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteIssuingAuthority)
            console.log("deleteIssuingAuthority result: ", req.params.Id);
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

const controller = new IssuingAuthorityController()
module.exports = controller;