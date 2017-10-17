"use strict";
var c = window.location.href.match(/c=inline/i) ? 'inline' : 'popup';
$.fn.editable.defaults.mode = c === 'inline' ? 'inline' : 'popup';

$(function () {
    $('#f').val(f);
    $('#c').val(c);
});
var f = 'bootstrap3';
$('input[type="checkbox"].custom-checkbox, input[type="radio"].custom-radio').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass: 'iradio_minimal-blue',
    increaseArea: '20%'
});
$('#dob,#event').editable({
    combodate: {
        minYear: 1980,
        maxYear: 2020
    }
});
