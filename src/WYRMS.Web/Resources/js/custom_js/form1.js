"use strict";

$(document).ready(function () {
    $("input[type=password]").on('keyup', function () {
        var ucase = new RegExp("[A-Z]+");
        var lcase = new RegExp("[a-z]+");
        var num = new RegExp("[0-9]+");
        var password = $("#password1");

        if (password.val().length >= 8) {
            $("#8char").removeClass("glyphicon-remove").addClass("glyphicon-ok").css("color", "#00A41E");
        } else {
            $("#8char").removeClass("glyphicon-ok").addClass("glyphicon-remove").css("color", "#FF0004");
        }

        if (ucase.test(password.val())) {
            $("#ucase").removeClass("glyphicon-remove").addClass("glyphicon-ok").css("color", "#00A41E");
        } else {
            $("#ucase").removeClass("glyphicon-ok").addClass("glyphicon-remove").css("color", "#FF0004");
        }

        if (lcase.test(password.val())) {
            $("#lcase").removeClass("glyphicon-remove").addClass("glyphicon-ok").css("color", "#00A41E");
        } else {
            $("#lcase").removeClass("glyphicon-ok").addClass("glyphicon-remove").css("color", "#FF0004");
        }

        if (num.test(password.val())) {
            $("#num").removeClass("glyphicon-remove").addClass("glyphicon-ok").css("color", "#00A41E");
        } else {
            $("#num").removeClass("glyphicon-ok").addClass("glyphicon-remove").css("color", "#FF0004");
        }

        if (password.val() == $("#password2").val()) {
            $("#pwmatch").removeClass("glyphicon-remove").addClass("glyphicon-ok").css("color", "#00A41E");
        } else {
            $("#pwmatch").removeClass("glyphicon-ok").addClass("glyphicon-remove").css("color", "#FF0004");
        }
    });
});