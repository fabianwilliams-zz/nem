var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fabian Williams NodeJs Express Lab' });
});

/* GET Hello World Page */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', {title: 'Hello, World!'});
});

/*GET Userlist page */
router.get('/userlist', function(req, res, next){
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

/*GET New User Page that we may enter data and later POST via button on Form*/
router.get('/newuser',function(req,res,next){
  res.render('newuser', {title: 'Add New User'});
});

/*POST to Add User that was entered on the GET page */
router.post('/adduser', function (req, res, next) {
  //Set internal DB variable
  var db = req.db; //we used this earlier in the Get User Page

  //Get the form values from the Add USer Page,
  // these require the "name" attributes in the form control
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  //Set our Collection
  var collection = db.get('usercollection');

  //Submit to the Mongodb Collection
  collection.insert({
    "username": userName,
    "email": userEmail,
  }, function(err, doc) {
    if (err) {
      // if it failed , return error
      res.send("An error occured adding to the database");
    }
    else {
      //This means it was added and we need to now load the Get User List Page
      res.redirect("userlist");
    }
  });
});

module.exports = router;
