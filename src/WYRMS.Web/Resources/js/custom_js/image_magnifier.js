"use strict";

$(document).ready(function() {

    //inner magnifier
    var $host;
    $host = $('[data-mag-thumb="inner-inline"]');
    $host.mag();
    // outer magnifier
    $host = $('[data-mag-thumb="outer"]');
    $host.mag({
        mode: 'outer',
        ratio: 1 / 1.6
    });
    // outer drag
    $host = $('[data-mag-thumb="outer-drag"]');
    $host.mag({
        mode: 'outer',
        position: 'drag',
        toggle: false
    });
    //  drag
    $host = $('[data-mag-thumb="drag"]');
    $host.mag({
        position: 'drag',
        toggle: false
    });
    var $hudLeft = $('<div class="mag-eg-hud mag-eg-hud-left"></div>');
    $hudLeft.appendTo($host.parent());

    var $hudRight = $('<div class="mag-eg-hud mag-eg-hud-right"></div>');
    $hudRight.appendTo($host.parent());

    var toPerc = function(p) {
        return (p * 100).toFixed(1) + '%';
    };

    $host.on('compute', function(e) {
        var mag = $(this).data('mag');
        var m = mag.model;
        $hudLeft.html(
            '<div>' + m.zoom.toFixed(1) + 'x</div>'
        );
        $hudRight.html(
            '<div>(' + toPerc(m.focus.x) + ', ' + toPerc(m.focus.y) + ')</div>'
        );
    });

    //controls
    var $host1;
    var $controls;

    $host1 = $('[data-mag-thumb="controls"]');
    $host1.mag({
        toggle: false,
        position: false
    });

    $controls = $('[data-mag-ctrl="controls"]');
    $controls.magCtrl({
        mag: $host1
    });
});
