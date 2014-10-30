/**
 * Created by arobles on 10/28/14.
 */
'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    responder = require('./http-responder'),
    fs = require('fs'),
    app = express(),
    jsFiles;
//utilities
app.set('port', process.env.PORT || 3000);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001');
    next();
});
//routes
jsFiles = new RegExp(".(js)$", "i");
fs.readdirSync(__dirname + '/routes').forEach(function (fileName) {
    if(jsFiles.test(fileName)) {
        require(__dirname + '/routes/' + fileName)(app);
    }
});
//connections
mongoose.connect('mongodb://localhost/pets', function(err) {
    if(err) {
        console.log('error connecting to MongoDB Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});
app.listen(app.get('port'), function () {
    console.log('listening on port 3000');
});