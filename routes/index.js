var express = require('express');
var https = require('https');
var nextPage = null;
var ready = 1;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
	res.render('watch', {title: 'Video'})
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

router.get('/watch', function(req, res){

    console.log("request1");

    var v = req.query.v;

    //getRequest(function(data){res.send(JSON.stringify(data));}, v, nextPage);

    res.render('watch', { link: v });

    //console.log(arrReacts);

});

router.get('/comments', function(req, res){

    getRequest(function(data){res.send(JSON.stringify(data));}, req.query.v, nextPage);
});

var getRequest = function(callback, vidID, pageToken) {
    
    var arrReacts = {};

    if (pageToken == null) {

        console.log("null");

        return https.get({
            host: 'www.googleapis.com',
            path: '/youtube/v3/commentThreads?part=snippet&key=AIzaSyCRz8GalG' +
            'G1HO9gdDXUGKsq-fdDE3MuRkQ&videoId=' + vidID + '&order=relevance&maxResults=100&searchTerms=youtube'

        }, function (response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function (line) {
                body += line;
            });
            response.on('end', function () {

                // recieved response
                var data = JSON.parse(body);

                var arrComments = data.items;

                for (i = 0; i < arrComments.length; i++) {

                    var commentStr = arrComments[i].snippet.topLevelComment.snippet.textDisplay;
                    var ind = commentStr.indexOf("&amp;t=");

                    console.log(commentStr);

                    if (ind != -1) {

                        var timeStart = commentStr.indexOf(">", ind) + 1; //start index of time value
                        var timeEnd = commentStr.indexOf("<", timeStart); //end index of time value

                        var timeStr = commentStr.substring(timeStart, timeEnd);

                        var commentBegin2 = commentStr.lastIndexOf(">") + 1;

                        var commentBegin1 = commentStr.indexOf("<");

                        if (arrReacts.hasOwnProperty(timeStr)) {
                            arrReacts[timeStr].push(commentStr.substring(0, commentBegin1) + "-" + commentStr.substring(commentBegin2));
                        }
                        else {
                            arrReacts[timeStr] = [commentStr.substring(0, commentBegin1) + "-" + commentStr.substring(commentBegin2)];
                        }

                        //console.log(arrReacts)
                        //console.log(data);


                    }

                }


    console.log(arrReacts);

    callback({
        reacts:arrReacts
    });


            });

        });

    }
    else {

        return https.get({
            host: "www.googleapis.com",
            path: "/youtube/v3/commentThreads?part=snippet&key=AIzaSyCRz8GalG" +
            "G1HO9gdDXUGKsq-fdDE3MuRkQ&videoId=" + vidID + "&pageToken=" + pageToken + "&order=relevance&maxResults=100&searchTerms=youtube"
        }, function (response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function (line) {
                body += line;
            });
            response.on('end', function () {

                // recieved response
                var data = JSON.parse(body);


                var arrComments = data.items;

                for (i = 0; i < arrComments.length; i++) {

                    var commentStr = arrComments[i].snippet.topLevelComment.snippet.textDisplay;
                    var ind = commentStr.indexOf("&amp;t=");

                    //console.log(commentStr);

                    if (ind != -1) {

                        var timeStart = commentStr.indexOf(">", ind) + 1; //start index of time value
                        var timeEnd = commentStr.indexOf("<", timeStart); //end index of time value

                        var timeStr = commentStr.substring(timeStart, timeEnd);

                        var commentBegin2 = commentStr.lastIndexOf(">") + 1;

                        var commentBegin1 = commentStr.indexOf("<");

                        if (arrReacts.hasOwnProperty(timeStr)) {
                            arrReacts[timeStr].push(commentStr.substring(0, commentBegin1) + "-" + commentStr.substring(commentBegin2));
                        }
                        else {
                            arrReacts[timeStr] = [commentStr.substring(0, commentBegin1) + "-" + commentStr.substring(commentBegin2)];
                        }

                        //console.log(arrReacts)

                        callback({
                            nextpage: data.nextPageToken,
                            comments: data.items,
                            id: vidID
                        });

                    }
                    console.log(arrReacts);
                }


            });

        });

    }

}

module.exports = router;
