var index, login, dologin, auth, reg, doreg, regi, logout,
	getContact, getUploadPage, uploadFile,upload, profile,
	getProfilePage, getSearchPage, sendSearchInfo,search,
	getViewPage, view, getPdfFile, downloadFile, download,
	postFileReq,getAllHistory, handleReq;

auth = require('./auth');
regi = require('./reg');
upload = require('./upload');
profile = require('./profile');
search = require('./search');
view = require('./viewFile');
download = require('./download');

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
	app.post('/profile', postFileReq);
	app.get('/search', getSearchPage);
	app.post('/search', sendSearchInfo);
	app.get('/file/:fileName', getViewPage);
	app.get('/:fileName', getPdfFile);
	app.get('/download/:fileName', downloadFile);
	app.get('/handleReq', handleReq);
};

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
};

getSearchPage = function(req, res){
	return search.getSearchPage(req, res);
};

sendSearchInfo = function(req, res){
	return search.postSearchBody(req, res);
};

getViewPage = function(req, res){
	return view.getViewPage(req, res);
};

getPdfFile = function(req, res){
	return view.getPdfFile(req,res);
};

downloadFile = function(req, res){
	return download.downloadFile(req,res);
};

postFileReq = function(req,res){
	return profile.handleFileReq(req,res);
};

handleReq = function(req, res){
	console.log('work');
	return res.render('handleFileReq', {title:'Handle Request'});
};