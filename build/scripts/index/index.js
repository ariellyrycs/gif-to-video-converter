/**
 * Created by arobles on 10/10/14.
 */
/*globals $*/
$(function () {
    'use strict';
    var fileOnload = function(e) {
        $('#insert-image').attr('src',e.target.result);
        $('.fetch-url').removeClass('show-option');
        $('.show-image').addClass('show-option');
    };

    $('#fileupload').change(function(e) {
        var file = e.target.files[0],
            imageType = /image.gif/,
            reader = new FileReader();
        if (!file.type.match(imageType)){
            return;
        }
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
    });
    /*$('#send-gif').on('submit', function (e) {
        /*e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/',
            data: {name:'jeje'},
            success: function (e) {
                console.log(e);
            }
        });
    });*/
    $('#show-url-file').on('click', function (e) {
        e.preventDefault();
        $('.show-image').removeClass('show-option');
        $('.fetch-url').addClass('show-option');
    });
});
