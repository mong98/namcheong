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
          .query(queries.addPosition)
          console.log("addPosition result: ", result.recordset[0].Id);
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