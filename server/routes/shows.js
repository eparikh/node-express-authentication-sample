var db = require("../db_conn").db

var shows = {
 create: function(req, res, next) {
    db.none("insert into shows(show)" +
        "values(${show})", req.body)
        .then(function(){
          res.status(200)
            .json({
              status: 'success',
              message: 'Show created'
            })
        })
        .catch(function(err){
          return next(err);
        })
  }
};
 
module.exports = shows;