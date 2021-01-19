const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class VesselController {

    async getVesselType(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getVesselType)
          console.log(result.recordset)
          res.json(result.recordset)

      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addVessel(req , res){
      try {
        console.log("addVessel: ", req.body);
        if(req.body.VesselName != null && req.body.VesselType != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('VesselName', sql.VarChar, req.body.VesselName)
          .input('VesselType', sql.VarChar, req.body.VesselType)
          .query(queries.addVessel)
          console.log("addVessel result: ", result.recordset[0].Id);
          res.json(result.recordset[0])
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateVessel(req, res){
      try {
        console.log("updateVessel: ", req.body);
        if(req.body.Id != null && req.body.VesselName != null && req.body.VesselType != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('VesselName',sql.VarChar , req.body.VesselName)
          .input('VesselType',sql.VarChar , req.body.VesselType)
          //.input('UpdatedBy',sql.VarChar , "Kevin Ng")
          .query(queries.updateVessel)
          console.log("updateVessel result: ", req.body.Id);
          res.json({Id: req.body.Id})
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteVessel(req , res){
      try {
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteVessel)
            console.log("deleteVessel result: ", req.params.Id);
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

const controller = new VesselController()
module.exports = controller;