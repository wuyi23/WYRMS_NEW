"use strict";

$(document).ready(function () {

    $('#t1').clockface();

    $('#t3').clockface({
        format: 'H:mm'
    }).clockface('show', '14:30');

    $('#t2').clockface({
        format: 'HH:mm',
        trigger: 'manual'
    });

    $('#toggle-btn').on('click', function (e) {
        e.stopPropagation();
        $('#t2').clockface('toggle');
    });

    <!--panel js-->

    //Colorpicker
    $(".my-colorpicker1").colorpicker();

    $(".my-colorpicker2").colorpicker(
        {
            format: 'rgba'
        }
    );

    $(".my-colorpicker3").colorpicker();
    // clock picker

    var input = $('#input-a');
    input.clockpicker({
        autoclose: true
    });

    // Manual operations
    $('#button-a').on('click', function (e) {
        // Have to stop propagation here
        e.stopPropagation();
        input.clockpicker('show')
            .clockpicker('toggleView', 'minutes');
    });
    $('#button-b').on('click', function (e) {
        // Have to stop propagation here
        e.stopPropagation();
        input.clockpicker('show')
            .clockpicker('toggleView', 'hours');
    });


//datetimepicker


    $("#datetime1").datetimepicker().parent().css("position :relative");
    $("#datetime2").datetimepicker({
        format: 'LT'
    }).parent().css("position :relative");
    $("#datetime3").datetimepicker({
        viewMode: 'years'
    }).parent().css("position :relative");
    $("#datetime4").datetimepicker({
        viewMode: 'years',
        format: 'MM/YYYY'
    }).parent().css("position :relative");
    $("#datetime5").datetimepicker({
        inline: true,
        sideBySide: false
    });
//dtetime picker end
    $("input[name='demo1']").TouchSpin({
        min: 0,
        max: 100,
        step: 0.1,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        postfix: '%'
    });

    $("input[name='demo2']").TouchSpin({
        min: -1000000000,
        max: 1000000000,
        stepinterval: 50,
        maxboostedstep: 10000000,
        prefix: '$'
    });

    $("input[name='demo_vertical']").TouchSpin({
        verticalbuttons: true
    });

    $("input[name='demo_vertical2']").TouchSpin({
        verticalbuttons: true,
        verticalupclass: 'glyphicon glyphicon-plus',
        verticaldownclass: 'glyphicon glyphicon-minus'
    });

    $("input[name='demo3']").TouchSpin();

    $("input[name='demo3_21']").TouchSpin({
        initval: 40
    });

    $("input[name='demo3_22']").TouchSpin({
        initval: 40
    });

    $("input[name='demo4']").TouchSpin({
        postfix: "a button",
        postfix_extraclass: "btn btn-default"
    });

    $("input[name='demo4_2']").TouchSpin({
        postfix: "a button",
        postfix_extraclass: "btn btn-default"
    });

    $("input[name='demo5']").TouchSpin({
        prefix: "pre",
        postfix: "post"
    });

    $("input[name='demo6']").TouchSpin({
        buttondown_class: "btn btn-link",
        buttonup_class: "btn btn-link"
    });


    $('.multiselect').multiselect({
        numberDisplayed: 2
    });
    $('#example2').multiselect({
        numberDisplayed: 2
    });
    $('#example27').multiselect({
        includeSelectAllOption: true,
        numberDisplayed: 2
    });

    // Add options for example 28.
    for (var i = 1; i <= 100; i++) {
        $('#example28').append('<option value="' + i + '">' + i + '</option>');
    }

    $('#example28').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        maxHeight: 150,
        numberDisplayed: 2
    });

    $('#example28-values').on('click', function () {
        var values = [];

        $('option:selected', $('#example28')).each(function () {
            values.push($(this).val());
        });

        alert(values);
    });

    $('#example3').multiselect({
        buttonClass: 'btn btn-link',
        numberDisplayed: 2
    });
    $('#example6').multiselect({
        numberDisplayed: 2
    });

    $('#example9').multiselect({
        onChange: function (element, checked) {
            alert('Change event invoked!');
            console.log(element);
        },
        numberDisplayed: 2
    });

    $('#example13').multiselect({
        numberDisplayed: 2
    });

    $('#example19').multiselect({
        numberDisplayed: 1
    });

    $('#example35').multiselect({
        numberDisplayed: 2
    });
    $('#example35-enable').on('click', function () {
        $('#example35').multiselect('enable');
    });
    $('#example35-disable').on('click', function () {
        $('#example35').multiselect('disable');
    });

    $("[name='my-checkbox']").bootstrapSwitch();
//============button-size-change=======
    $(".changesize").on("click", function () {
        $("#switchsize").bootstrapSwitch("size", $(this).text());
    });
//=========Indeterminate State==========
    $('.changeindeterminate').on("click", function () {
        $('#indeterminate').bootstrapSwitch('toggleIndeterminate');
    });
//==============On Off Text==========
    $(".ontext,.offtext").on("keyup", function () {
        var onoff_text = $('#onofftext');
        onoff_text.bootstrapSwitch('onText', $('.ontext').val());
        if ($('.ontext').val() == "") {
            onoff_text.bootstrapSwitch('onText', "ON");
        }
        onoff_text.bootstrapSwitch('offText', $('.offtext').val());
        if ($('.offtext').val() == "") {
            onoff_text.bootstrapSwitch('offText', "OFF");
        }
    });
});