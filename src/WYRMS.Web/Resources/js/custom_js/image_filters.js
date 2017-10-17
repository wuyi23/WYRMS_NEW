"use strict";

$(document).ready(function () {

    $("[data-filter1]").on('click', function () {
        $("[data-filter1]").removeClass('active_filter');
        $(this).addClass('active_filter');
        $("#imgfigure1").removeClass().addClass($(this).attr('data-filter1'));
    });

    $("[data-filter2]").on('click', function () {
        $("[data-filter2]").removeClass('active_filter');
        $(this).addClass('active_filter');
        $("#imgfigure2").removeClass().addClass($(this).attr('data-filter2'));
    });

    $("[data-filter3]").on('click', function () {
        $("[data-filter3]").removeClass('active_filter');
        $(this).addClass('active_filter');
        $("#imgfigure3").removeClass().addClass($(this).attr('data-filter3'));
    });

    $('.dropify').dropify();
    $("[data-max-file-size]").dropify({
        error: {
            'fileSize': 'The file size is too big ({{ value }}B max).'
        }
    });

//        dynamic img change of all filters on uploading image

    $('#filter-1').on('change', function () {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        $('.temp_path1').attr('src', tmppath);
    });
    $('#filter-2').on('change', function () {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        $('.temp_path2').attr('src', tmppath);
    });
    $('#filter-3').on('change', function () {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        $('.temp_path3').attr('src', tmppath);
    });

});