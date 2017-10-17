"use strict";

$(document).ready(function() {

    //=================Preloader===========//
    $(window).on('load', function () {
        $('.preloader img').fadeOut();
        $('.preloader').fadeOut();
    });
    //=================end of Preloader===========//
    
    /*Background slideshow */

    $('.bg-slider').backstretch([
        "/Resources/img/pages/lbg-1.jpg", "/Resources/img/pages/lbg-2.jpg", "/Resources/img/pages/lbg-3.jpg"
    ], {
        duration: 2500,
        fade: 1050
    });

    $('input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        increaseArea: '20%' // optional
    });
    $("#authentication").bootstrapValidator({
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '请正确填写您的登录用户名'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请正确填写您的登录密码'
                    }

                }
            },
			 checkcode: {
                validators: {
                    notEmpty: {
                        message: '请正确填写您的手机验证码'
                    }

                }
            }

        }
    });
    
});
