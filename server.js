var express = require('express');
//var session = require('express-session');
//var passport      = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.use(express.session({ secret: process.env.PASSPORT_SECRET }));

//app.use(cookieParser())
//app.use(passport.initialize());
//app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.get('/hello', function(req, res){
    res.send('hello world');
});
app.get('/', function(req, res){
    res.redirect('/public');
});

require('./public/project/server/app.js')(app);

app.listen(port, ipaddress);

