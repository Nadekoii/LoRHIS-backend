/*
    This file is the entry point for the routes in the application.
    It contains the route for the home page of the application.
*/

/* Variables */
var express = require('express');
var router = express.Router();

/* GET home page. */
// This route renders the home page of the application.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LoRHIS' });
});

module.exports = router;
