var bcrypt = require("bcrypt");
var db = require("../db_conn").db
var jwt = require('jwt-simple');
 
var auth = {
 
  login: function(req, res, next) { 
    var username = req.body.username || '';
    var password = req.body.password || '';
 
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    auth.validate(username, password)
      .then(function(result){
        if(result){
          res.json(genToken(result));
        } else{
          res.status(401);
          res.json({
            "status": 401,
            "message": "Invalid credentials"
          });
        }
      }); 
  },
 
  validate: function(username, password) {

    return db.one("select first_name, last_name, username, role, password from users where username = $1", username)
      .then(function(data){
        if(bcrypt.compareSync(password, data.password)){
          return {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            role: data.role
          };
        } else {
          return false;
        }
      })
      .catch(function(err){
        return false;
      })
  },
 
  validateUser: function(username) {
    return db.one("select first_name, last_name, username, role from users where username = $1", username)
      .then(function(data){
        return {
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          role: data.role
        };
      })
      .catch(function(err){
        return false;
      })
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires,
    user: user
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;