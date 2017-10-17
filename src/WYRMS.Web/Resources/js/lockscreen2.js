"use strict";
$(document).ready(function () {
    //=================Preloader===========//
    $(window).on('load', function () {
        $('.preloader img').fadeOut();
        $('.preloader').fadeOut();
    });
    //=================end of Preloader===========//
    
    var textfield = $("input[name=user]");
    $('button[type="submit"]').on('click', function(e) {
        e.preventDefault();
        //little validation just to check username
        if (textfield.val() != "") {
            //$("body").scrollTo("#output");
            $("#output").addClass("alert alert-success animated fadeInUp").html("Welcome back Natali").removeClass('alert-danger');
            $("input").css({
                "height":"0",
                "padding":"0",
                "margin":"0",
                "opacity":"0"
            });
            //change button text
            $(".locked").addClass("hidden");
            $(".unlocked").removeClass("hidden");
            $('button[type="submit"]').html("CONTINUE")
                .removeClass("btn-info")
                .addClass("btn-success").on('click', function(){
                window.location.href = 'index.html';
            });

            //show avatar
            $(".avatar").css({
                "background-image": "url('img/authors/avatar1.jpg')"
            });
        } else {
            //remove success mesage replaced with error message
            $("#output").removeClass(' alert alert-success').addClass("alert alert-danger animated fadeInUp").html("Sorry Enter Your Password ");
        }
        //console.log(textfield.val());

    });
});
