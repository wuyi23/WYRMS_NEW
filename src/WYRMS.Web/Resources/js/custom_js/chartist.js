"use strict";

$(document).ready(function () {
// line chart
    var data6 = {
        labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
        series: [
            [5, 4, 3, 7, 5, 10],
            [3, 2, 9, 5, 4, 6],
            [2, 1, -3, -4, -2, 0]
        ]
    };
// We are setting a few options for our chart and override the defaults
    var options6 = {
        showPoint: false,
        lineSmooth: false,
        axisX: {
            showGrid: false,
            showLabel: false
        },
        axisY: {
            offset: 60,
            labelInterpolationFnc: function (value) {
                return '$' + value + 'm';
            }
        }
    };
    new Chartist.Line('.ct-chart6', data6, options6);
    // line chart ends

// bar chart

    var data1 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
        ]
    };

    var options1 = {
        seriesBarDistance: 15
    };

    var responsiveOptions1 = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
            seriesBarDistance: 10,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value;
                }
            }
        }],
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];

    new Chartist.Bar('.ct-chart1', data1, options1, responsiveOptions1);

// bar chart ends

    /* different series chart */
    var data2 = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        // Naming the series with the series object array notation
        series: [{
            name: 'series-1',
            data: [5, 2, -4, 2, 0, -2, 5, -3]
        }, {
            name: 'series-2',
            data: [4, 3, 5, 3, 1, 3, 6, 4]
        }, {
            name: 'series-3',
            data: [2, 4, 3, 1, 4, 5, 3, 2]
        }]
    };
    var options2 = {
        fullWidth: true,
        // Within the series options you can use the series names
        // to specify configuration that will only be used for the
        // specific series.
        series: {
            'series-1': {
                lineSmooth: Chartist.Interpolation.step()
            },
            'series-2': {
                lineSmooth: Chartist.Interpolation.simple(),
                showArea: true
            },
            'series-3': {
                showPoint: false
            }
        }
    };
    var responsiveoptions2 = [
        // You can even use responsive configuration overrides to
        // customize your series configuration even further!
        ['screen and (max-width: 320px)', {
            series: {
                'series-1': {
                    lineSmooth: Chartist.Interpolation.none()
                },
                'series-2': {
                    lineSmooth: Chartist.Interpolation.none(),
                    showArea: false
                },
                'series-3': {
                    lineSmooth: Chartist.Interpolation.none(),
                    showPoint: true
                }
            }
        }]
    ];
    var chart3 = new Chartist.Line('.ct-chart2', data2, options2, responsiveoptions2);

    /* different series chart ends */

    /* SVG Animations Chart*/
    var data3 = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        series: [
            [12, 4, 2, 8, 5, 4, 6, 2, 3, 3, 4, 6],
            [4, 8, 9, 3, 7, 2, 10, 5, 8, 1, 7, 10]
        ]
    };
    var options3 = {
        low: 0,
        showLine: false,
        axisX: {
            showLabel: false,
            offset: 0
        },
        axisY: {
            showLabel: false,
            offset: 0
        }
    };
    var chart4 = new Chartist.Line('.ct-chart3', data3, options3);


    var seq = 0;


    chart4.on('created', function () {
        seq = 0;
    });


    chart4.on('draw', function (data) {
        if (data.type === 'point') {
            data.element.animate({
                opacity: {

                    begin: seq++ * 80,
                    dur: 500,
                    from: 0,
                    to: 1
                },
                x1: {
                    begin: seq++ * 80,
                    dur: 500,
                    from: data.x - 100,
                    to: data.x,
                    easing: Chartist.Svg.Easing.easeOutQuart
                }
            });
        }
    });

    chart4.on('created', function () {
        if (window.__anim0987432598723) {
            clearTimeout(window.__anim0987432598723);
            window.__anim0987432598723 = null;
        }
        window.__anim0987432598723 = setTimeout(chart4.update.bind(chart4), 8000);
    });
    // SVG Animations Chart ends

    /* XY Plot Chart */

    var data4 = {
        series: [
            [
                {x: 1, y: 100},
                {x: 2, y: 50},
                {x: 3, y: 25},
                {x: 5, y: 12.5},
                {x: 8, y: 6.25}
            ]
        ]
    };
    var options4 = {
        axisX: {
            type: Chartist.AutoScaleAxis,
            onlyInteger: true
        }
    };
    new Chartist.Line('.ct-chart4', data4, options4);

    /* XY Plot Chart ends*/

    /* Fixed Scale Axis Chart */

    var data5 = {
        series: [
            [
                {x: 1, y: 100},
                {x: 2, y: 50},
                {x: 3, y: 25},
                {x: 5, y: 12.5},
                {x: 8, y: 6.25}
            ]
        ]
    };
    var options5 = {
        axisX: {
            type: Chartist.AutoScaleAxis,
            onlyInteger: true
        },
        axisY: {
            type: Chartist.FixedScaleAxis,
            ticks: [0, 50, 75, 87.5, 100],
            low: 0
        },
        lineSmooth: Chartist.Interpolation.step(),
        showPoint: false
    };
    new Chartist.Line('.ct-chart5', data5, options5);

    /* Fixed Scale Axis Chart ends*/

    /*Advanced SMIL Animations Chart*/

    var data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        series: [
            [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
            [4, 5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
            [5, 3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4]
        ]
    };
    var options = {
        low: 0
    };
    var chart7 = new Chartist.Line('.ct-chart', data, options);

    var seq1 = 0,
        delays = 80,
        durations = 500;

    chart7.on('created', function () {
        seq1 = 0;
    });

    chart7.on('draw', function (data) {
        seq1++;

        if (data.type === 'line') {
            data.element.animate({
                opacity: {
                    begin: seq1 * delays + 1000,
                    dur: durations,
                    from: 0,
                    to: 1
                }
            });
        } else if (data.type === 'label' && data.axis === 'x') {
            data.element.animate({
                y: {
                    begin: seq1 * delays,
                    dur: durations,
                    from: data.y + 100,
                    to: data.y,
                    easing: 'easeOutQuart'
                }
            });
        } else if (data.type === 'label' && data.axis === 'y') {
            data.element.animate({
                x: {
                    begin: seq1 * delays,
                    dur: durations,
                    from: data.x - 100,
                    to: data.x,
                    easing: 'easeOutQuart'
                }
            });
        } else if (data.type === 'point') {
            data.element.animate({
                x1: {
                    begin: seq1 * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                x2: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                opacity: {
                    begin: seq1 * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                }
            });
        } else if (data.type === 'grid') {
            var pos1Animation = {
                begin: seq1 * delays,
                dur: durations,
                from: data[data.axis.units.pos + '1'] - 30,
                to: data[data.axis.units.pos + '1'],
                easing: 'easeOutQuart'
            };

            var pos2Animation = {
                begin: seq1 * delays,
                dur: durations,
                from: data[data.axis.units.pos + '2'] - 100,
                to: data[data.axis.units.pos + '2'],
                easing: 'easeOutQuart'
            };

            var animations = {};
            animations[data.axis.units.pos + '1'] = pos1Animation;
            animations[data.axis.units.pos + '2'] = pos2Animation;
            animations['opacity'] = {
                begin: seq1 * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'easeOutQuart'
            };

            data.element.animate(animations);
        }
    });

    chart7.on('created', function () {
        if (window.__exampleAnimateTimeout) {
            clearTimeout(window.__exampleAnimateTimeout);
            window.__exampleAnimateTimeout = null;
        }
        window.__exampleAnimateTimeout = setTimeout(chart7.update.bind(chart7), 12000);
    });
    // Advanced SMIL Animations Chart ends

    /* SVG Path Animation Chart*/
    var data7 = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        series: [
            [1, 5, 2, 5, 4, 3],
            [2, 3, 4, 8, 1, 2],
            [5, 4, 3, 2, 1, 0.5]
        ]
    };
    var options7 = {
        low: 0,
        showArea: true,
        showPoint: false,
        fullWidth: true
    };
    var chart8 = new Chartist.Line('.ct-chart7', data7, options7);

    chart8.on('draw', function (data) {
        if (data.type === 'line' || data.type === 'area') {
            data.element.animate({
                d: {
                    begin: 2000 * data.index,
                    dur: 2000,
                    from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                }
            });
        }
    });
    /* SVG Path Animation Chart ends*/

//sidebar toggle
    $(".sidebar-toggle").on("click", function () {
        new Chartist.Line('.ct-chart', data, options);
        new Chartist.Bar('.ct-chart1', data1, options1, responsiveOptions1);
        chart3 = new Chartist.Line('.ct-chart2', data2, options2, responsiveoptions2);
        chart4 = new Chartist.Line('.ct-chart3', data3, options3);
        new Chartist.Line('.ct-chart4', data4, options4);
        new Chartist.Line('.ct-chart5', data5, options5);
        new Chartist.Line('.ct-chart6', data6, options6);
        new Chartist.Line('.ct-chart7', data7, options7);
    });
});