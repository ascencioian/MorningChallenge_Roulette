// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');  /* express depenency */
var app      = express();  /* express depenency */
var port     = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient   /* mongo dependency */
var mongoose = require('mongoose');  /* mongoose dependency */
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {   /* configDB.url is the url, syntax */
  if (err) return console.log(err) //checks if connection to database has failed
  db = database
  require('./app/routes.js')(app, passport, db); //grabbed from app/routes. you are calling the function here
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2021b', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);  /* starts the server on port 8080 */
console.log('The magic happens on port ' + port);  /* checks if connection to database has succeeded */
