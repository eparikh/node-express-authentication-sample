var bcrypt = require("bcrypt");
var db = require("../db_conn").db;

var users = {
 
  get: function(req, res, next) {
    db.any("select username, role, first_name, last_name, timestamp from users")
      .then(function(data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Users retrieved'
          });
      })
      .catch(function(err) {
        return next(err);
      })
  },
  create: function(req, res, next) {
    bcrypt.hash(req.body.password, 14, function(err, hash){
      req.body.password = hash;

      db.none("insert into users(username, role, first_name, last_name, password)" +
        "values(${username}, ${role}, ${first_name}, ${last_name}, ${password})", req.body)
        .then(function(){
          res.status(200)
            .json({
              status: 'success',
              message: 'User created'
            })
        })
        .catch(function(err){
          return next(err);
        })
    });
  }
};
 

module.exports = users;