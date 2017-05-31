var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var conn = {
	host: 'localhost',
	port: 5432,
	database: 'tv_show_db',
	user: '',
	password: ''
};

var db = pgp(conn);

exports.db = db;