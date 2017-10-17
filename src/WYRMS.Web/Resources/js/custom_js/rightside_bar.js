"use strict";


(function (window) {
    // Is Modernizr defined on the global scope
    var Modernizr = typeof Modernizr !== "undefined" ? Modernizr : false,
        // whether or not is a touch device
        isTouchDevice = Modernizr ? Modernizr.touch : !!('ontouch' in window || 'onmsgesturechange' in window),
        // Are we expecting a touch or a click?
        buttonPressedEvent = (isTouchDevice) ? 'touch' : 'click',
        coreplus = function () {
            this.init();
        };
    // Initialization method
    coreplus.prototype.init = function () {
        this.isTouchDevice = isTouchDevice;
        this.buttonPressedEvent = buttonPressedEvent;
    };
    coreplus.prototype.getViewportHeight = function () {
        var docElement = document.documentElement,
            client = docElement.clientHeight,
            inner = window.innerHeight;

        if (client < inner)
            return inner;
        else
            return client;
    };
    coreplus.prototype.getViewportWidth = function () {

        var docElement = document.documentElement,
            client = docElement.clientWidth,
            inner = window.innerWidth;

        if (client < inner)
            return inner;
        else
            return client;
    };
    // Creates a coreplus object.
    window.coreplus = new coreplus();
})(this);
(function ($) {
    var $navBar = $('nav.navbar'),
        $body = $('body'),
        $menu = $('#menu');

    function getHeight(el) {
        return el.outerHeight();
    }

    function init() {
        var isFixedNav = $navBar.hasClass('navbar-fixed-top');
        var bodyPadTop = isFixedNav ? $navBar.outerHeight(true) : 0;
        $body.css('padding-top', bodyPadTop);
    }

    coreplus.navBar = function () {
        var resizeTimer;
        init();
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(init(), 250);
        });
    };
    return coreplus;
})(jQuery);
(function ($, coreplus) {
    var $body = $('body'),
        $rightToggle = $('.toggle-right'),
        $count = 0;
    coreplus.coreplusAnimatePanel = function () {
        if ($('#right').length) {
            $rightToggle.on(coreplus.buttonPressedEvent, function (e) {
                switch (true) {
                    // Close right panel
                    case $body.hasClass("sidebar-right-opened"): {
                        $body.removeClass("sidebar-right-opened");
                        if ($body.hasClass("boxed")) {
                            $('#right').css('right', '-250px');
                        }
                        break;
                    }
                    default: {
                        // Open right panel
                        $body.addClass("sidebar-right-opened");
                        adjust_boxright();
                        $('.navbar-nav>.dropdown').removeClass("open");
                    }
                }
                e.preventDefault();
            });
        } else {
            $rightToggle.addClass('hidden');
        }
    };
    return coreplus;
})(jQuery, coreplus || {});
$(window).on('resize', function () {
    adjust_boxright();
});

function adjust_boxright() {
    if ($('body').hasClass('boxed') && $("body").hasClass("sidebar-right-opened")) {
        var window_w = $(window).width();
        var body_w = $('body').width();
        var margin_right = (window_w - body_w) / 2;
        $('#right').css('right', margin_right);
    }
}
(function ($) {

    $('[data-toggle="tooltip"]').tooltip();
    coreplus.navBar();
    coreplus.coreplusAnimatePanel();

})(jQuery);
$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('.rightsidebar-right-heading-first').addClass('rightsidebar-without-nav');
        } else {
            $('.rightsidebar-right-heading-first').removeClass('rightsidebar-without-nav');
        }

        if ($(this).scrollTop() > 50 && $(this).scrollTop() < 100) {
            $('.rightsidebar-right-heading-first').addClass('rightsidebar-without-nav-small');
        } else {
            $('.rightsidebar-right-heading-first').removeClass('rightsidebar-without-nav-small');
        }
    });
});
//=================Preloader===========//

$(window).on('load', function () {
    $('.preloader img').fadeOut();
    $('.preloader').fadeOut();
});

//=================end of Preloader===========//
