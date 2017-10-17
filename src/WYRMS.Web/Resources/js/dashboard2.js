'use strict';

$(document).ready(function () {

    //sparkline charts

    $("#sparkline_bar").sparkline([11, 12, 13, 12, 13, 10, 9, 14, 13, 11, 11, 12, 11, 11, 10, 12, 11], {
        type: 'bar',
        width: '100',
        barWidth: 5,
        height: '55',
        barColor: '#efefef',
        negBarColor: '#fff'
    });

    $("#sparkline_line").sparkline([9, 10, 9, 10, 10, 11, 12, 10, 10, 11, 11, 12, 11, 10, 12, 11, 10, 12], {
        type: 'line',
        width: '100',
        height: '55',
        fillColor: '#efefef',
        lineColor: '#fff'
    });

    // c3 charts

    var core_chart1 = {
        main_dashboard: function () {
            if ($('#sales-line-bar').length) {
                var sales_line_bar_chart = c3.generate({
                    bindto: '#sales-line-bar',
                    data: {
                        x: 'x',
                        columns: [
                            ['x', '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01', '2013-07-01', '2013-08-01', '2013-09-01', '2013-10-01', '2013-11-01', '2013-12-01'],
                            ['2013', 72, 53, 91, 72, 81, 114, 94, 109, 118, 112, 124, 143],
                            ['2014', 118, 114, 118, 134, 163, 152, 158, 178, 183, 194, 212, 188]
                        ],
                        types: {
                            '2013': 'area',
                            '2014': 'line'
                        }
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                culling: false,
                                fit: true,
                                format: "%b"
                            }
                        },
                        y: {
                            tick: {
                                format: d3.format("")
                            }
                        }
                    },
                    point: {
                        r: '4',
                        focus: {
                            expand: {
                                r: '5'
                            }
                        }
                    },
                    bar: {
                        width: {
                            ratio: 0.5 // this makes bar width 50% of length between ticks
                        }
                    },
                    grid: {
                        x: {
                            show: true
                        },
                        y: {
                            show: true
                        }
                    },
                    color: {
                        pattern: ['#428bca', '#ffb65f', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
                    }
                });

                $('.chart_switch').on('click', function () {

                    if ($(this).data('chart') == 'line') {
                        sales_line_bar_chart.transform('area', '2013');
                        sales_line_bar_chart.transform('line', '2014');
                    } else if ($(this).data('chart') == 'bar') {
                        sales_line_bar_chart.transform('bar');
                    }
                    if (!$(this).hasClass("btn-default")) {
                        $('.chart_switch').toggleClass('btn-default btn-link');
                    }

                });

                $(window).on("debouncedresize", function () {
                    sales_line_bar_chart.resize();
                });


                //To resize the charts width on clicking left-menu collapse button
                $("[data-toggle='offcanvas']").click(function (e) {

                    sales_line_bar_chart.resize();

                });
            }

        }

    };
    core_chart1.main_dashboard();

    // function to initiate live-Chart

    if ($("#chart-live").length) {
        var chart;
        var data = [{
            key: "Stream 1",
            values: [{
                x: 1,
                y: 1
            }]
        }];
        nv.addGraph(function () {

            chart = nv.models.historicalBarChart().margin({
                top: 30,
                right: 0,
                bottom: 40,
                left: 0
            }).color(['#428bca']);

            chart.x(function (d, i) {
                return d.x;
            });
            // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
            chart.xAxis
                .tickFormat(d3.format(',.1f'));

            chart.yAxis.tickFormat(d3.format(',.4f'));

            chart.showXAxis(true).showYAxis(false);

            d3.select('#chart-live svg').datum(data).transition().duration(500).call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });

        var x = 2;
        var run = true;

        setInterval(function () {
            if (!run)
                return;
            d3.select(".nv-bars").on("mouseover", function () {
                run = false;

            }).on("mouseout", function () {
                run = true;

            });
            var spike = (Math.random() > 0.95) ? 10 : 1;
            data[0].values.push({
                x: x,
                y: Math.random() * spike
            });

            if (data[0].values.length > 10) {
                data[0].values.shift();
            }
            x++;

            chart.update();
        }, 1000);

        d3.select("#start-stop-button").on("click", function () {
            run = !run;
        });
    }

    // function to initiate live-Chart ends

    //auto activity update panel

    if ($('.auto-update').length > 0) {
        $('.auto-update').newsTicker({
            row_height: 100,
            max_rows: 2,
            speed: 1500,
            direction: 'down',
            duration: 3500,
            autostart: 1,
            pauseOnHover: 1
        });
    }

    //auto activity update panel ends

    // server load charts

    //load on cpu

    window.onload = function () {
        //canvas initialization
        var canvas = document.getElementById("cpu-load");
        var ctx = canvas.getContext("2d");
        //dimensions
        var W = canvas.width;
        var H = canvas.height;
        //Variables
        var degrees = 0;
        var new_degrees = 0;
        var difference = 0;
        var color = "#428bca";
        var bgcolor = "#ccc";
        var text;
        var animation_loop, redraw_loop;

        function init() {
            ctx.clearRect(0, 0, W, H);

            //Background 360 degree arc
            ctx.beginPath();
            ctx.strokeStyle = bgcolor;
            ctx.lineWidth = 25;
            ctx.arc(W / 2, H / 2, 100, 0, Math.PI * 2, false);
            ctx.stroke();

            //Angle in radians = angle in degrees * PI / 180
            var radians = degrees * Math.PI / 180;
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 30;

            ctx.arc(W / 2, H / 2, 100, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
            ctx.stroke();

            //Lets add the text
            ctx.fillStyle = color;
            ctx.font = "50px bebas";
            text = Math.floor(degrees / 360 * 100) + "%";
            //center the text
            var text_width = ctx.measureText(text).width;
            //adding manual value to position y since the height of the text cannot
            ctx.fillText(text, W / 2 - text_width / 2, H / 2 + 15);
        }

        function draw() {
            if (typeof animation_loop != undefined) clearInterval(animation_loop);

            //random degree
            new_degrees = Math.round(Math.random() * 360);
            difference = new_degrees - degrees;
            animation_loop = setInterval(animate_to, 1000 / difference);
        }

        function animate_to() {
            if (degrees == new_degrees)
                clearInterval(animation_loop);

            if (degrees < new_degrees)
                degrees++;
            else
                degrees--;

            init();
        }

        //add some transition time
        draw();
        redraw_loop = setInterval(draw, 3000);


    };

    //memory usage chart

    var server_loadchart2 = {
        memory_used: function () {
            //canvas initialization
            var usedmemory = document.getElementById("space-used");
            var view = usedmemory.getContext("2d");
            //dimensions
            var width = usedmemory.width;
            var height = usedmemory.height;
            //Variables
            var angle = 220;
            var colour = "#428bca";
            var background = "#ccc";
            var value;


            view.clearRect(0, 0, width, height);

            //Background 360 degree arc
            view.beginPath();
            view.strokeStyle = background;
            view.lineWidth = 25;
            view.arc(width / 2, height / 2, 100, 0, Math.PI * 2, false);
            view.stroke();

            //Angle in radians = angle in degrees * PI / 180
            var rad = angle * Math.PI / 180;
            view.beginPath();
            view.strokeStyle = colour;
            view.lineWidth = 30;

            view.arc(width / 2, height / 2, 100, 0 - 90 * Math.PI / 180, rad - 90 * Math.PI / 180, false);
            view.stroke();

            //Lets add the text
            view.fillStyle = colour;
            view.font = "50px bebas";
            value = Math.floor(angle / 360 * 100) + "%";
            //center the text
            var text_widtheight = view.measureText(value).width;
            //adding manual value to position y since the height of the text cannot
            view.fillText(value, width / 2 - text_widtheight / 2, height / 2 + 15);


        }
    };

    server_loadchart2.memory_used();

    // server load js ends

    // task to do starts
    var input_text =  $("#custom_textbox");
    var parent = $("body");
    input_text.on('keypress', function (e) {
        if (e.which == 13 && $(".save_todo").css("display") == "inline-block") {
            e.preventDefault();
            $(".save_todo").click();
        }
    });

    $("form#main_input_box").submit(function (event) {
        event.preventDefault();

        var deleteButton = " <a href='#' class='tododelete redcolor pull-right showbtns'><i class='fa fa-times' aria-hidden='true'></i></a>";
        var striks = " <span class='striks pull-right showbtns'>|</span>";
        var editButton = "<a href='' class='todoedit pull-right showbtns'><i class='fa fa-pencil' aria-hidden='true'></i></a><a href='' class='un-do pull-right' hidden><i class='fa fa-repeat showbtns' aria-hidden='true'></i> </a>";
        var checkBox = "<input type='checkbox' class='striked' /><label></label>";
        var twoButtons = "<div class='col-md-2 col-sm-2 col-xs-3 todoitembtns'>" + deleteButton + striks + editButton + "</div>";
        var oneButton = "<div class='col-md-2 col-sm-2 col-xs-3  todoitembtns'>" + deleteButton + "</div>";
        $(".list_of_items").prepend("<div class='todolist_list showactions'>  " + "<div class='col-md-9 col-sm-9 col-xs-8 nopadmar custom_textbox1'> <div class='checkbox todoitemcheck checkbox-info'>" + checkBox + "</div>" + "<div class='todotext todoitemjs'>" + input_text.val() + "</div></div>" + twoButtons);
        input_text.val('');

    });
    $(document).on('click', '.striked', function (e) {
        $(this).closest('.todolist_list').find('.todotext').toggleClass('strikethrough');
        $(this).closest('.todolist_list').find('.fa-pencil').toggle();
        $(this).closest('.todolist_list').find('.fa-repeat').toggle();
        $(this).closest('.todolist_list').find('.striks').toggle();

    });
    parent.on('click', '.tododelete', function (e) {
        e.preventDefault();
        if ($(this).closest(".todolist_list").hasClass("editinglist")) {
            input_text.val("");
            $(".save_todo").css("display", "none");
            $(".add_task").css("display", "inline-block");
        }
        $(this).closest('.todolist_list').hide("slow", function () {
            $(this).remove();
        });

    }).on('click', '.todoedit', function (e) {
        e.preventDefault();
        parent.find(".editing").removeClass("editing");
        $(".list_of_items").find(".editinglist").removeClass("editinglist");
        parent.find(".todoedit,.todoitemcheck").show();
        parent.find(".un-do").hide();
        //trim function to trim the extra spaces before and after the text
        input_text.val($.trim($(this).closest('.todolist_list').find(".todotext").text())).focus();
        $(this).closest('.todolist_list').addClass("editinglist").find(".todotext").addClass("editing");
        $(this).hide();
        $(this).closest('.todolist_list').find(".todoitemcheck").hide();
        $(this).closest('.todolist_list').find(".un-do").show();
        $(".save_todo").css("display", "inline-block");
        $(".add_task").css("display", "none");
    });

    $('.list_of_items').on('click', '.un-do', function (e) {
        e.preventDefault();
        $(".add_task").css("display", "inline-block");
        $(".save_todo").css("display", "none");
        parent.find(".todoedit").show();
        input_text.val("");
        parent.find(".editinglist").removeClass("editinglist");
        $(this).hide();
        $(this).closest('.todolist_list').find(".todoitemcheck").show();
    });
    $('.todolist_list').on("click", ".btn.save_todo", function () {
        var edit1 = input_text.val();
        if (edit1 === '') {
            alert('Come on! you can\'t create a task without Title');
        } else {
            $(".editing").text(input_text.val());
            $(".add_task").css("display", "inline-block");
            $(".save_todo").css("display", "none");
            parent.find(".todoedit,.todoitemcheck").show();
            parent.find(".un-do").hide();
            input_text.val("");
            parent.find(".editinglist").removeClass("editinglist");
        }
    });

    // slim scroll for the task to do

        $('.list_of_items').slimScroll({
            color: '#A9B6BC',
            height: '141px',
            size: '5px'
        });

    // task to do ends

    function social_icons(){
        if($(window).scrollTop() + $(window).height() > ($(document).height()-30)) {
            $('.social_popup_icons').css('visibility','visible').addClass('anim_add');
        }else{
            $('.social_popup_icons').css('visibility','hidden');
        }
    }
    social_icons();
    $(window).on('scroll', function() {
        social_icons();
    });
     //To resize the content on screen enlargement
    $("[data-toggle='offcanvas']").on('click', function (e) {
        $('.social_popup_icons').toggleClass('col-md-6 col-md-8');
    });

});