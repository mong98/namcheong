const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class RaceController {

    async getRace(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getRace)
          console.log(result.recordset)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addRace(req , res){
      try {
        console.log("addRace: ", req.body);
        if(req.body.Race != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('Race', sql.VarChar, req.body.Race)
          .query(queries.addRace)
          console.log("addRace result: ", result.recordset[0].Id);
          res.json(result.recordset[0])
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateRace(req, res){
      try {
        console.log("updateRace: ", req.body);
        if(req.body.Id != null && req.body.Race != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('Race',sql.VarChar , req.body.Race)
          .query(queries.updateRace)
          console.log("updateRace result: ", req.body.Id);
          res.json({Id: req.body.Id})
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteRace(req , res){
      try {
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteRace)
            console.log("deleteRace result: ", req.params.Id);
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

const controller = new RaceController()
module.exports = controller;