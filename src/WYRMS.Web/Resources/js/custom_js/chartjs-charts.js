"use strict";

$(document).ready(function () {

    //start line chart
    var lineChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            fill: true,
            pointBackgroundColor: "rgba(79, 193, 233, 1)",
            pointBorderColor: "#FFF",
            borderJoinStyle: 'miter',
            pointBorderWidth: "1",
            label: "data1",
            data: [30, 48, 35, 24, 35, 27, 50, 40, 60, 35, 46, 30],
            backgroundColor: "rgba(79, 193, 233, 1)"
        }, {
            fill: true,
            pointBackgroundColor: "rgba(220, 220, 220, 1)",
            pointBorderColor: "#FFF",
            borderJoinStyle: 'miter',
            pointBorderWidth: "1",
            pointStrokeColor: "#FFF",
            label: "data2",
            data: [130, 63, 103, 51, 93, 55, 80, 140, 100, 92, 108, 110],
            backgroundColor: "rgba(220, 220, 220, 1)"
        }]

    };

    function draw() {

        var selector1 = '#line-chart';

        $(selector1).attr('width', $(selector1).parent().width());
        var myLine = new Chart($("#line-chart"), {
            type: 'line',
            data: lineChartData,
            options: {
                title: {
                    display: false,
                    text: 'Line Chart'
                }
            }
        });
    }
    draw();
    //end line chart

    //start bar chart
    var barChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "data1",
            backgroundColor: "#4FC1E9",
            hoverBackgroundColor: "#4FC1E9",
            data: [65, 59, 90, 81, 56, 55, 40, 30, 50, 20, 80, 99]
        }, {
            label: "data2",
            backgroundColor: "#ffb65f",
            hoverBackgroundColor: "#FFb65f",
            data: [28, 48, 40, 19, 96, 27, 40, 60, 30, 90, 50, 87]
        }, {
            label: "data3",
            backgroundColor: "#428BCA",
            hoverBackgroundColor: "#428BCA",
            data: [30, 20, 100, 10, 80, 27, 50, 30, 60, 40, 80, 66, 90]
        }]

    };

    function draw1() {

        var selector2 = '#bar-chart';

        $(selector2).attr('width', $(selector2).parent().width());
        var myBar = new Chart($("#bar-chart"), {
            type: 'bar',
            data: barChartData
        });
    }
    draw1();


    //end bar chart

    //start radar chart
    var radarChartData = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Partying", "Running"],
        datasets: [{
            backgroundColor: "rgba(160,212,104,0.5)",
            hoverBackgroundColor: "rgba(160,212,104,0.5)",
            pointBackgroundColor: "rgba(160,212,104,0.5)",
            pointHoverBackgroundColor: "#fff",
            data: [65, 59, 90, 81, 56, 55, 40],
            label: 'data1'
        }, {
            backgroundColor: "rgba(255,206,84,0.5)",
            hoverBackgroundColor: "rgba(255,206,84,0.5)",
            pointBackgroundColor: "rgba(255,206,84,0.5)",
            pointHoverBackgroundColor: "#fff",
            data: [28, 48, 40, 19, 96, 27, 100],
            label: 'data2'
        }]

    };

    function draw2() {

        var selector3 = '#radar-chart';

        $(selector3).attr('width', $(selector3).parent().width());
        var myRadar = new Chart($("#radar-chart"), {
            type: 'radar',
            data: radarChartData,
            responsive: true
        });
    }
    draw2();
    //end  radar chart

    //start polar area chart
    var chartData = {
        datasets: [{
            data: [
                15,
                18,
                10,
                8,
                16
            ],
            backgroundColor: [
                "#428BCA",
                "#FFb65f",
                "#4FC1E9",
                "#22d69d",
                "#Fb8678"
            ],
            label: 'My dataset' // for legend
        }],
        labels: [
            "data1",
            "data2",
            "data3",
            "data4",
            "data5"
        ]
    };

    function draw3() {

        var selector4 = '#polar-area-chart';

        $(selector4).attr('width', $(selector4).parent().width());
        var myPolarArea = new Chart($("#polar-area-chart"), {
            data: chartData,
            type: 'polarArea'
        });
    }
    draw3();

    //end polar area chart

    //start pie chart
    var pieData = {
        labels: [
            "Primary",
            "Success",
            "Info"
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                "#428BCA",
                "#22d69d",
                "#4FC1E9"
            ],
            hoverBackgroundColor: [
                "#428BCA",
                "#22d69d",
                "#4FC1E9"
            ]
        }]
    };

    function draw4() {

        var selector5 = '#pie-chart';

        $(selector5).attr('width', $(selector5).parent().width());
        var myPie = new Chart($("#pie-chart"), {
            type: 'pie',
            data: pieData
        });
    }
    draw4();

    //end pie chart

    //start doughnut chart
    var doughnutData = {

        labels: [
            "Info",
            "Default",
            "Primary"
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                "#4FC1E9",
                "#DCDCDC",
                "#428BCA"
            ],
            hoverBackgroundColor: [
                "#4FC1E9",
                "#DCDCDC",
                "#428BCA"
            ]
        }]

    };

    function draw5() {

        var selector6 = '#doughnut-chart';

        $(selector6).attr('width', $(selector6).parent().width());
        var myDoughnut = new Chart($("#doughnut-chart"), {
            type: 'doughnut',
            data: doughnutData
        });
    }
    draw5();

    //end doughnut chart
});
