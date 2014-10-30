/**
 * Created by arobles on 10/29/14.
 */
'use strict';
var multiparty = require('multiparty'),
    idFile = require(__dirname + '/id-file.js'),
    util = require('util'),
    fs = require('fs'),
    http = require('http');


module.exports = {
    uploadGif: function(req, res) {
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var resp = {};
            console.log('1');
            //test http://www.catgifpage.com/gifs/254.gif
            console.log(fields.url[0]);
            var request = http.get(fields.url[0], function(response) {
                console.log(response);
                if (response.statusCode === 200) {
                    var file = fs.createWriteStream(__dirname + '/jeje.gif');
                    response.pipe(file);
                }
                request.setTimeout(12000, function () {
                    request.abort();
                });
            });


            if(files.img[0].headers['content-type'] !== 'image/gif') {
                resp.status = 'error';
            } else {
                resp.status = 'success';
                console.log('2');
                fs.readFile(files.img[0].path, function (err, data) {
                    var newPath = __dirname + "/../uploads/" + idFile() + ".gif";
                    fs.writeFile(newPath, data, function (err) {
                        console.error(err);
                    });
                });
            }
            res.end(util.inspect(resp));
        });
    },
    getVideo: function () {

    }
};