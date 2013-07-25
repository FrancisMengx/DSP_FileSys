/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 7/23/13
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 */
var User, crypto;
crypto = require('crypto');
User = require('../models/User');

exports.login = function(req, res){
	res.render('login.jade', {title: 'User Login'});
};

exports.doLogin = function(req, res) {
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	User.get(req.body.username, function (err, user) {
		if (!user) {
			req.flash('error', 'User does not exist');
			return res.redirect('/login');

		}
		if (user.password != password) {
			req.flash('error', 'Wrong Password');
			return res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success', 'Login Success');

		res.redirect('/');
	});
};

exports.logout = function(req, res){
	req.session.user = null;
	req.flash('success', 'Logout Success');
	res.redirect('/');
};