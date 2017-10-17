"use strict";

$(document).ready(function () {

    //=================Preloader===========//
    $(window).on('load', function () {
        $('.preloader img').fadeOut();
        $('.preloader').fadeOut();
    });
    //=================end of Preloader===========//
    
    //Flat red color scheme for iCheck
    $('input[type="checkbox"], input[type="radio"]').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        increaseArea: '20%'
    });
    $("#dee1").on('click', function() {
        $('input').iCheck('uncheck');
        $('select').trigger('change');
    });

    $('#register_form').bootstrapValidator({
        fields: {
            first_name: {
                validators: {
                    notEmpty: {
                        message: 'The first name is required and cannot be empty'
                    }
                }
            },
            last_name: {
                validators: {
                    notEmpty: {
                        message: 'The last name is required'
                    }
                }
            },
            user_name: {
                validators: {
                    notEmpty: {
                        message: 'The user name is required'
                    }
                }
            },
            password: {
                validators: {

                    notEmpty: {
                        message: 'Please provide a password'
                    }
                }
            },
            password_confirm: {
                validators: {
                    notEmpty: {
                        message: 'The confirm password is required'
                    },
                    identical: {
                        field: 'password',
                        message: 'Please enter the same password'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    regexp: {
                        regexp: /^\S+@\S{1,}\.\S{1,}$/,
                        message: 'The input is not a valid email address'
                    }
                }
            },
            email_confirm: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    regexp: {
                        regexp: /^\S+@\S{1,}\.\S{1,}$/,
                        message: 'The input is not a valid email address'
                    },
                    identical: {
                        field: 'email',
                        message: 'Please enter the same email as above'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'The phone number is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^\d{10}$/,
                        message: 'The phone number should contain only 10 numbers'
                    }
                }
            },
            terms: {
                validators: {
                    notEmpty: {
                        message: 'The terms and conditions should be accepted'
                    }
                }
            }
        }
    });
    var opts = $("#source").html(),
        opts2 = "<option></option>" + opts;
    $("select.populate").each(function () {
        var e = $(this);
        e.html(e.hasClass("placeholder") ? opts2 : opts);
    });
    $(".examples article:odd").addClass("zebra");

    $("#terms").on("ifChanged", function () {
        $('#register_form').bootstrapValidator('revalidateField', $('#terms'));
    });
    $("[type='reset']").on("click", function () {
        $('#register_form').bootstrapValidator("resetForm");
    });

});