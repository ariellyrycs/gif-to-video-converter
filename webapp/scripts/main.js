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
    $('#send-gif').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: 'http://localhost:3000/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                console.log(returndata);
            }
        });
        return false;
    });
    $('#show-url-file').on('click', function (e) {
        e.preventDefault();
        $('.show-image').removeClass('show-option');
        $('.fetch-url').addClass('show-option');
    });
});
