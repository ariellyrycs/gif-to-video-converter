/**
 * Created by arobles on 10/29/14.
 */
'use strict';
var formidable = require('formidable'),
    form = new formidable.IncomingForm();
module.exports = {
    uploadGif: function(req, res) {
        form.parse(req, function(err, fields, files) {
            console.log(fields);
            console.log(files);
        });
    },
    getVideo: function () {

    }
};