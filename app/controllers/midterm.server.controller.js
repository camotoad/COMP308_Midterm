const Survey = require('mongoose').model('Midterm');
const Login = require('mongoose').model('Login');

exports.render = function(req,res){
    //display the ejs page
    res.render('index', {
        title: 'index page'
    }); 
}

exports.render2 = function(req,res){
    //display the ejs page
    res.render('signup', {
        title: 'signup page'
    }); 
}
exports.render3 = function(req,res){
    //display the ejs page
    res.render('main', {
        title: 'Main'
    }); 
}

exports.renderAdd = function(req,res){
    //display the ejs page
    res.render('add', {
        title: 'Add a Survey'
    }); 
}


exports.login =function(req,res,next){
 // Use the 'User' static 'findOne' method to retrieve a specific user
 var us = req.body.username;
 var pw = req.body.password;
 //console.log(em)
 //finding a document by username
 Login.findOne({ username: us }, (err, login) => {
     if (err) {
         return next(err);
     } 
     if (!login)
     {
         return next("username does not exist");
     }
     else{
         Login.findOne({password:pw}, (err, login) => {
             if(err){
                 return next(err);
             }

             if (!login)
             {
                 return next("wrong password");
             }
             else{
                 
                 req.login = login;
                 //parse it to a JSON object
                 //var jsonUser = JSON.parse(JSON.stringify(student));
                 //console.log(jsonUser)
                 
                 res.render('main', {
                    title: 'Main'
                }); 
             }
         });

     }
     
 });
};

exports.signUp = function(req,res,next){
    
	const login = new Login(req.body);
    
	
	login.save((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
            //res.json(stud);
            res.render('index');
		}
	});
};

exports.create = function(req, res, next) {

	const survey = new Survey(req.body);
    
	
	survey.save((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
            //res.json(stud);
            res.render('main', {
                title: 'Main'
            }); 
		}
	});
};

exports.view = function (req, res) {
    
    Survey.find({}, (err, surveys) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('view', {
                title: 'List All Surveys',
                surveys: surveys
            });
        }
    });
};

exports.delete = function(req, res, next) {

	Survey.findOneAndRemove({
        surveyId: req.body.surveyId
    }, function (err, survey) {
        console.log(req.body.surveyId);
        if (err) throw err;

        console.log("Success");

    });
			res.render('main', { title: 'Main'}); 

};