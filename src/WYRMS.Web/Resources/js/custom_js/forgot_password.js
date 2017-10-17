'use strict';

$(document).ready(function () {

//=================Preloader===========//
        $(window).on('load', function () {
            $('.preloader img').fadeOut();
            $('.preloader').fadeOut();
        });
//=================end of Preloader===========//
    $('input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        increaseArea: '20%' // optional
    });


    $("#forgot_password").bootstrapValidator({
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            }
        }
    });

    var input_field = $("input[name=email]");

    $('button[type="submit"]').on('click', function (e) {
        e.preventDefault();

        if (input_field.val() != "") {
            $(".enter_email").addClass("hidden");
            $(".check_email").removeClass("hidden");
            $('#email, .signup-signin').addClass('hidden');
            $('.submit-btn').addClass('animated fadeInUp');
            $('button[type="submit"]').html("Continue with log In")
                .removeClass("btn-primary btn-block submit-btn")
                .addClass("btn-success btn-top").on('click', function () {
                window.location.href = 'login.html';
            });
        }else {
            var error_msg = "<small>Sorry, Enter Your Registered email</small>";
            $(".enter_email").addClass("text-danger animated fadeInUp").html(error_msg);
        }

    });

        $("#email").on('keypress focus', function(){
            var element = '<small>Enter your Registered email</small>';
            $(".enter_email").removeClass("text-danger animated fadeInUp").html(element);
        });


});