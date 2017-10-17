"use strict";

$(document).ready(function () {
    //CREATE PAGE METHODS
    var page = {
        init: function () {
            this.buttons = $('#main-nav').find('a');

            this.activateNav();
            this.disableDemoButtons();
        },

        activateNav: function () {
            var that = this;

            this.buttons.on('click', function (e) {
                e.preventDefault();
                var currentButton = $(e.currentTarget);
                var buttonId = currentButton.attr('href');

                //DESELECT ALL BUTTONS & SELECT CURRRENT ONE
                that.buttons.parent().removeClass('selected');
                currentButton.parent().addClass('selected');

                //ANIMATE SCROLL EFFECT
                $("html, body").animate({
                    scrollTop: $(buttonId).offset().top - 100
                }, 'slow');

            });
        },

        disableDemoButtons: function () {
            $('.showcase [href^=#]').on('click', function (e) {
                e.preventDefault();
            });
        }
    };

    //INITIALIZE PAGE
    page.init();

    // Bind normal buttons
    Ladda.bind('.button_normal', {
        timeout: 2000
    });

    // Bind progress buttons and simulate loading progress
    Ladda.bind('.button_progress', {
        callback: function (instance) {
            var progress = 0;
            var interval = setInterval(function () {
                progress = Math.min(progress + Math.random() * 0.1, 1);
                instance.setProgress(progress);

                if (progress === 1) {
                    instance.stop();
                    clearInterval(interval);
                }
            }, 200);
        }
    });
});