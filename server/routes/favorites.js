var jwt = require('jwt-simple');
var db = require("../db_conn").db

var getUsername = function(req){
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var username = jwt.decode(token, require('../config/secret.js')()).user.username;
  return username;
};

var favorites = {
  summary: function(req, res, next) {
    db.any("select * from favorites_count")
      .then(function(data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Favorites counts retrieved'
          });
      })
      .catch(function(err) {
        return next(err);
      })
  },
  get: function(req, res, next) {
    var username = getUsername(req);
    db.any("select * from favorites where username = $1", username)
      .then(function(data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Favorites retrieved'
          });
      })
      .catch(function(err) {
        return next(err);
      })
  },
  add: function(req, res, next) {
    var username = getUsername(req);
    db.none("insert into favorites(username, show)" +
        "values($1, $2)", [username, req.body.show])
        .then(function(){
          res.status(200)
            .json({
              status: 'success',
              message: 'Favorite added'
            })
        })
        .catch(function(err){
          return next(err);
        })
  }
};
 
module.exports = favorites;