/**
 * Created by arobles on 10/10/14.
 */
/*globals $*/
$(function () {
    'use strict';
    $('#send-gif').on('submit', function (e) {
        e.preventDefault();
        console.dir(e.target[0].value);
    });
});
