"use strict";

$(document).ready(function () {

    $('#datetimepicker1').datetimepicker();
    $("#departure").dateDropper({
        format: "d/m/Y",
        dropPrimaryColor: "#428bca"
    });
    $("#alarm").timeDropper({
        primaryColor: "#428bca",
        format: "hh:mm A"
    });
    $("#alarm1").timeDropper({
        primaryColor: "#428bca",
        meridians: true,
        format: "hh:mm A"
    });
    $("#alarm2").timeDropper({
        primaryColor: "#428bca",
        init_animation: 'dropdown',
        format: "hh:mm A"
    });
    $('#date-range0').dateRangePicker({
        autoClose: true,
        getValue: function () {
            $(this).val("");
        }
    });
    $('#dateclock').dateRangePicker({
        autoClose: true,
        startOfWeek: 'monday',
        separator: ' ~ ',
        format: 'YYYY-MM-DD HH:mm',
        time: {
            enabled: true
        },
        getValue: function () {
            $(this).val("");
        }
    });
    $('#date-range9').dateRangePicker({
        autoClose: true,
        setValue: function (s) {
            this.innerHTML = s;
        }
    });
    $('#date-range50').dateRangePicker({
        autoClose: true,
        customOpenAnimation: function (cb) {
            $(this).fadeIn(300, cb);
        },
        customCloseAnimation: function (cb) {
            $(this).fadeOut(400, cb);
        },
        getValue: function () {
            $(this).val("");
        }
    });
    $('#hotel-booking').dateRangePicker({
        autoClose: true,
        startDate: new Date(),
        selectForward: true,
        showDateFilter: function (time, date) {
            return '<div style="padding:0 1px;">\
                    <span style="font-weight:bold">' + date + '</span>\
                    <div style="opacity:0.3;">$' + Math.round(Math.random() * 999) + '</div>\
                </div>';
        },
        beforeShowDay: function (t) {
            var valid = !(t.getDay() == 0 || t.getDay() == 6); //disable saturday and sunday
            var _class = '';
            var _tooltip = valid ? '' : 'sold out';
            return [valid, _class, _tooltip];
        },
        getValue: function () {
            $(this).val("");
        }
    });
    $('#date-range26').dateRangePicker({
        autoClose: true,
        selectBackward: true,
        getValue: function () {
            $(this).val("");
        }
    });
    $('#date-range13-2').dateRangePicker({
        singleDate: true,
        showShortcuts: false,
        singleMonth: true,
        getValue: function () {
            $(this).val("");
        }
    });
    $('#date-range14').dateRangePicker({
        autoClose: true,
        batchMode: 'week',
        showShortcuts: false,
        getValue: function () {
            $(this).val("");
        }
    });

    // date and time dropper

    var options1 = {
        format: "Y-M-d",
        dropPrimaryColor: "#428bca"
    };
    $('#departure1').dateDropper($.extend({}, options1));

    var options2 = {
        format: "d/m/Y",
        maxYear: "2030",
        dropPrimaryColor: "#428bca"
    };
    $('#departure2').dateDropper($.extend({}, options2));

    var options3 = {
        format: "d/m/Y",
        init_animation: "dropdown",
        dropPrimaryColor: "#428bca"
    };
    $('#departure3').dateDropper($.extend({}, options3));

    // date and time dropper ends


    //Datemask dd/mm/yyyy
    $("#datemask").inputmask("dd/mm/yyyy", {
        "placeholder": "dd/mm/yyyy"
    });
    //Datemask2 mm/dd/yyyy
    $("#datemask2").inputmask("mm/dd/yyyy", {
        "placeholder": "mm/dd/yyyy"
    });
    //Money Euro
    $("[data-mask]").inputmask();

    //Date range picker
    $('#reservation').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    }).on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    }).on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });


    //Date range picker with time picker
    $("#reservationtime").daterangepicker({
        timePicker: true,
        autoUpdateInput: false,
        timePickerIncrement: 30,
        locale: {
            cancelLabel: 'Clear'
        },
        drops: "up"
    }).on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY h:mm A') + ' - ' + picker.endDate.format('MM/DD/YYYY h:mm A'));
    }).on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    //Date range as a button
    $('#reportrange').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                'Last 7 Days': [moment().subtract('days', 6), moment()],
                'Last 30 Days': [moment().subtract('days', 29), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
            },
            drops: "up"
        },
        function (start, end) {
            $('#reportrange').find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }).on('show.daterangepicker', function (ev, picker) {
        $(this).val("");
    }).on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
    }).on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

    //clock pickers and call back

    $('.clockpicker').clockpicker({
        placement: 'bottom',
        align: 'left',
        donetext: 'Done'
    });
    var input = $('.clockpicker-with-callbacks').clockpicker({
        donetext: 'Done',
        placement: "top",
        init: function () {
            console.log("colorpicker initiated");
        },
        beforeShow: function () {
            console.log("before show");
        },
        afterShow: function () {
            console.log("after show");
        },
        beforeHide: function () {
            console.log("before hide");
        },
        afterHide: function () {
            console.log("after hide");
        },
        beforeHourSelect: function () {
            console.log("before hour selected");
        },
        afterHourSelect: function () {
            console.log("after hour selected");
        },
        beforeDone: function () {
            console.log("before done");
        },
        afterDone: function () {
            console.log("after done");
        }
    });

    // Manually toggle to the minutes view
    $('#check-minutes').click(function (e) {
        // Have to stop propagation here
        e.stopPropagation();
        input.clockpicker('show')
            .clockpicker('toggleView', 'minutes');
    });

    $('input[name="datefilter"]').daterangepicker({});


});
