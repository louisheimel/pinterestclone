'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main', partialsDir: __dirname + '/app/views/partials', layoutsDir: __dirname + '/app/views/layouts'}));
app.set('view engine', 'express-handlebars');
app.set('views','app/views');

require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
