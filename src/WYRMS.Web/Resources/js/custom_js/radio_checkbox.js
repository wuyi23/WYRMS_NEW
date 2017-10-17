"use strict";

$(document).ready(function () {

    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal'
    });
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass: 'iradio_minimal-red'
    });
    //green color scheme for iCheck
    $('input[type="checkbox"].minimal-green, input[type="radio"].minimal-green').iCheck({
        checkboxClass: 'icheckbox_minimal-green',
        radioClass: 'iradio_minimal-green'
    });
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-red',
        radioClass: 'iradio_flat-red'
    });
    $('input[type="checkbox"].square-blue, input[type="radio"].square-blue').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });

    $('input.test1').prettyCheckable({});
    $('input.TestDisabled').prettyCheckable({});
    $('input.test2').prettyCheckable({});
    $('input.test3').prettyCheckable({});
    $('input.test4').prettyCheckable({});

    $(".to-labelauty").labelauty({minimum_width: "155px"});
    $(".to-labelauty-icon").labelauty({label: false});


});
function changeState(el) {
    if (el.readOnly) el.checked = el.readOnly = false;
    else if (!el.checked) el.readOnly = el.indeterminate = true;
}