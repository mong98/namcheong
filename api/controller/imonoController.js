const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class IMONoController {

    async getIMONo(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getIMONo)
          ////console.log("Result: ", result)
          ////console.log("Result recordsets[1]: ", result.recordsets[1])
          //console.log(result.recordset)
          res.json(result.recordset)
          //res.json({imono_result: result.recordsets[0], vessel_result: result.recordsets[1]})
        // uncomment this for stored procedure,
        // run the IMONo.sql in sql server to create stored proc
        /*const result = await pool.request().execute('sp_GetIMONo', (err, result) => {
           //console.log(result.recordset)
           res.json(result.recordset)
        })*/

      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async getVessel(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getVessel)
          ////console.log("Result: ", result)
          ////console.log("Result recordsets[1]: ", result.recordsets[1])
          //console.log(result.recordset)
          res.json(result.recordset)
        // uncomment this for stored procedure,
        // run the IMONo.sql in sql server to create stored proc
        /*const result = await pool.request().execute('sp_GetIMONo', (err, result) => {
           //console.log(result.recordset)
           res.json(result.recordset)
        })*/

      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addIMONo(req , res){
      try {
        //console.log("addIMONo: ", req.body);
        if(req.body.IMONo != null && req.body.Vessel != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('IMONo', sql.VarChar, req.body.IMONo)
          .input('Vessel', sql.VarChar, req.body.Vessel)
          .query(queries.addIMONo)
          //console.log("addIMONo result: ", result.recordset[0].Id);
          res.json(result.recordset[0])
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateIMONo(req, res){
      try {
        //console.log("updateIMONo: ", req.body);
        if(req.body.Id != null && req.body.IMONo != null && req.body.Vessel != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('IMONo',sql.VarChar , req.body.IMONo)
          .input('Vessel',sql.VarChar , req.body.Vessel)
          //.input('UpdatedBy',sql.VarChar , "Kevin Ng")
          .query(queries.updateIMONo)
          //console.log("updateIMONo result: ", req.body.Id);
          res.json({Id: req.body.Id})
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteIMONo(req , res){
      try {
          //console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteIMONo)
            //console.log("deleteIMONo result: ", req.params.Id);
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

const controller = new IMONoController()
module.exports = controller;