'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/auth/twitter/callback');
		}
	}
	
	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			if (req.isAuthenticated()) {
				res.render('../views/all', {loggedin: true});
			} else {
				res.render('../views/all', {loggedin: false});
			}
		});

	app.route('/login')
		.get(isLoggedIn, function (req, res) {
			res.redirect('/auth/twitter/callback');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

};
