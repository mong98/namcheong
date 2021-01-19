const { sql, poolPromise } = require('../database/db')
const fs = require('fs')
var rawdata = fs.readFileSync('./query/queries.json')
var queries = JSON.parse(rawdata)

class AllowanceController {
  async getAllowance(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getAllowance)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async addAllowance(req, res) {
    try {
      console.log('addAllowance: ', req.body)
      if (req.body.Allowance != null) {
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Allowance', sql.VarChar, req.body.Allowance)
          .query(queries.addAllowance)
        console.log('addAllowance result: ', result.recordset[0].Id)
        res.json(result.recordset[0])
      } else {
        res.send('Please fill all the details!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async updateAllowance(req, res) {
    try {
      console.log('updateAllowance: ', req.body)
      if (req.body.Id != null && req.body.Allowance != null) {
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .input('Allowance', sql.VarChar, req.body.Allowance)
          .query(queries.updateAllowance)
        console.log('updateAllowance result: ', req.body.Id)
        res.json({ Id: req.body.Id })
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async deleteAllowance(req, res) {
    try {
      console.log(req)
      if (req.params.Id != null) {
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.params.Id)
          .query(queries.deleteAllowance)
        console.log('deleteAllowance result: ', req.params.Id)
        res.json({ Id: req.params.Id })
      } else {
        res.send('Please fill all the details!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const controller = new AllowanceController()
module.exports = controller
