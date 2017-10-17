"use strict";

$(document).ready(function() {

    $(".dob").dateDropper({
        dropPrimaryColor: "#428bca"
    });
    $("#country").select2({
        theme: "bootstrap"
    });
    $(".content").find('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
});