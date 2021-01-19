const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class ReligionController {

    async getReligion(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getReligion)
          console.log(result.recordset)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addReligion(req , res){
      try {
        console.log("addReligion: ", req.body);
        if(req.body.Religion != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('Religion', sql.VarChar, req.body.Religion)
          .query(queries.addReligion)
          console.log("addReligion result: ", result.recordset[0].Id);
          res.json(result.recordset[0])
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateReligion(req, res){
      try {
        console.log("updateReligion: ", req.body);
        if(req.body.Id != null && req.body.Religion != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('Religion',sql.VarChar , req.body.Religion)
          .query(queries.updateReligion)
          console.log("updateReligion result: ", req.body.Id);
          res.json({Id: req.body.Id})
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteReligion(req , res){
      try {
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteReligion)
            console.log("deleteReligion result: ", req.params.Id);
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

const controller = new ReligionController()
module.exports = controller;