/* src/routes.js
*/
const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const now = require('moment');

// Get mongodb connection
const connect = MongoClient.connect('mongodb://localhost:27017/justrun');

// Index route
router.route('/')
// On get, render the page (duh)
.get(function(req, res){
  res.render('index', {submitted: false});
})

// On post, do some database stuff
.post(function(req, res){
  // Pull out number
  var mobile_number = req.body.mobile_number.replace(/[^\d]/g, '');

  // Connect to database
  connect.then(function(db){
    // Get user collection and check if number exists already
    const users = db.collection('users');
    users.findOne({mobile_number: mobile_number}, function(err, doc){
      if(doc === null){
        // User does not exist
        var now_string = now().format('YYYY-MM-DD HH:mm:ss');
        users.insert({
          active: true,
          new_user: true,

          name: null,
          mobile_number: mobile_number,
          reset_since: true,
          reset_date: now_string,
          join_date: now_string,

          runs: []
        });
      }else{
        // User exists
        users.updateOne({mobile_number: mobile_number}, {$set: {
          reset_since: true,
          reset_date: now().format('YYYY-MM-DD HH:mm:ss'),
        }});
      }
    });
  });
  // Render
  res.render('index', {submitted: true});
});

module.exports = router;
