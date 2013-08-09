/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 8/8/13
 * Time: 4:59 PM
 * To change this template use File | Settings | File Templates.
 */
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var DownloadHistory = require('../models/DownloadHistory')


exports.downloadFile = function(req,res){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
	var thisDate = mm+'/'+dd+'/'+yyyy;
	console.log(thisDate);
	var record = new DownloadHistory({
		fileName:req.params.fileName,
		downloadDate: mm+'/'+dd+'/'+yyyy,
		userName:req.session.user.name
	});
	record.save(function(err){
		if(err){
			req.flash('error', err);
		}
		req.flash('success', 'Download success');

	});
	var file = __dirname + '/../files/'+req.params.fileName;

	var filename = path.basename(file);
	var mimetype = mime.lookup(file);

	res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	res.setHeader('Content-type', mimetype);

	var filestream = fs.createReadStream(file);
	filestream.pipe(res);

};
