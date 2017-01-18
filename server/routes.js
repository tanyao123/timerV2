var express=require('express'),
	router=express.Router(),
	home=require('../controllers/home');
module.exports=function(app){
	router.get('/',home.index);
	router.get('/about',home.about);
	router.get('/loginform',home.loginForm);
	router.get('/logout',home.logout);
	router.post('/loginform',home.loginFormSubmit);
	router.get('/register',home.register);
	router.post('/registerUser', home.registerUser)
	app.use(router);
};
