const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class StateController {

    async getState(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getState)
          console.log(result.recordset)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addState(req , res){
      try {
        console.log("addState: ", req.body);
        if(req.body.State != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('State', sql.VarChar, req.body.State)
          .query(queries.addState)
          console.log("addState result: ", result.recordset[0].Id);
          res.json(result.recordset[0])
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateState(req, res){
      try {
        console.log("updateState: ", req.body);
        if(req.body.Id != null && req.body.State != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('State',sql.VarChar , req.body.State)
          .query(queries.updateState)
          console.log("updateState result: ", req.body.Id);
          res.json({Id: req.body.Id})
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteState(req , res){
      try {
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteState)
            console.log("deleteState result: ", req.params.Id);
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

const controller = new StateController()
module.exports = controller;