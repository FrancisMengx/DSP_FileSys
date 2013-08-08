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


exports.downloadFile = function(req,res){
	var file = __dirname + '/../files/'+req.params.fileName;

	var filename = path.basename(file);
	var mimetype = mime.lookup(file);

	res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	res.setHeader('Content-type', mimetype);

	var filestream = fs.createReadStream(file);
	filestream.pipe(res);
};
