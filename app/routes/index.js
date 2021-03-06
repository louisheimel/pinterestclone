'use strict';

var path = process.cwd();
var User = require('../models/users'),
	Pic = require('../models/pics'),
	mongoose = require('mongoose');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/auth/twitter/callback');
		}
	}
	
	app.route('/')
		.get(function (req, res) {
			if (req.isAuthenticated()) {
				res.render(path + '/app/views/all.handlebars', {loggedin: true});
			} else {
				res.render(path + '/app/views/all.handlebars', {loggedin: false});
			}
		});
		
	app.route('/user/:id')
		.get(function(req, res) {
			if (req.isAuthenticated()) {
				res.render(path + '/app/views/userpics.handlebars', {loggedin: true, id: req.params.id});
			} else {
				res.render(path + '/app/views/userpics.handlebars', {loggedin: false, id: req.params.id});
			}
		});
	app.route('/userpics/:id')
		.get(function(req, res) {
			Pic.find({_creator: req.params.id}, function(err, pics) {
				res.json(pics);
			})
		})
		
	app.route('/remove/:id')
		.get(function(req, res) {
			Pic.findOneAndRemove(req.params.id)
			.then(function() {
				console.log('pic removed!')
				console.log(req.params.id)
				res.redirect('/my_pics');
			})
		})
		
	app.route('/all_pics')
		.get(function(req, res, next){
			Pic.find({}).then(function(pics) {
				res.json(pics);
			})
		})
		
	app.route('/get_my_pics')
		.get(isLoggedIn, function(req, res, next) {
			Pic.find({}).then(function(pics) {
				res.json({pics: pics, id: req.user._id});
			})
			
		})
	
	app.route('/my_pics')
		.get(isLoggedIn, function(req, res, next) {
			res.render(path + '/app/views/mypics.handlebars', {loggedin: true});
		});
		
	app.route('/submit_pic')
		.post(isLoggedIn, urlencodedParser, function(req, res, next) {
			User.findOne({_id: req.user._id}, function(err, user) {
				if (err) throw err;
				
				var newPic = new Pic({
										  url: req.body.url,
										  description: req.body.description,
										  _creator: user._id,
										  creator_username: user.twitter.username,
									  });
				newPic.save();
			});
			res.redirect('/')
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
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
			failureRedirect: '/',
		}));

};