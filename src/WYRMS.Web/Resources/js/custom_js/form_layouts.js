"use strict";

$(document).ready(function() {

    $(".content").find('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });

    $('[type="reset"]').on('click', function() {
        setTimeout(function() {
            $("input").iCheck("update");
        }, 10);
    });
    
});
