var User = require('../models/user')
var crypto = require("crypto")
module.exports = {  

	
	index: function(req, res) { 
		//res.send("sssss");
		res.render('main');
	},    
	about: function(req, res) {      
		res.render('about');
   },
   loginForm: function(req, res) {      
		res.render('loginform');
   },
    logout: function(req, res) { 
      console.log(req.query.id);
      var id = req.query.id;
      User.find({username: id},function(err, user){
         console.log(user);
         User.update({username: id}, {visits:0}, function(err){  //decrease the visits number to insure that user can normally login
            if(err) return;
         })
      })
		res.render('main');
   },
    loginFormSubmit: function(req, res) {
    	var md5 = crypto.createHash('md5');			//hashed the password
		var username = req.body.username;
   		var password = req.body.password;
   		md5.update(password);
   		var passwordHashed = md5.digest('hex');		//hased the password and use it to compare with the record in the database
   		User.find({username: username},function(err, user){
   			if(err){
   				console.log("Your username is wrong!");
   			}else if(user != [] && user[0] != undefined){
               console.log(user);
               if(user[0].visits < 1 && user[0].password == passwordHashed){
                  console.log(user);
                  var loginid={loginid:username};
                  var visits = user[0].visits + 1;
                  User.update({username: username}, {visits:visits, lastAccess: Date()}, function(err){
                     if(err) return;
                  })
                  User.find({username: username}, function(err, user){
                     var lastTime = user[0].lastAccess;
                     var all = {loginid: loginid, lastTime: lastTime}
                     res.render('timer',all);
                  })
               }else{
                  res.render('loginform');
               }
            }else{
   				console.log(user);
   				res.render('loginform');
   			}
   		})
   },
   register: function (req, res) {
   		res.render('register');
   },
   registerUser: function(req, res){
   		var md5 = crypto.createHash('md5');
   		var username = req.body.username;
   		var password = req.body.password;
         var email = req.body.email;
   		md5.update(password);	
   		var passwordHashed = md5.digest('hex');		//hash the password and store it into the database
   		var user = new User({
   			username: username,
   			password: passwordHashed,
            email: email
   		})
   		user.save(function(err, user){
   			if (err) {
   				console.error(err);
   				return;
   			}else{
   				console.log(user);
   				res.redirect('/loginform')
   			}
   		})
   }
   
}; 
 console.log("sssshome");

