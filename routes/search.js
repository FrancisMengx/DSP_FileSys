var File = require('../models/File');
exports.getSearchPage = function(req,res){
	res.render('search', {title: "Search"});
};
exports.postSearchBody = function(req, res){


	File.search(req.body,function(err,file){
		if(err){
			return res.send({message:'internalerr'});
		}else if(!file){
			return res.send({message:'noFile'});
		}
		res.send({message:'success', body:JSON.stringify(file)});

	});

}
