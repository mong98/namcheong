const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class CountryController {

    async getCountry(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getCountry)
          console.log(result.recordset)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addCountry(req , res){
      try {
        console.log("addCountry: ", req.body);
        if(req.body.Country != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('Country', sql.VarChar, req.body.Country)
          .query(queries.addCountry)
          console.log("addCountry result: ", result.recordset[0].Id);
          res.json(result.recordset[0])
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateCountry(req, res){
      try {
        console.log("updateCountry: ", req.body);
        if(req.body.Id != null && req.body.Country != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('Country',sql.VarChar , req.body.Country)
          .query(queries.updateCountry)
          console.log("updateCountry result: ", req.body.Id);
          res.json({Id: req.body.Id})
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteCountry(req , res){
      try {
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteCountry)
            console.log("deleteCountry result: ", req.params.Id);
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

const controller = new CountryController()
module.exports = controller;