const { sql, poolPromise } = require('../database/db')
const fs = require('fs')
var rawdata = fs.readFileSync('./query/queries.json')
var queries = JSON.parse(rawdata)

class OpenVacancyController {
  
  async getOpenVacancy(req, res) {
    console.log("go in open vacancy");
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getOpenVacancy)

       // Added by Hakim on 14 Jan 2021 - Start
      // Filter expired open vacancy
      // let vacanciesList = result.recordset;
      // let vacanciesListNonExpiry = [];
      // for (let i = 0; i < vacanciesList.length; i++) {
      //   let vacancyDateEnd = vacanciesList[i].DateEnd;
      //   let date = new Date('2020-01-01');
      //   if (date < vacancyDateEnd) {
      //     vacanciesListNonExpiry.push(vacanciesList[i]);
      //   }
      // }
      // Added by Hakim on 14 Jan 2021 - End

      console.log("retun open vacancy")
      console.log(result.recordset)
      res.json(result.recordset)
      // console.log(vacanciesListNonExpiry) // Added by Hakim on 14 Jan 2021
      // res.json(vacanciesListNonExpiry) // Added by Hakim on 14 Jan 2021
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getAppliedOpenVacancy(req, res) {
    console.log("go in getAppliedOpenVacancy");
    try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('LoginEmail', sql.VarChar, req.params.LoginEmail)
      .query(queries.getAppliedOpenVacancy)
      console.log("getAppliedOpenVacancy")
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async addOpenVacancy(req, res) {
    try {
      console.log('addOpenVacancy: ', req.body)
      if (req.body.Position != null) {
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Position', sql.VarChar, req.body.Position)
          .input('DateEnd', sql.DateTime, req.body.DateEnd)
          .input('HullNo', sql.VarChar, req.body.HullNo)
          .input('Qualification', sql.VarChar, req.body.Qualification)
          .query(queries.addOpenVacancy)
        console.log('addOpenVacancy result: ', result.recordset[0].Id)
        res.json(result.recordset[0])
      } else {
        res.send('Please fill all the details!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async updateOpenVacancy(req, res) {
    try {
      console.log('updateOpenVacancy: ', req.body)
      if (req.body.Id != null && req.body.Position != null) {
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.body.Id)
          .input('Position', sql.VarChar, req.body.Position)
          .input('DateEnd', sql.DateTime, req.body.DateEnd)
          .input('HullNo', sql.VarChar, req.body.HullNo)
          .input('Qualification', sql.VarChar, req.body.Qualification)
          .query(queries.updateOpenVacancy)
        res.json({ Id: req.body.Id })
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async deleteOpenVacancy(req, res) {
    try {
      if (req.params.Id != null) {
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('Id', sql.SmallInt, req.params.Id)
          .query(queries.deleteOpenVacancy)
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

const controller = new OpenVacancyController()
module.exports = controller
