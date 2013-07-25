/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 7/24/13
 * Time: 4:17 PM
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs');
var File = require('../models/File');


exports.uploadPost = function (req, res) {
	saveFileLocal(req, res);
	storeFileDB(req, res);
	res.redirect('/');
}

var saveFileLocal = function (req, res) {
	fs.readFile(req.files.file.path, function(err,data){
		var newPath = __dirname+'/../files/'+req.files.file.name;
		fs.writeFile(newPath, data, function(err){
			if(!err){
				req.flash('Upload success');
			}
		})
	});
}

var storeFileDB = function (req, res) {
	var newFile = new File({
		name: req.files.file.name,
		addr: __dirname+'/../files/'+req.files.file.name,
		depart: req.body['depart'],
		id: req.body['courseId'],
		cat: req.body['category'],
		pName: req.body['profName'],
		desc: req.body['fDescription'],
		year: req.body['year'],
		term: req.body['term'],
		eNo: req.body['eNumber']
	});
	File.get(newFile.name,function(err, file){
		if(file){
			err = 'File name has been taken, change the file name and upload again';
		}
		if(err){
			req.flash('error', err);
			return res.redirect('/upload');
		}
		newFile.save(function(err){
			if(err){
				req.flash('error', err);
				return res.redirect('/upload');
			}
		});
	});
}