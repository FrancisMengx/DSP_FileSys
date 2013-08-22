/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 7/26/13
 * Time: 3:46 PM
 * To change this template use File | Settings | File Templates.
 */
var DownloadHistory = require('../models/DownloadHistory');
var FileReq = require('../models/FileReq');

exports.getProfile = function(req, res){
	if(req.session.user){
		DownloadHistory.getUserCheckout(req.session.user.name,function(err, records){
			res.render('profile', {title: 'Profile',records:records});
		});
	}else{
		res.render('profile',{title:'Profile'});
	}
};

exports.handleFileReq = function(req,res){
	if(req.session.user){
		var fileReq = new FileReq({
			userName:req.session.user.userName,
			course : req.body.courseName,
			profName : req.body.profName,
			reqBody : req.body.reqBody
		});
		fileReq.save(function(err){
			if(err){
				req.flash('error', err);
			}
			req.flash('success', 'Request succeed');
			res.send({success:'success'})

		});
	}
};