/**
 * Created by arobles on 10/29/14.
 */
'use strict';
var multiparty = require('multiparty'),
    idFile = require(__dirname + '/id-file.js'),
    util = require('util'),
    fs = require('fs'),
    http = require('http'),
    url = require('url'),
    $ = require('q'),
    exec = require("child_process").exec,
    uploadsPath =  __dirname + '/../uploads/',
    mediaPath = __dirname + '/../../webapp/media/',
    fileName,
    gifUploaded;
var convert = function () {
    var tmpPath = uploadsPath + 'tmp/' + fileName + '/tmp_%05d.jpg',
        explode = 'convert ' + gifUploaded + ' ' + tmpPath,
        convertToVideo = 'ffmpeg -f image2 -i ' + tmpPath + ' -vf "crop=in_w-1:in_h" -vcodec libx264 ' + mediaPath + fileName + '.mp4',
        tmpExistence = uploadsPath + 'tmp/' + fileName + '/tmp_00000.jpg',
        urlVideo = './media/' + fileName + '.mp4',
        detectTmp,
        deferred = $.defer();
    exec('mkdir ' + uploadsPath + '/tmp/' + fileName);
    detectTmp = function () {
        var explodeTime = setInterval(function () {
            if (fs.existsSync(tmpExistence)) {
                exec(convertToVideo);
                clearInterval(explodeTime);
                deferred.resolve(urlVideo);
            }
        }, 500);
    };
    exec(explode, detectTmp);
    return deferred.promise;
    },
    downloadAsync = function (options) {
    var deferred = $.defer(),
        file = fs.createWriteStream(gifUploaded);
    http.get(options, function(res) {
        res.on('data', function(data) {
            file.write(data);
        }).on('error',function (err) {
            deferred.reject(err);
        }).on('end', function() {
            file.end();
            deferred.resolve(gifUploaded);
        });
    });
    return deferred.promise;
    },
    downloadGIF = function(file_url) {
    var options = {
        host: url.parse(file_url).host,
        port: 80,
        path: url.parse(file_url).pathname
        },
        deferred = $.defer();
        downloadAsync(options).then(function () {
            convert().then(function (videoDest) {
                deferred.resolve(videoDest);
            });
        });
        return deferred.promise;
    },
    uploadFile = function (file) {
        var deferred = $.defer();
        fs.readFile(file, function (err, data) {
            fs.writeFile(gifUploaded, data, function (err) {
                convert().then(function (videoDest) {
                    deferred.resolve(videoDest);
                });
            });
        });
        return deferred.promise;
    };
module.exports = {
    uploadGif: function(req, res) {
        var form = new multiparty.Form();
        fileName = idFile();
        gifUploaded = __dirname + '/../uploads/' + fileName + '.gif';
        form.parse(req, function(err, fields, files) {
            var resp = {};
            downloadGIF(fields.url[0]).then(function (videoDest) {
                resp.video = videoDest;
                resp.status = 'success';
                res.end(util.inspect(resp));
            });
            if(files.img[0].headers['content-type'] !== 'image/gif') {
                resp.status = 'error';
            } else {
                uploadFile(files.img[0].path).then(function (videoDest) {
                    resp.status = 'success';
                    console.log(videoDest);
                    resp.video = videoDest;
                    res.end(util.inspect(resp));
                });
            }
        });
    }
};