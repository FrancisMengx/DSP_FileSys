/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 8/8/13
 * Time: 3:43 PM
 * To change this template use File | Settings | File Templates.
 */
var mongodb = require('./db');
function DownloadHistory(history){
	this.fileName = history.fileName
	this.downloadDate = history.downloadDate
	this.userName = history.userName
}
module.exports = DownloadHistory;
DownloadHistory.prototype.save = function save(callback){
	var history = {
		fileName: this.fileName,
		downloadDate: this.downloadDate,
		userName: this.userName
	};
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('downloadhistory', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(history, {safe: true}, function (err, history) {
				mongodb.close();
				callback(err, history);
			});
		});
	});
};

DownloadHistory.getUserCheckout = function getUserCheckout(username, callback){
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('downloadhistory', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.find({userName: username}).toArray(function (err, docs) {
				mongodb.close();
				if (!err || docs) {
					var historyRecords = [], i = 0;
					docs.forEach(function(singleRecord){
						var record = new DownloadHistory(singleRecord);
						historyRecords[i] = record;
						i++;
					});
					callback(err, historyRecords);
				} else {
					callback(err, null);
				}
			});
		});
	});
};

DownloadHistory.getAllDownloadRecords = function getAllDownloadRecords(callback){
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('downloadhistory', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.find({},function (err, docs) {
				mongodb.close();
				if (!err || docs) {
					var historyRecords = [], i = 0;
					docs.forEach(function(singleRecord){
						var record = new DownloadHistory(singleRecord);
						historyRecords[i] = record;
						i++;
					});
					callback(err, historyRecords);
				} else {
					callback(err, null);
				}
			});
		});
	});
};