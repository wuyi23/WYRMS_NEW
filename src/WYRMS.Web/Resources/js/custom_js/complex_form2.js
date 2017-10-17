"use strict";

$(document).ready(function() {

//complex forms
    $(".content").find('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });

    $("#country").select2({
        theme: "bootstrap"
    });
    $('#dob_appl1').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false,
        maxDate: 'now'
    });
    $('#dob_appl2').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false,
        maxDate: 'now'
    });
    $('#dob_appl3').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false,
        maxDate: 'now'
    });
    $('#dateofaccount').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false,
        maxDate: 'now'
    });
    $('#dateofincorp').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false,
        maxDate: 'now'
    });

    $(function () {
        $('#dated').datetimepicker({
            format: 'DD/MM/YYYY'
        }).on("dp.change", function (e) {
            $('#drawn').data("DateTimePicker").minDate(e.date);
        });

        $('#drawn').datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false
        }).on("dp.change", function (e) {
            $('#dated').data("DateTimePicker").maxDate(e.date);
        });
    });

    $("#select_country").select2({
        theme: "bootstrap"
    });
});
