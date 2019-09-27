'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var requestify = require('requestify');
var moment = require('moment');

var PORT = process.env.PORT || 3001;
var BASE_URL = 'https://books.zoho.com/api/v3/contacts?organization_id=649249007';
var API_OPTIONS = {
  headers: { 'content-type': 'application/json' },
  auth: {
    'Zoho-oauthtoken': "db36e02a50b57e081efe533a8a0f834b"
  },
};
var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/contacts', function(req, res) {
  var URL = BASE_URL;

  requestify
    .get(URL)
    .then(function(fbres) {
      res.json(fbres);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log('zoho proxy listening on port %s.', PORT);
});