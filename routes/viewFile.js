/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 7/31/13
 * Time: 2:53 PM
 * To change this template use File | Settings | File Templates.
 */
exports.getViewPage = function(req,res){
	res.render('viewFile',{title: 'View File', file: req.params.fileName});
}