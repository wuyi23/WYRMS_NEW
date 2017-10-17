"use strict";

$(document).ready(function () {

    $('#datetimepicker').datetimepicker({
        lang: 'en',
        contentWindow: 'window'
    });
    $.datetimepicker.setLocale('en');
    $('#datetimepicker1').datetimepicker({
        i18n: {
            de: {
                months: [
                    'Januar', 'Februar', 'März', 'April',
                    'Mai', 'Juni', 'Juli', 'August',
                    'September', 'Oktober', 'November', 'Dezember'
                ],
                dayOfWeek: [
                    "So.", "Mo", "Di", "Mi",
                    "Do", "Fr", "Sa."
                ]
            }
        },
        timepicker: false,
        format: 'd.m.Y'
    });
    $('#datetimepicker2').datetimepicker({
        datepicker: false,
        lang: 'en',
        format: 'H:i'
    });
    $('#datetimepicker_unixtime').datetimepicker({
        format: 'unixtime'
    });
    $('#datetimepicker7').datetimepicker({
        lang: 'en',
        format: 'Y/m/d',
        minDate: '-1970/01/02', //yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '+1970/01/02', //tomorrow is maximum date calendar
        timepicker: false
    });
    $('#datetimepicker8').datetimepicker({
        onGenerate: function (ct) {
            $(this).find('.xdsoft_date')
                .toggleClass('xdsoft_disabled');
        },
        format: 'Y/m/d',
        minDate: '-1970/01/2',
        maxDate: '+1970/01/2',
        lang: 'en',
        timepicker: false
    });
    jQuery(function () {
        $('#check_in_date').datetimepicker({
            format: 'Y/m/d',
            onShow: function (ct) {
                this.setOptions({
                    maxDate: $('#check_out_date').val() ? $('#check_out_date').val() : false
                })
            },
            timepicker: false
        });
        $('#check_out_date').datetimepicker({
            format: 'Y/m/d',
            onShow: function (ct) {
                this.setOptions({
                    minDate: $('#check_in_date').val() ? $('#check_in_date').val() : false
                })
            },
            timepicker: false
        });
    });
    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };
    var dat = new Date();
    $('#my-element').datepicker();
    $('#my-element1').datepicker({multipleDates: true});
    $('#monthpicker').datepicker();
    $('#minMaxExample').datepicker({
        language: 'en',
        minDate: new Date(),
        maxDate: dat.addDays(6)
    });
    $('#timepick').datepicker();
    $('#dateranges').datepicker();
    var disabledDays = [0, 6];

    $('#disabled-days').datepicker({
        language: 'en',
        onRenderCell: function (date, cellType) {
            if (cellType == 'day') {
                var day = date.getDay(),
                    isDisabled = disabledDays.indexOf(day) != -1;

                return {
                    disabled: isDisabled
                }
            }
        }
    });
    $('#datetimepicker12').datetimepicker({
        language: 'en'
    });
});