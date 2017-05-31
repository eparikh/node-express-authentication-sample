var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js');
var favorites = require('./favorites.js');
var users = require('./users.js');
var shows = require('./shows.js');

var api_v1 = "/api/v1";
 
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.get('/summary', favorites.summary);
 
/*
 * Routes that can be accessed only by autheticated users
 */
router.get(api_v1 + '/favorites', favorites.get);
router.post(api_v1 + '/favorites', favorites.add);
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get(api_v1 + '/admin/users', users.get);
router.post(api_v1 + '/admin/users/', users.create);
router.post(api_v1 + '/admin/shows/', shows.create);
 
module.exports = router;