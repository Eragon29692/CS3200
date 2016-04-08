var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var mysql = require('mysql');
var connectionString = 'mysql://root:D@ndelion26@localhost/musicDB';
//var connection = mysql.createConnection('mysql://root:Dandelion26@localhost/musicDB');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'));
app.use(cookieParser())
app.use(session({
    secret: 'meanstackisthebest',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


if (process.env.OPENSHIFT_MYSQL_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MYSQL_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MYSQL_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MYSQL_DB_HOST + ':' +
        process.env.OPENSHIFT_MYSQL_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var mysqlConnect = mysql.createConnection(connectionString);

mysqlConnect.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + mysqlConnect.threadId);
});

app.get('/hello', function (req, res) {
    res.send('hello world');
});
app.get('/', function (req, res) {
    res.redirect('/public');
});

require('./public/project/server/app.js')(app, mysqlConnect);
app.listen(port, ipaddress);

