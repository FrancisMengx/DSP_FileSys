/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 7/31/13
 * Time: 2:53 PM
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs');
exports.getViewPage = function(req,res){
	res.render('viewFile',{title: 'View File', file: req.params.fileName});
};

exports.getPdfFile = function(req,res){
	fs.readFile(__dirname+"/../files/"+req.params.fileName, function(err, data){
		res.contentType('application/pdf');
		res.send(data);
	});
}
