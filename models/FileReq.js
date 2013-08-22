var mongodb = require('./db');
function FileReq(fileReq){
	this.userName = fileReq.userName
	this.course = fileReq.course;
	this.profName = fileReq.profName;
	this.reqBody = fileReq.reqBody;
}

module.exports = FileReq;
FileReq.prototype.save = function(callback){
	var fileReq = {
		userName: this.userName,
		course:this.course,
		profName: this.profName,
		reqBody: this.reqBody
	}
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('fileReq', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(fileReq, {safe: true}, function (err, fileReq) {
				mongodb.close();
				callback(err, fileReq);
			});
		});
	});
};

FileReq.get = function(callback){

};