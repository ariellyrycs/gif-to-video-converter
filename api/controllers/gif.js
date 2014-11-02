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
    exec = require("child_process").exec,
    pathDest =  __dirname + '/../uploads/';
var convert = function (file) {
    var explode = 'convert ' + file + ' '+  pathDest + 'tmp/tmp_%05d.jpg',
        convertToVideo = 'ffmpeg -f image2 -i ' + pathDest + 'tmp/tmp_%05d.jpg  -vf "crop=in_w-1:in_h" -vcodec libx264 ' + pathDest + 'a.mp4';
    exec(explode, function () {
        setTimeout(function () {
            exec(convertToVideo);
        }, 2000);
    });
};
var downloadGIF = function(file_url) {
    var options = {
        host: url.parse(file_url).host,
        port: 80,
        path: url.parse(file_url).pathname
    };
    var file = fs.createWriteStream(__dirname + '/../uploads/' + idFile() + '.gif');
    http.get(options, function(res) {
        res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            convert(file, __dirname + '/../uploads/');
        });
    });
    },
    uploadFile = function (file) {
        fs.readFile(file, function (err, data) {
            var newPath = __dirname + "/../uploads/" + idFile() + ".gif";
            fs.writeFile(newPath, data, function (err) {
                convert(newPath);
            });
        });
    };


module.exports = {
    uploadGif: function(req, res) {
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var resp = {};
            //downloadGIF(fields.url[0]);
            if(files.img[0].headers['content-type'] !== 'image/gif') {
                resp.status = 'error';
            } else {
                resp.status = 'success';

                uploadFile(files.img[0].path);
            }
            res.end(util.inspect(resp));
        });
    },
    getVideo: function () {

    }
};