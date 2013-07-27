var index, login, dologin, auth, reg, doreg, regi, logout,
	getContact, getUploadPage, uploadFile,upload, profile, getProfilePage;

auth = require('./auth');
regi = require('./reg');
upload = require('./upload');
profile = require('./profile');

exports.route = function (app) {
	app.get('/', index);
	app.get('/login', login);
	app.post('/login', dologin);
	app.get('/reg', reg);
	app.post('/reg', doreg);
	app.get('/logout', logout);
	app.get('/contact',getContact);
	app.get('/upload', getUploadPage);
	app.post('/upload', uploadFile);
	app.get('/profile', getProfilePage);
}

index = function (req, res) {
	if(!req.session.user){
		res.render('index', {title: 'Index'});
	}
	else{
		res.render('loginIndex', {title: "Home"})
	}

};

reg = function (req, res) {
	return regi.reg(req, res);
};

doreg = function (req, res) {
	return regi.doReg(req, res);
};

login = function (req, res) {
	return auth.login(req, res);
};

dologin = function (req, res) {
	return auth.doLogin(req, res);
};

logout = function (req, res) {
	return auth.logout(req, res);
};

getContact = function(req, res){
	return res.render('contact', {title: 'Contact'});
};

getUploadPage = function(req,res){
	return res.render('upload', {title:'Upload'});
};

uploadFile = function(req, res){
	return upload.uploadPost(req, res);
};

getProfilePage = function(req, res){
	return profile.getProfile(req, res);
}
