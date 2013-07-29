/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 7/25/13
 * Time: 1:28 PM
 * To change this template use File | Settings | File Templates.
 */
var mongodb = require('./db');
function File(file) {
	this.name = file.name;
	this.addr = file.addr;
	this.depart = file.depart;
	this.id = file.id;
	this.cat = file.cat;
	this.pName = file.pName;
	this.desc = file.desc;
	this.year = file.year;
	this.term = file.term;
	this.eNo = file.eNo;
}

module.exports = File;
File.prototype.save = function save(callback) {
	var file = {
		name: this.name,
		addr: this.addr,
		depart: this.depart,
		id: this.id,
		cat: this.cat,
		pName: this.pName,
		desc: this.desc,
		year: this.year,
		term: this.term,
		eNo: this.eNo
	}
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('files', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.ensureIndex('name', {unique: true});
			collection.insert(file, {safe: true}, function (err, file) {
				mongodb.close();
				callback(err, file);
			});
		});
	});
};

File.get = function get(filename, callback) {
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('files', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne({name:filename}, function (err, doc) {
				mongodb.close();
				if (doc) {
					var file = new File(doc);
					callback(err, file);
				} else {
					callback(err, null);
				}
			});
		});
	});
};

File.search = function search(file, callback){
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('files', function (err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.find({depart: "CSSE" }, function (err, doc) {
				mongodb.close();
				if (doc) {
					var file = new File(doc);
					callback(err, file);
				} else {
					callback(err, null);
				}
			});
		});
	});
}