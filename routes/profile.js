/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 7/26/13
 * Time: 3:46 PM
 * To change this template use File | Settings | File Templates.
 */
exports.getProfile = function(req, res){
	res.render('profile', {title: 'Profile'});
}