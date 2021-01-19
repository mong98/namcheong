const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class RelationshipController {

    async getRelationship(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getRelationship)
          console.log(result.recordset)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async addRelationship(req , res){
      try {
        console.log("addRelationship: ", req.body);
        if(req.body.Relationship != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('Relationship', sql.VarChar, req.body.Relationship)
          .query(queries.addRelationship)
          console.log("addRelationship result: ", result.recordset[0].Id);
          res.json(result.recordset[0])
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateRelationship(req, res){
      try {
        console.log("updateRelationship: ", req.body);
        if(req.body.Id != null && req.body.Relationship != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('Relationship',sql.VarChar , req.body.Relationship)
          .query(queries.updateRelationship)
          console.log("updateRelationship result: ", req.body.Id);
          res.json({Id: req.body.Id})
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteRelationship(req , res){
      try {
          console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteRelationship)
            console.log("deleteRelationship result: ", req.params.Id);
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

const controller = new RelationshipController()
module.exports = controller;