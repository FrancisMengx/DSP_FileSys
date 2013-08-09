/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 7/26/13
 * Time: 3:46 PM
 * To change this template use File | Settings | File Templates.
 */
var DownloadHistory = require('../models/DownloadHistory');

exports.getProfile = function(req, res){
	if(req.session.user){
		DownloadHistory.getUserCheckout(req.session.user.name,function(err, records){
			res.render('profile', {title: 'Profile',records:records});
		});
	}else{
		res.render('profile',{title:'Profile'});
	}



}