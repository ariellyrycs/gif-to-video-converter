/**
 * Created by arobles on 10/29/14.
 */
'use strict';
module.exports = {
    setup: function (res) {
        return function (err, response) {
            if(err) {
                res.json(err);
            } else {
                res.json(response);
            }
        };
    }
};