const { sql, poolPromise } = require('../database/db')
const fs = require('fs')
var rawdata = fs.readFileSync('./query/queries.json')
const bcrypt = require('bcryptjs')
var queries = JSON.parse(rawdata)

class UserIdConfigureController {
  async getUserIdConfigure(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getUserIdConfigure)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getAdminDetails(req, res) {
    try {
      if (req.params.Id != null) {
      const pool = await poolPromise
      const result = await pool
            .request()
            .input('Id', sql.VarChar, req.params.Id)
     
            .query(queries.getAdminDetails)
            console.log(req.params.Id)
            console.log(result.recordset)
            res.json(result.recordset)
      }else{
        console.log('req.params.Id is null')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
      console.log(req.params.Id)
    }
  }

  async getManagerList(req, res) {
    try {
      var queryStr = queries.getManagerList.join(' ')
      const pool = await poolPromise
      const result = await pool.request().query(queryStr)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getUserModule(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request().query(queries.getUserModule)
      console.log(result.recordset)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async getUserIdConfigureById(req, res) {
    try {
      if (req.params.UserConfigureID != null) {
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('UserConfigureID', sql.SmallInt, req.params.UserConfigureID)
          .query(queries.getUserIdConfigureById)
        console.log(result.recordset)
        res.json(result.recordset)
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async addUserIdConfigure(req, res) {
    try {
      console.log('addUserIdConfigure: ', req.body)
      if (
        req.body.constructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        console.log('Object missing')
        res.status(500)
        res.send(error.message)
      } else {
        console.log('Object detected')
        const pool = await poolPromise
        const values = Object.values(req.body)
        console.log('values: ', values)
        var success_val = true
        var insertAccessModuleUser =
          'INSERT INTO [JobPortal].[dbo].[AccessModuleUser] '
        insertAccessModuleUser +=
          '([ModuleID], [UserConfigureID], [Chk], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) '
        insertAccessModuleUser += 'VALUES ('
        // validate useridconfigure data not null
        if (values[0].UserID == null || values[0].UserName == null) {
          success_val = false
        }
        var UserConfigureID = 0
        if (success_val) {
          // Added by Hakim on 3 Feb 2021 - Start
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(values[0].Password, salt)
          // Added by Hakim on 3 Feb 2021 - End

          const result = await pool
            .request()
            .input('UserID', sql.VarChar, values[0].UserID)
            .input('Name', sql.VarChar, values[0].Name)
            .input('UserName', sql.VarChar, values[0].UserName)
            .input('Password', sql.VarChar, hashPassword) // Added by Hakim on 3 Feb 2021
            .input('CreatedBy', sql.VarChar, values[0].CreatedBy) // Updated by Hakim on 3 Feb 2021
            .input('UpdatedBy', sql.VarChar, values[0].CreatedBy) // Updated by Hakim on 3 Feb 2021
            .input('ManagerId', sql.Int, values[0].ManagerId)
            .input('ManagerName', sql.VarChar, values[0].ManagerName)
            .query(queries.addUserIdConfigure)
          UserConfigureID = result.recordset[0].UserConfigureID
        } else {
          res.send('All fields are required!')
        }

        var queries_insertAccessModuleUser = insertAccessModuleUser
        if (UserConfigureID == null) {
          success_val = false
        }

        for (var i = 0; i < values.length; i++) {
          if (
            values[i].ModuleID == null ||
            UserConfigureID == null ||
            values[i].Chk == null
          ) {
            success_val = false
            break
          }
          queries_insertAccessModuleUser += "'" + values[i].ModuleID + "', "
          queries_insertAccessModuleUser += "'" + UserConfigureID + "', "
          queries_insertAccessModuleUser += "'" + values[i].Chk + "', "
          queries_insertAccessModuleUser += 'NULL, NULL, NULL, NULL)'
          if (i !== values.length - 1) {
            queries_insertAccessModuleUser += ';'
            queries_insertAccessModuleUser += insertAccessModuleUser
          }
        }
        queries_insertAccessModuleUser += ';'
        queries_insertAccessModuleUser += 'SELECT SCOPE_IDENTITY() AS [Id];'
        if (success_val) {
          console.log(
            'queries_insertAccessModuleUser: ',
            queries_insertAccessModuleUser
          )
          const result = await pool
            .request()
            .query(queries_insertAccessModuleUser)
          res.json({ Id: UserConfigureID })
        } else {
          // res.send('All fields are required!')
        }
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  async updateUserIdConfigure(req, res) {
    try {
      console.log('updateUserIdConfigure: ', req.body)
      console.log(
        'updateUserIdConfigure - req.params.UserConfigureID: ',
        req.params.UserConfigureID
      )
      if (
        req.body.constructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        console.log('Object missing')
        res.status(500)
        res.send(error.message)
      } else {
        console.log('Object detected')
        console.log('req.params.UserConfigureID: ', req.params.UserConfigureID)
        const pool = await poolPromise
        /*const result = await pool.request()
          .input('UserConfigureID', sql.SmallInt, parseInt(req.params.UserConfigureID))
          .query(queries.getUserIdConfigureById)
          console.log(result.recordset)
        if(result.recordset == null)
        {
          res.status(500)
          res.send("User Not Found!")
        }*/
        const values = Object.values(req.body)
        console.log('values: ', values)
        var success_val = true
        var updateAccessModuleUser =
          'UPDATE [JobPortal].[dbo].[AccessModuleUser] SET '
        var updateUserIdConfigureUser =
          'UPDATE [JobPortal].[dbo].[UserConfigure] SET '
        var queries_updateAccessModuleUser = updateAccessModuleUser
        if (req.params.UserConfigureID == null) {
          success_val = false
        }

        for (var i = 0; i < values.length; i++) {
          if (
            values[i].ModuleID == null ||
            values[i].UserConfigureID == null ||
            values[i].Chk == null
          ) {
            success_val = false
            break
          }
          queries_updateAccessModuleUser += "[Chk] = '" + values[i].Chk + "' "
          queries_updateAccessModuleUser +=
            "WHERE [UserConfigureID] = '" + values[i].UserConfigureID + "'"
          queries_updateAccessModuleUser +=
            ' AND [ModuleID] = ' + values[i].ModuleID
          if (i !== values.length - 1) {
            queries_updateAccessModuleUser += ';'
            queries_updateAccessModuleUser += updateAccessModuleUser
          }
        }
        queries_updateAccessModuleUser += ';'
        if (values[0].UserID == null || values[0].UserName == null) {
          success_val = false
        }

        updateUserIdConfigureUser += "[UserID] = '" + values[0].UserID + "', "
        // updateUserIdConfigureUser += "[Name] = '" + values[0].Name + "', "
        updateUserIdConfigureUser +=
          "[UserName] = '" + values[0].UserName + "', "
        updateUserIdConfigureUser +=
          "[ManagerId] = '" + values[0].ManagerId + "', "
        updateUserIdConfigureUser +=
          "[ManagerName] = '" + values[0].ManagerName + "', "
        updateUserIdConfigureUser +=
          "[UpdatedBy] = '" + values[0].UpdatedBy + "' " // Added by Hakim on 3 Feb 2021
        updateUserIdConfigureUser += 'WHERE [Id] = ' + values[0].UserConfigureID
        queries_updateAccessModuleUser += updateUserIdConfigureUser
        queries_updateAccessModuleUser += ';'
        if (success_val) {
          console.log(
            'queries_updateAccessModuleUser: ',
            queries_updateAccessModuleUser
          )
          const result = await pool
            .request()
            .query(queries_updateAccessModuleUser)
          res.json({ UserConfigureID: req.params.UserConfigureID })
        } else {
          res.send('All fields are required!')
        }
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

  // Added by Hakim on 3 Feb 2021 - Start
  async updateUserIdConfigurePassword(req, res) {
    try {
      console.log('updateUserIdConfigurePassword: ', req.body)
      console.log(
        'updateUserIdConfigurePassword - req.params.UserConfigureID: ',
        req.params.UserConfigureID
      )
      if (
        req.params.UserConfigureID == null
      ) {
        console.log('Object missing')
        res.status(500)
        res.send(error.message)
      } else {
        console.log('Object detected')
        const pool = await poolPromise
        var success_val = true

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.Password, salt)

        var updateUserIdConfigureUser =
          'UPDATE [JobPortal].[dbo].[UserConfigure] SET '
        updateUserIdConfigureUser +=
          "[Password] = '" + hashPassword + "' "
        updateUserIdConfigureUser += 'WHERE [Id] = ' + req.params.UserConfigureID + ';'

        if (success_val) {
          console.log(
            'queries_updateUserIdConfigurePasswordUser: ',
            updateUserIdConfigureUser
          )
          const result = await pool
            .request()
            .query(updateUserIdConfigureUser)
          res.json({ UserConfigureID: req.params.UserConfigureID })
        } else {
          res.send('All fields are required!')
        }
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  // Added by Hakim on 3 Feb 2021 - End

  async deleteUserIdConfigure(req, res) {
    try {
      console.log('req.params: ', req.params)
      if (req.params.UserConfigureID != null) {
        const pool = await poolPromise
        const result = await pool
          .request()
          .input('UserConfigureID', sql.VarChar, req.params.UserConfigureID)
          .query(queries.deleteUserIdConfigure)
        console.log(
          'deleteUserIdConfigure result: ',
          req.params.UserConfigureID
        )
        res.json({ UserConfigureID: req.params.UserConfigureID })
      } else {
        res.send('Please fill all the details!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const controller = new UserIdConfigureController()
module.exports = controller
