var File = require('../models/File');
exports.getSearchPage = function(req,res){
	res.render('search', {title: "Search"});
};
exports.postSearchBody = function(req, res){
	var query = {};
	if(req.body['depart']){
		query.depart = req.body['depart'];
	}
	if(req.body['id']){
		query.id = req.body['id'].toLowerCase();
	}
	if(req.body['cat']){
		query.cat = req.body['cat'];
	}
	if(req.body['pName']){
		query.pName = req.body['pName'];
	}
	if(req.body['year']){
		query.year = req.body['year']
	}
	if(req.body['term']){
		query.term = req.body['term'];
	}
	if(req.body['eNo']){
		query.eNo = req.body['eNo']
	}
	File.search(query,function(err,file){
		if(err){
			return res.send({message:'internalerr'});
		}else if(!file){
			return res.send({message:'noFile'});
		}
		res.send({message:'success',body:file});
	});
}