'use strict';

// Constants
const PORT = 8080;

const express = require('express');
const app = express();

//ALLOW ORIGIN
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Game = require('./model/Game.js');

var mongoose = require('mongoose');
//mongoose.connect('mongodb://172.17.0.1:27017');

app.use(express.static('public'));
app.use(express.static('files'));
var path = require('path');

app.get('/webMonitor/script.js', function(req, res){
    res.sendFile(path.join(__dirname, '/../webMonitor/script.js'));
});
app.get('/webMonitor', function(req, res){
    res.sendFile(path.join(__dirname, '/../webMonitor/index.html'));
});

var game = new Game();

// load controllers
require('./controllers/Index.js')(app);
require('./controllers/Mobile.js')(app, io, game);
require('./controllers/Cam.js')(app, io, game);

server.listen(PORT);
console.log('Running on http://localhost:' + PORT + '            ' + __dirname + '/../webMonitor/index.html');

io.on('connection', function(client) {
    console.log('Client connected...');
});
