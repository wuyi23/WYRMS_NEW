"use strict";

$(document).ready(function () {
    $(".knob").knob({
        change: function (value) {
            //console.log("change : " + value);
        },
        cancel: function () {
            console.log("cancel : ", this);
        },
        /*format : function (value) {
         return value + '%';
         },*/
        draw: function () {
            // "tron" case
            if (this.$.data('skin') == 'tron') {

                this.cursorExt = 0.3;

                var a = this.arc(this.cv) // Arc
                    ,
                    pa // Previous arc
                    , r = 1;

                this.g.lineWidth = this.lineWidth;

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }
                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });
    // Example of infinite knob, iPod click wheel
    var v, up = 0,
        down = 0,
        i = 0,
        $idir = $("div.idir"),
        $ival = $("div.ival"),
        incr = function () {
            i++;
            $idir.show().html("+").fadeOut();
            $ival.html(i);
        },
        decr = function () {
            i--;
            $idir.show().html("-").fadeOut();
            $ival.html(i);
        };
    $("input.infinite").knob({
        min: 0,
        max: 20,
        stopper: false,
        change: function () {
            if (v > this.cv) {
                if (up) {
                    decr();
                    up = 0;
                } else {
                    up = 1;
                    down = 0;
                }
            } else {
                if (v < this.cv) {
                    if (down) {
                        incr();
                        down = 0;
                    } else {
                        down = 1;
                        up = 0;
                    }
                }
            }
            v = this.cv;
        }
    });


    function clock() {
        var $s = $(".second"),
            $m = $(".minute"),
            $h = $(".hour");
        var d = new Date(),
            s = d.getSeconds(),
            m = d.getMinutes(),
            h = d.getHours();
        $s.val(s).trigger("change");
        $m.val(m).trigger("change");
        $h.val(h).trigger("change");
        setTimeout(clock, 1000);
    }

    clock();
//jquery knob js end


// spark line charts js start
    $(".linechart").sparkline([5, 1, 7, 8, 2, 6, 4, 7, 4, 2, 4], {
        type: 'line',
        height: "50px",
        width: "80px;",
        lineColor: '#428bca',
        fillColor: 'rgba(66,139,202,0.5)'
    });
    $(".barchart").sparkline([5, 6, 7, 2, 0, -4, -2, 4], {
        type: 'bar',
        height: "50px",
        barWidth: "8px;",
        barSpace: "3px",
        barColor: "#428bca",
        negBarColor: '#fb8678'
    });
    $(".stackedbarchart").sparkline([
        [5, 4],
        [4, 7],
        [7, 3],
        [3, 5],
        [6, 3],
        [2, 5]
    ], {
        type: 'bar',
        zeroColor: '#dcdcdc',
        nullColor: '#dcdcdc ',
        height: "50px",
        barWidth: "8px;",
        barSpace: "3px",
        stackedBarColor: ['#fb8678', '#428bca']
    });
    $(".tristatechart").sparkline([1, 1, 0, 1, -1, -1, 1, -1, 0, 0, 1, 1], {
        type: 'tristate',
        height: "50px",
        barWidth: "8px;",
        barSpace: "3px",
        posBarColor: '#22d69d',
        negBarColor: '#fb8678',
        zeroBarColor: '#dcdcdc'
    });
    $(".bulletchart").sparkline([10, 12, 12, 9, 7], {
        type: 'bullet',
        height: "30px",
        width: "80px",
        targetColor: '#fb8678',
        performanceColor: '#4fc1e9',
        rangeColors: ['#ffb65f', '#fb8678', '#428bca']
    });
    $(".piechart").sparkline([3, 4, 1, 6, 3, 5], {
        type: 'pie',
        width: '50px',
        height: '50px',
        sliceColors: ['#428bca', '#22d69d', '#4fc1e9', '#fb8678', '#ffb65f']
    });
    $(".discretechart").sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 5, 2, 3, 5, 1, 6], {
        type: 'discrete',
        height: "50px",
        Width: "80px",
        lineColor: '#428bca'
    });
    $(".boxchart").sparkline([4, 27, 34, 52, 54, 59, 61, 68, 78, 82, 85, 87, 91, 93, 100], {
        type: 'box',
        width: '80px',
        height: '50px',
        boxFillColor: '#4fc1e9',
        whiskerColor: '#ffb65f',
        medianColor: '#fb8678',
        targetColor: '#22d69d'
    });
    $('#compositeline').sparkline('html', {
        fillColor: false,
        changeRangeMin: 0,
        chartRangeMax: 10,
        width: '100px',
        height: '50px',
        lineColor: '#428bca'
    }).sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
        composite: true,
        fillColor: false,
        changeRangeMin: 0,
        chartRangeMax: 10,
        width: '100px',
        height: '50px',
        lineColor: '#fb8678'
    });
    $('#compositebar').sparkline('html', {
        type: 'bar',
        barWidth: "10px;",
        barSpace: "5px",
        height: '50px',
        barColor: "#428bca"
    }).sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
        composite: true,
        fillColor: false,
        barWidth: "10px;",
        barSpace: "5px",
        height: '50px',
        lineColor: '#ffb65f'
    });
    $('#normalline').sparkline('html', {
        fillColor: false,
        normalRangeMin: -1,
        normalRangeMax: 8,
        width: '120px',
        height: '50px',
        lineColor: '#428bca'
    });
    $('#normalExample').sparkline('html', {
        fillColor: false,
        normalRangeMin: 80,
        normalRangeMax: 95,
        normalRangeColor: '#dcdcdc'
    });
    $('#discrete2').sparkline('html', {
        type: 'discrete',
        thresholdColor: '#fb8678',
        thresholdValue: 4,
        height: "50px",
        Width: "80px",
        lineColor: '#428bca'
    });

});