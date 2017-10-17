"use strict";

$(document).ready(function () {
    $('.dropify').dropify();
    $("[data-max-file-size]").dropify({
        error: {
            'fileSize': 'The file size is too big ({{ value }}B max).'
        }
    });
});