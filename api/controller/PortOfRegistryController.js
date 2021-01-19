const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class PortOfRegistryController {

    async getPortOfRegistry(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getPortOfRegistry)
          console.log(result.recordset)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addPortOfRegistry(req , res){
      try {
        console.log("addPortOfRegistry: ", req.body);
        if(req.body.PortOfRegistry != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('PortOfRegistry', sql.VarChar, req.body.PortOfRegistry)
          .query(queries.addPortOfRegistry)
          console.log("addPortOfRegistry result: ", result.recordset[0].Id);
          res.json(result.recordset[0])
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updatePortOfRegistry(req, res){
      try {
        console.log("updatePortOfRegistry: ", req.body);
        if(req.body.Id != null && req.body.PortOfRegistry != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('PortOfRegistry',sql.VarChar , req.body.PortOfRegistry)
          .query(queries.updatePortOfRegistry)
          console.log("updatePortOfRegistry result: ", req.body.Id);
          res.json({Id: req.body.Id})
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deletePortOfRegistry(req , res){
      try {
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deletePortOfRegistry)
            console.log("deletePortOfRegistry result: ", req.params.Id);
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

const controller = new PortOfRegistryController()
module.exports = controller;