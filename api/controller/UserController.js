const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
var generator = require('generate-password');
const sgMail = require('@sendgrid/mail')

class UserController {

    async getUser(req , res){
      //console.log("come in user")
      //console.log("getUser: ", req.body);
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .input('UserName',sql.VarChar , req.body.username)
          .input('Password',sql.VarChar , req.body.password)
          .query(queries.getUser)
          //console.log(result.recordset)
          //res.json(result.recordset)
          res.send(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async authenticateUserApp(req , res){
      //console.log("come in authenticateUserApp")
      //console.log("getUser: ", req.body);
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .input('LoginEmail',sql.VarChar , req.body.LoginEmail)
          .query(queries.authenticateUserApp)
          //console.log(result.recordset)
          if(result != null && result.recordset != null) {
            if(result.recordset[0].Password == req.body.Password) {
              //console.log("User authenticated!")
              res.send(result.recordset)
              return
            }
            else {
              //console.log("check if hashed password")
              // check if password is hashed
              const salt = await bcrypt.genSalt(10);
              const hashPassword = await bcrypt.hash(req.body.Password, salt)
              //console.log("loginAdmin bcrypt.genSalt(10) password: ", hashPassword)
              const validPassword = await bcrypt.compare(hashPassword, result.recordset[0].Password);
              if(validPassword) {
                //console.log("User authenticated! Hashed Password")
                res.send(result.recordset)
                return
              }
            }
          }
          // set to empty array to return
          result.recordset = []
          //res.json(result.recordset)
          res.send(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async authenticateAdmin(req, res) {
      //console.log("come in authenticate")
      //console.log("get authenticate: ", req.body);
      const token = req.body.token;
      if (!token) return res.status(401).json({ error: "Access denied" });
      try {
        const verified = jwt.verify(token, "anystring");
        res.status(200).json({ ok: "Token valid" });
      } catch (err) {
        res.status(400).json({ error: "Token is not valid" });
      }
    }

    async forgotPassword(req, res) {
      try { 
        if (req.body.email) {
          const pool = await poolPromise
          const result = await pool.request()
            .input('LoginEmail',sql.VarChar , req.body.email)
            .query(queries.getLoginUser)

            const userEmailExist = result.recordset.length;

            var password = generator.generate({
              length: 10,
              numbers: true
            });

            var sendEmail = false;
          
            if (userEmailExist) {
              //send email
              // sgMail.setApiKey(
              //   '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'
              // )
              let htmlText =
                'Dear ' +
                result.recordset[0].Name +
                '<br /><br />' +
                'Temporary password is created. Please use the temporary password to login to account' +
                '<br /><br />' +
                '<strong>Temporary password: <strong>' + password + '<br />' 

              // const msg = {
              //   //to: 'desmond@wiserobot.com',
              //   to: result.recordset[0].LoginEmail, // Change to your recipient
              //   from: 'hakim@wiserobot.com', // Change to your verified sender
              //   subject: '[TEST]: SKOM eCrew Job Portal Password Reset',
              //   text: 'SKOM eCrew Job Portal Password Reset',
              //   html: htmlText,
              // }
              // sgMail
              //   .send(msg)
              //   .then(() => {
              //     sendEmail = true
              //     //console.log('Forgot Password Email sent to ' + result.recordset[0].LoginEmail)
              //   })
              //   .then(() => {
                  // if (sendEmail) {
                  //   //const pool = await poolPromise
                  //   const result1 = pool.request()
                  //   .input('Password', sql.VarChar , password)
                  //   .input('LoginEmail', sql.VarChar, req.body.email)
                  //   .query(queries.forgotPasswordUser)

                  //   result1.then(function(data) {
                  //     var recordUser = data.rowsAffected[0];

                  //     if (recordUser) {
                  //       res.status(200).send({message: 'Reset Password successfully. Please check your email!'});
                  //     } else {
                  //       res.status(400).send('Failed to reset password!')
                  //     }
                  //   })
                    
                  // } else {
                  //   res.status(400).send('Failed to send email!')
                  // }
              //   })
              //   .catch((error) => {
              //     console.error(error)
              //     res.status(500)
              //     res.send(error.message)
              //   })

              // Added by Hakim on 22 Feb 2021 - Start
              var nodemailer = require('nodemailer')
              let transporter = nodemailer.createTransport({
                pool: false,
                host: "smtp.office365.com",
                port: 587,
                secureConnection: false,
                tls: { ciphers: 'SSLv3' },
                auth: {
                  user: "e-crew@skom.com.my",
                  pass: ""
                }
              });

              // let transporter = nodemailer.createTransport({
              //   sendmail: true,
              //   newline: 'windows',
              //   path: '/usr/lib/sendmail'
              // })

              transporter.verify(function (error, success) {
                if (error) {
                  console.log(error)
                } else {
                  console.log("Server ready to send email")
                }
              })

              transporter.sendMail({
                from: 'e-crew@skom.com.my',
                to:  result.recordset[0].LoginEmail,
                subject: '[TEST]: SKOM eCrew Job Portal Password Reset',
                html: htmlText
              }, 
              function(err, info) {
                if (!err) {
                  //const pool = await poolPromise
                  const result1 = pool.request()
                  .input('Password', sql.VarChar , password)
                  .input('LoginEmail', sql.VarChar, req.body.email)
                  .query(queries.forgotPasswordUser)

                  result1.then(function(data) {
                    var recordUser = data.rowsAffected[0];

                    if (recordUser) {
                      res.status(200).send({message: 'Reset Password successfully. Please check your email!'});
                    } else {
                      res.status(400).send('Failed to reset password!')
                    }
                  })
                } else {
                  res.status(400).send('Failed to send email!')
                }
              })
			        // Added by Hakim on 22 Feb 2021 - End
              
            } else {
              res.status(400).send('Email not exist!')
            }
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async updatePasswordAdmin(req, res) {
      try {
        //console.log("updatePasswordAdmin: ", req.body);
        if(req.body.password != null && req.body.username != null) {
            let isNewDB = false
            const pool = await poolPromise
            let result = await pool.request()
              .input('UserName',sql.VarChar , req.body.username)
              .input('Password',sql.VarChar, req.body.password)
              .query(queries.getAdmin)

            // Added by Hakim on 8 Feb 2021 - Start
            // Check user in new db
            const resultNewDB = await pool.request()
              .input('UserName',sql.VarChar , req.body.username)
              .input('Password',sql.VarChar, req.body.password)
              .query(queries.getAdmin2)
            if (resultNewDB.recordset.length != 0 && resultNewDB.recordset[0].Password != null) {
              result = resultNewDB
              isNewDB = true
            }
            // Added by Hakim on 8 Feb 2021 - Start
			
            let user = result.recordset[0]
            if (result.recordset.length == 0 ) {
              res.status(400).send('Password Incorrect?!')
            } else {
              
              // Added by Hakim on 8 Feb 2021 - Start
              let query = queries.updatePasswordAdmin
              let new_password = req.body.new_password
              if (isNewDB) {
                let validPassword = await bcrypt.compare(req.body.password, user.Password)
                if (!validPassword) {
                res.status(400).send('Password Incorrect?!')
                }
                
                const salt = await bcrypt.genSalt(10);
                new_password = await bcrypt.hash(req.body.new_password, salt)
                query = queries.updatePasswordAdmin2
              }
              // Added by Hakim on 8 Feb 2021 - End

              const pool = await poolPromise
              const result = await pool.request()
              .input('Password', sql.VarChar , new_password) // Update by Hakim on 8 Feb 2021
              .input('UserName', sql.VarChar, req.body.username)
              .query(query)

              var recordUser = result.rowsAffected[0];

              if (recordUser) {
                const token = jwt.sign({
                  name: recordUser.UserName,
                  id: recordUser.UserID,
                }, "anystring", {expiresIn: 3600})
                // res.status(200).json({token})
                res.status(200).send({"token" : token, "name": recordUser.UserName, "email": recordUser.LoginEmail});
              } else {
                res.status(400).send('Failed to change password!')
              }
            }
        } else {
          res.status(400).send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async updatePasswordUser(req, res) {
      try {
        //console.log("updatePasswordUser: ", req.body);
        if(req.body.password != null && req.body.new_password != null 
          && req.body.email != null) {
            const pool = await poolPromise
            const result = await pool.request()
              .input('LoginEmail',sql.VarChar , req.body.email)
              .query(queries.getEmailUser)

              //console.log(result.recordset)
              const userEmailExist = result.recordset.length;
              var getRecordUser = result.recordset[0];

              if (!userEmailExist) {
                res.send('Failed to change password, email no exist!')
              } else {
                //const salt = await bcrypt.genSalt(10);
                //req.body.new_password = await bcrypt.hash(req.body.new_password, salt)
                
                const pool = await poolPromise
                const result = await pool.request()
                .input('newPassword', sql.VarChar , req.body.new_password)
                .input('Password', sql.VarChar , req.body.password)
                .input('LoginEmail', sql.VarChar, req.body.email)
                .query(queries.updatePasswordUser)

                var recordUser = result.rowsAffected[0];

                if (recordUser) {
                  const token = jwt.sign({
                    name: recordUser.Name,
                    id: recordUser.Id,
                  }, "anystring", {expiresIn: 3600})
                  // res.status(200).json({token})
                  //res.send(token)
                  res.status(200).send({"token" : token, "name": recordUser.Name, "email": getRecordUser.LoginEmail});
                } else {
                  res.status(400).send('Failed to change password!')
                }
              }
        } else {
          res.status(400).send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async authenticateUser(req, res, next) {
      //console.log("come in authenticate")
      //console.log("get authenticate: ", req.body);
      const header = req.headers['authorization'];

      if(typeof header !== 'undefined') {
        //console.log("header !== undefined")
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        //console.log("token: ", token)
        //next();
      } else {
        //If header is undefined return Forbidden (403)
        //console.log("Forbidden (403)")
        return res.sendStatus(403)
      }

      const token = req.token;
      if (!token) return res.status(401).json({ error: "Access denied" });
      try {
        const verified = jwt.verify(token, "anystring", (err, verifiedJwt) => {
          if(err){
            //console.log("error: ", err)
            if (err.name === 'TokenExpiredError') {
              //create a new token and send the same way you created initially
              return res.status(401).json({ error: "TokenExpiredError" });
            }
            return res.status(400).json({ error: "Token is not valid" });
          }else{
            //console.log("Successfully verified: ", verifiedJwt)
            //res.status(200).json({ ok: "Token valid" });
            //next()
          }
        })
        //console.log("verified: next")
        next()
        //return res.status(200).json({ ok: "Token valid" });
        //return res.status(400).json({ error: "Token is not valid" });
      } catch (err) {
        //console.log("catch error: ", err)
        res.status(400).json({ error: "Token is not valid" });
      }
    }

    async loginAdmin(req , res){
      //console.log("come in login admin")
      //console.log("get login: ", req.body);
      try {
        if (req.body.password && req.body.username) {
          const pool = await poolPromise
          let result = await pool.request()
            .input('UserName',sql.VarChar , req.body.username)
            .input('Password',sql.VarChar , req.body.password)
            .query(queries.getLoginAdmin) // Find user in old db
            //console.log(result.recordset);
          
          // Added by Hakim on 3 Feb 2021 - Start
          // Find user in new db
          let resultNewDB = await pool.request()
            .input('UserName',sql.VarChar , req.body.username)
            .input('Password',sql.VarChar , req.body.password)
            .query(queries.getLoginAdmin2)
            //console.log(resultNewDB.recordset);

          if (resultNewDB.recordset[0] != null && resultNewDB.recordset[0].Password != null) {
            result = resultNewDB
          }
          // Added by Hakim on 3 Feb 2021 - End

          var userData = result.recordset[0];
          if (userData) {

            let resultAdmin = await pool.request()
            .input('Id', sql.VarChar, userData.UserName)
            .query(queries.getAdminDetails)

            let resultAccessModule = await pool.request()
            .input('UserConfigureID', sql.SmallInt, resultAdmin.recordset[0].Id)
            .query(queries.getUserIdConfigureById)

            let userAccessModule = resultAccessModule.recordset;

            console.log('userAccessModule')
            console.log(resultAccessModule);

            const validPassword = await bcrypt.compare(req.body.password, userData.Password);
            
            if (!validPassword) {
              //console.log("loginAdmin compare plaintext")
              // maybe only not hash but the password is correct
              if (req.body.password === userData.Password) {
                const token = jwt.sign({
                  name: userData.UserName,
                  id: userData.UserID,
                }, "anystring", {expiresIn: 3600})
                // res.status(200).json({token})
                //res.json({"token" : token})
                res.status(200).send({"token" : token, "name": userData.UserName, "email": userData.Email,"UserID": userData.UserID[0],"AccessModule":userAccessModule}); // Comment by Hakim on 3 Feb 2021
              } else {
                //res.json({"token" : null, "error": 'Password not correct'});
                //console.log("Password not correct")
                return res.status(401).json({ error: "Password not correct" });
              }
            } else {
              const token = jwt.sign({
                name: userData.UserName,
                id: userData.UserID,
              }, "anystring", {expiresIn: 3600})
              // res.status(200).json({token})
              //console.log("token: ", token)
              //res.json({"token" : token})
              res.status(200).send({"token" : token, "name": userData.UserName, "email": userData.LoginEmail,"UserID": userData.UserID[0],"AccessModule":userAccessModule});
              // res.header("auth-token", token).json({
              //   error: null,
              //   data: {
              //     token,
              //   },
              // });
            }
          } else {
            // res.status(400).json({"token" : null, "error": 'Email not correct!'});
            res.send('Username not correct!')
          }
        } else {
          res.status(400).json({"error": 'All fields are required!'});
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async loginUser(req , res){
      //console.log("come in login")
      //console.log("get login: ", req.body);
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .input('LoginEmail',sql.VarChar , req.body.email)
          .input('Password',sql.VarChar , req.body.password)
          .query(queries.getLoginUser)
          //console.log(result.recordset);
          ////console.log(result.recordset[0].Id);
          //res.json(result.recordset)
          //res.send(result.recordset)
          var userData = result.recordset[0];
          if (userData) {
            const validPassword = await bcrypt.compare(req.body.password, userData.Password);
            
            if (!validPassword) {
              //console.log("check plaintext password")
              // maybe only not hash but the password is correct
              if (req.body.password === userData.Password) {
                const token = jwt.sign({
                  name: userData.Name,
                  id: userData.Id,
                }, "anystring", {expiresIn: 3600})
                // res.status(200).json({token})
                //res.json({"token" : token})
                res.status(200).send({"token" : token, "name": userData.Name, "email": userData.LoginEmail});
              } else {
                //res.json({"token" : null, "error": 'Password not correct'});
                return res.status(401).json({ error: "Password not correct" });
              }
            } else {
              //console.log("check hashed password")
              const token = jwt.sign({
                name: userData.Name,
                id: userData.Id,
              }, "anystring", {expiresIn: 3600})
              // res.status(200).json({token})
              //console.log("token: ", token)
              res.status(200).send({"token" : token, "name": userData.Name, "email": userData.LoginEmail});
              // res.header("auth-token", token).json({
              //   error: null,
              //   data: {
              //     token,
              //   },
              // });
            }
          } else {
            res.status(400).json({"token" : null, "error": 'Email not correct!'});
            //res.send('Email not correct!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async createAdmin(req , res){
      try {
        //console.log("createAdmin: ", req.body);
        // LoginEmail, Password, Name, RetypePassword
        if(req.body.username != null && req.body.password != null && req.body.email != null && req.body.retyped_password != null) {
            const pool = await poolPromise
            const result = await pool.request()
              .input('Email',sql.VarChar , req.body.email)
              .query(queries.getEmailAdmin)

              const adminEmailExist = result.recordset.length;
            
              if (!adminEmailExist) {
                //console.log("email no exist")
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
                
                const pool = await poolPromise
                const result = await pool.request()
                .input('UserName', sql.VarChar, req.body.username)
                .input('Password', sql.VarChar , req.body.password)
                .input('Email', sql.VarChar, req.body.email)
                .input('StatusID', sql.Int, 1)
                .input('DepartmentID', sql.Int, 4)
                .input('FirstName', sql.VarChar, "Kevin")
                .input('LastName', sql.VarChar, "Ng")
                .query(queries.addAdmin)
                //console.log("addAdmin result: ", result.recordset[0].UserID);
                
                //res.json(result.recordset[0].UserID)
                var newUser = result.recordset[0];

                if (newUser) {
                  const token = jwt.sign({
                    name: newUser.UserName,
                    id: newUser.UserID,
                  }, "anystring", {expiresIn: 3600})
                  // res.status(200).json({token})
                  //res.send(token)
                  res.status(200).send({"token" : token, "name": newUser.UserName, "email": newUser.LoginEmail});
                } else {
                  res.status(400).send('Failed to create admin!')
                }
              } else {
                res.status(400).send('Email already Exist!')
              }
        } else {
          res.status(400).send('Please fill all the details!')
        }
      } catch (error) {
        //console.log("in error")
        res.status(500)
        res.send(error.message)
      }
    }

    async createUser(req , res){
      try {
        //console.log("createUser: ", req.body);
        // LoginEmail, Password, Name, RetypePassword
        if(req.body.username != null && req.body.password != null 
          && req.body.email != null && req.body.retyped_password != null) {
            const pool = await poolPromise
            const result = await pool.request()
              .input('LoginEmail',sql.VarChar , req.body.email)
              .query(queries.getEmailUser)

              const userEmailExist = result.recordset.length;
            
              if (!userEmailExist) {
                //console.log("email no exist")
                //const salt = await bcrypt.genSalt(10);
                //req.body.password = await bcrypt.hash(req.body.password, salt)
                
                const pool = await poolPromise
                const result = await pool.request()
                .input('Name', sql.VarChar, req.body.username)
                .input('Password', sql.VarChar , req.body.password)
                .input('LoginEmail', sql.VarChar, req.body.email)
                .input('Email', sql.VarChar, req.body.email)
                .query(queries.addUser)
                //console.log("addUser result: ", result.recordset[0].Id);
                
                //res.json(result.recordset[0].UserID)
                var newUser = result.recordset[0];

                if (newUser) {
                  const token = jwt.sign({
                    name: req.body.username,
                    id: newUser.Id,
                  }, "anystring", {expiresIn: 3600})
                  // res.status(200).json({token})
                  return res.status(200).send({"token" : token, "name": req.body.username, "email": req.body.email});
                } else {
                  //res.send('Failed to create user!')
                  return res.status(400).send({error: 'Failed to create user!'});
                }
              } else {
                //res.send('Email already Exist!')
                return res.status(400).send({error: 'Email already Exist!'});
              }
        } else {
          res.status(400).send('Please fill all the details!')
        }
      } catch (error) {
        //console.log("in error")
        res.status(500)
        res.send(error.message)
      }
    }

    async updateUser(req, res){
      try {
        //console.log("updateUser: ", req.body);
        if(req.body.Id != null && req.body.Name != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('Id',sql.SmallInt , req.body.Id)
          .input('Name',sql.VarChar , req.body.Name)
          .input('LoginEmail',sql.VarChar , req.body.LoginEmail)
          .input('Email',sql.VarChar , req.body.Email)
          .input('Password',sql.VarChar , req.body.Password)
          .query(queries.updateUser)
          //console.log("updateUser result: ", req.body.Id);
          res.status(200).json({Id: req.body.Id})
        } else {
          res.status(400).send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async deleteUser(req , res){
      try {
          //console.log(req);
        if(req.params.Id != null) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Id',sql.SmallInt , req.params.Id)
            .query(queries.deleteUser)
            //console.log("deleteUser result: ", req.params.Id);
            res.status(200).json({Id: req.params.Id})
          } else {
            res.status(400).send('Please fill all the details!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new UserController()
module.exports = controller;