"use strict";

$(document).ready(function () {

    PNotify.prototype.options.styling = "bootstrap3";
    PNotify.prototype.options.styling = "jqueryui";
    PNotify.prototype.options.styling = "fontawesome";
    new PNotify({
        title: 'Regular Notice',
        text: 'Check me out! I\'m a notice.'
    });


    function fake_load() {
        var cur_value = 1,
            progress;

        // Make a loader.
        var loader = new PNotify({
            title: "Creating series of tubes",
            text: '<div class="progress progress-striped active" style="margin:0">\
    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0">\
        <span class="sr-only">0%</span>\
    </div>\
</div>',
            //icon: 'fa fa-moon-o fa-spin',
            icon: 'fa fa-cog fa-spin',
            hide: false,
            buttons: {
                closer: true,
                sticker: true
            },
            history: {
                history: false
            },
            before_open: function (notice) {
                progress = notice.get().find("div.progress-bar");
                progress.width(cur_value + "%").attr("aria-valuenow", cur_value).find("span").html(cur_value + "%");
                // Pretend to do something.
                var timer = setInterval(function () {
                    if (cur_value == 70) {
                        loader.update({title: "Aligning discrete worms", icon: "fa fa-circle-o-notch fa-spin"});
                    }
                    if (cur_value == 80) {
                        loader.update({title: "Connecting end points", icon: "fa fa-refresh fa-spin"});
                    }
                    if (cur_value == 90) {
                        loader.update({title: "Dividing and conquering", icon: "fa fa-spinner fa-spin"});
                    }
                    if (cur_value >= 100) {
                        // Remove the interval.
                        window.clearInterval(timer);
                        loader.remove();
                        return;
                    }
                    cur_value += 1;
                    progress.width(cur_value + "%").attr("aria-valuenow", cur_value).find("span").html(cur_value + "%");
                }, 65);
            }
        });
    }

    $('.dynamic_notice').on('click', function(){
        var percent = 0;
        var notice = new PNotify({
            text: "Please Wait",
            type: 'info',
            icon: 'fa fa-spinner fa-spin',
            hide: false,
            buttons: {
                closer: false,
                sticker: false
            },
            opacity: .75,
            shadow: false,
            width: "170px"
        });

        setTimeout(function () {
            notice.update({
                title: false
            });
            var interval = setInterval(function () {
                percent += 2;
                var options = {
                    text: percent + "% complete."
                };
                if (percent == 80) options.title = "Almost There";
                if (percent >= 100) {
                    window.clearInterval(interval);
                    options.title = "Done!";
                    options.type = "success";
                    options.hide = true;
                     options.delay=3000; 
                    options.buttons = {
                        closer: true,
                        sticker: true
                    };
                    options.icon = 'fa fa-check';
                    options.opacity = 1;
                    options.shadow = true;
                    options.width = PNotify.prototype.options.width;
                }
                notice.update(options);
            }, 120);
        }, 1500);
    });
});
