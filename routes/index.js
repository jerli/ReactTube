var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
	res.render('index', {title: 'Video'})
})
//<<<<<<< HEAD
/* GET Hello World page. 
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

 GET Userlist page. 
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

 GET New User page. 
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});
*/
router.get('/watch', function(req, res){
    res.render('watch', { link: req.query.v });
});

/* POST to Add User Service 
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

=======
>>>>>>> facaf36ab61f094dd8f6489699f8b005af5f73e2

*/
module.exports = router;
