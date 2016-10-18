/* app.js
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Set up view engine
app.set('view engine', 'jade');

// Set up public directory
app.use(express.static('public'));

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set up routes
app.use(require('./routes'));

// Start server
app.listen(3000, function(){
  console.log('just.running on port 3000');
});
