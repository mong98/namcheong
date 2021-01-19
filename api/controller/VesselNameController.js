const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class VesselNameController {

    async getVesselName(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getVesselName)
          console.log(result.recordset)
          res.json(result.recordset)
        // uncomment this for stored procedure,
        // run the Documents.sql in sql server to create stored proc
        /*const result = await pool.request().execute('sp_GetDocuments', (err, result) => {
           console.log(result.recordset)
           res.json(result.recordset)
        })*/

      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new VesselNameController()
module.exports = controller;