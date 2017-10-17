"use strict";

$(document).ready(function () {

    var svg1 = dimple.newSvg("#chartContainer1", '100%', '400');
    d3.tsv("chart_data/example_data.tsv", function (data) {
        var myChart = new dimple.chart(svg1, data);
        myChart.setBounds(60, 30, '90%', '330');
        myChart.setMargins(70, 25, 40, 45);
        myChart.defaultColors = [
            new dimple.color("#428bca"),
            new dimple.color("#4fc1e9"),
            new dimple.color("#22d69d"),
            new dimple.color("#ffb65f"),
            new dimple.color("#fb8678")
        ];
        // Define all the axes
        var xAxis = myChart.addMeasureAxis("x", "Distribution");
        var yAxis = myChart.addMeasureAxis("y", "Price");
        var segments = myChart.addMeasureAxis("p", "Unit Sales");
        var size = myChart.addMeasureAxis("z", "Sales Value");
        var ring = myChart.addSeries(["Price Tier", "Channel"], dimple.plot.pie);
        var pie = myChart.addSeries(["Price Tier", "Owner"], dimple.plot.pie);

        // Zoom in the axis bounds
        xAxis.overrideMin = 40;
        xAxis.overrideMax = 70;
        yAxis.overrideMax = 150;

        // Set the maximum radius for the bubbles
        ring.radius = 75;
        pie.radius = 75;

        // Create fixed 10px ring with a 5px
        // margin (negative sizes are calculated inwards)
        ring.innerRadius = "-10px";
        pie.outerRadius = "-15px";

        // Draw averages for the pie and ring
        ring.aggregate = dimple.aggregateMethod.avg;
        pie.aggregate = dimple.aggregateMethod.avg;

        // Animate by date
        myChart.setStoryboard("Date");

        myChart.draw();
        $(window).on('resize', function () {
            myChart.draw();
        });
        $(".sidebar-toggle").on("click", function () {
            myChart.draw();
        });
    });
// Time Bubble Lines Chart

        var svg2 = dimple.newSvg("#chartContainer2", '100%', 400);

    // The default data set for these examples has regular times
    // and the point of this demo is to show the time axis
    // functionality, therefore a small bespoke data set is used.
        var data = [
            {"Shift": "Early", "Date": "12 Jul 2010 10:00", "Value": 1000},
            {"Shift": "Early", "Date": "20 Jul 2010 10:20", "Value": 1200},
            {"Shift": "Early", "Date": "1 Aug 2010 10:40", "Value": 1600},
            {"Shift": "Early", "Date": "8 Aug 2010 10:10", "Value": 1300},
            {"Shift": "Early", "Date": "20 Aug 2010 11:00", "Value": 1900},
            {"Shift": "Early", "Date": "7 Sep 2010 09:50", "Value": 1100},
            {"Shift": "Early", "Date": "13 Sep 2010 10:10", "Value": 1000},
            {"Shift": "Early", "Date": "1 Oct 2010 12:00", "Value": 2000},
            {"Shift": "Early", "Date": "6 Oct 2010 10:10", "Value": 1900},
            {"Shift": "Early", "Date": "19 Oct 2010 11:40", "Value": 1800},
            {"Shift": "Early", "Date": "24 Oct 2010 10:30", "Value": 1200},
            {"Shift": "Early", "Date": "3 Nov 2010 09:30", "Value": 1800},
            {"Shift": "Early", "Date": "12 Nov 2010 10:50", "Value": 1800},
            {"Shift": "Early", "Date": "20 Nov 2010 10:10", "Value": 1900},
            {"Shift": "Early", "Date": "5 Dec 2010 10:50", "Value": 1600},
            {"Shift": "Early", "Date": "9 Dec 2010 12:20", "Value": 1700},
            {"Shift": "Early", "Date": "15 Dec 2010 10:10", "Value": 1400},
            {"Shift": "Early", "Date": "20 Dec 2010 10:00", "Value": 1200},
            {"Shift": "Late", "Date": "11 Jul 2010 16:00", "Value": 2400},
            {"Shift": "Late", "Date": "30 Jul 2010 17:30", "Value": 2000},
            {"Shift": "Late", "Date": "1 Aug 2010 15:40", "Value": 1600},
            {"Shift": "Late", "Date": "5 Aug 2010 13:10", "Value": 1700},
            {"Shift": "Late", "Date": "1 Sep 2010 15:00", "Value": 1900},
            {"Shift": "Late", "Date": "7 Sep 2010 15:50", "Value": 1100},
            {"Shift": "Late", "Date": "13 Sep 2010 14:10", "Value": 1500},
            {"Shift": "Late", "Date": "30 Sep 2010 13:00", "Value": 1000},
            {"Shift": "Late", "Date": "1 Nov 2010 15:50", "Value": 1800},
            {"Shift": "Late", "Date": "24 Nov 2010 15:10", "Value": 1900},
            {"Shift": "Late", "Date": "1 Dec 2010 15:50", "Value": 1600},
            {"Shift": "Late", "Date": "5 Dec 2010 15:20", "Value": 1700},
            {"Shift": "Late", "Date": "13 Dec 2010 15:10", "Value": 1400},
            {"Shift": "Late", "Date": "25 Dec 2010 15:00", "Value": 1200}
        ];

    // Create Separate Date and Time, this allows us to draw them
    // on separate axes.  Despite the time axis only displaying
    // the time portion, the whole date is used so they need to
    // have the same date allocated
        data.forEach(function (d) {
            d["Day"] = d["Date"].substring(0, d["Date"].length - 6);
            d["Time of Day"] =
                "2000-01-01 " + d["Date"].substring(d["Date"].length - 5);
        }, this);

    // Create the chart as usual
        var myChart = new dimple.chart(svg2, data);
        myChart.setBounds(70, 40, '90%', '320');
        myChart.setMargins(70, 10, 40, 45);
        myChart.defaultColors = [
            new dimple.color("#4fc1e9"),
            new dimple.color("#fb8678")
        ];
    // Add the x axis reading dates in the format 01 Jan 2012
    // and displaying them 01 Jan
        var x = myChart.addTimeAxis("x", "Day", "%d %b %Y", "%d %b");

    // Add the y axis reading dates and times but only outputting
    // times.
        var y = myChart.addTimeAxis("y", "Time of Day",
            "%Y-%m-%d %H:%M", "%H:%M");

    // Size the bubbles by volume
        var z = myChart.addMeasureAxis("z", "Value");

    // Setting min and max dates requires them to be set
    // as actual javascript date objects
        x.overrideMin = new Date("2010-06-20");
        x.overrideMax = new Date("2011-01-02");
        y.overrideMin = new Date("01/01/2000 9:00 am");
        y.overrideMax = new Date("01/01/2000 6:00 pm");

    // Show a label for every 4 weeks.
        x.timePeriod = d3.timeWeek;
        x.timeInterval = 4;

    // Control bubble sizes by setting the max and min values
        z.overrideMin = 900;
        z.overrideMax = 3000;

    // Add the bubble series for shift values first so that it is
    // drawn behind the lines
        myChart.addSeries("Shift", dimple.plot.bubble);

    // Add the line series on top of the bubbles.  The bubbles
    // and line points will naturally fall in the same places
        var s = myChart.addSeries("Shift", dimple.plot.line);

    // Add line markers to the line because it looks nice
        s.lineMarkers = true;

    // Show a legend
        myChart.addLegend(180, 10, 360, 20, "right");

    // Draw everything
        myChart.draw();
        $(window).on('resize', function () {
            myChart.draw();
        });
        $(".sidebar-toggle").on("click", function () {
            myChart.draw();
        });
        var index;
        for(var i = 0; i < myChart.series.length; i++){
            if(myChart.series[i].index == 2){
                index = i;
                break;
            }
        }
        //Changes here
        d3.selectAll(".dimple-series-" + index).remove();
        //Changes here
        myChart.series.splice(index, 1);

 // Grouped multi step line chart

  var svg3 = dimple.newSvg("#chartContainer3", '100%', '400');
    d3.tsv("chart_data/example_data.tsv", function (data) {
        data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"]);
        var myChart = new dimple.chart(svg3, data);
        myChart.setBounds(90, 30, '90%', '330');
        myChart.setMargins(70, 10, 100, 45);
        myChart.addMeasureAxis("x", "Unit Sales");
        myChart.defaultColors = [
            new dimple.color("#428bca"),
            new dimple.color("#4fc1e9"),
            new dimple.color("#22d69d"),
            new dimple.color("#ffb65f"),
            new dimple.color("#fb8678"),
            new dimple.color("#dcdcdc")
        ];
        var y = myChart.addCategoryAxis("y", ["Owner", "Month"]);
        y.addGroupOrderRule("Date");
        var s = myChart.addSeries(["Brand"], dimple.plot.line);
        s.interpolation = "step";
        s.barGap = 0.05;
        // myChart.addLegend(510, 20, 500, 300, "left");
        myChart.addLegend("100%", 5, 0, "100%", "right");
        myChart.draw();
        $(window).on('resize', function () {
            myChart.draw();
        });
        $(".sidebar-toggle").on("click", function () {
            myChart.draw();
        });
        var index;
        for(var i = 0; i < myChart.series.length; i++){
            if(myChart.series[i].index == 2){
                index = i;
                break;
            }
        }
        //Changes here
        d3.selectAll(".dimple-series-" + index).remove();
        //Changes here
        myChart.series.splice(index, 1);
    });

// Price Change Chart

    var svg4 = dimple.newSvg("#chartContainer4", '100%', '400');
    d3.tsv("chart_data/example_data.tsv", function (data) {

        // Filter the data for a single channel
        data = dimple.filterData(data, "Channel", "Hypermarkets");

        // Create the chart
        var myChart = new dimple.chart(svg4, data);
        myChart.setBounds(60, 30, '90%', '300');
        myChart.setMargins(70, 25, 100, 45);
        myChart.defaultColors = [
            new dimple.color("#4fc1e9"),
            new dimple.color("#ffb65f"),
            new dimple.color("#fb8678")
        ];

        // Add an x and 2 y-axes.  When using multiple axes it's
        // important to assign them to variables to pass to the series
        var x = myChart.addCategoryAxis("x", "Brand");
        var y1 = myChart.addMeasureAxis("y", "Price");
        var y2 = myChart.addMeasureAxis("y", "Sales Value");

        // Order the x axis by sales value desc
        x.addOrderRule("Sales Value", true);

        // Color the sales bars to be highly transparent
        myChart.assignColor("Sales", "#222222", "#000000", 0.1);

        // Add the bars mapped to the second y axis
        myChart.addSeries("Sales", dimple.plot.bar, [x, y2]);

        // Add series for minimum, average and maximum price
        var min = myChart.addSeries("Min", dimple.plot.bubble, [x, y1]);
        min.aggregate = dimple.aggregateMethod.min;
        var avg = myChart.addSeries("Avg", dimple.plot.bubble, [x, y1]);
        avg.aggregate = dimple.aggregateMethod.avg;
        var max = myChart.addSeries("Max", dimple.plot.bubble, [x, y1]);
        max.aggregate = dimple.aggregateMethod.max;

        // Animate the chart for every date value, any dimension can be passed
        // here and dimple will animate over its values.
        myChart.setStoryboard("Date");

        myChart.draw();
        $(window).on('resize', function () {
            myChart.draw();
        });
        $(".sidebar-toggle").on("click", function () {
            myChart.draw();
        });
        var index;
        for(var i = 0; i < myChart.series.length; i++){
            if(myChart.series[i].index == 2){
                index = i;
                break;
            }
        }
        //Changes here
        d3.selectAll(".dimple-series-" + index).remove();
        //Changes here
        myChart.series.splice(index, 1);
    });

// dynamic line colors chart start
    var dynamiclinesvg = dimple.newSvg("#chartContainer5", '100%', '400');
    d3.tsv("chart_data/example_data.tsv", function (data) {

        // Filter for a single SKU and Channel
        data = dimple.filterData(data, "SKU", "Theta 18 Pack Standard");
        data = dimple.filterData(data, "Channel", "Hypermarkets");

        // Create and Position a Chart
        var mylineChart = new dimple.chart(dynamiclinesvg, data);
        mylineChart.setBounds(60, 30, '90%', '300');
        mylineChart.setMargins(70, 10, 40, 45);
        var x = mylineChart.addCategoryAxis("x", "Month");
        mylineChart.addMeasureAxis("y", "Unit Sales");
        // Order the x axis by date
        x.addOrderRule("Date");

        // Min price will be green, middle price yellow and max red
        mylineChart.addColorAxis("Price", ["#22d69d", "#ffb65f", "#fb8678"]);

        // line thickness and markers options
        var lines = mylineChart.addSeries(null, dimple.plot.line);
        lines.lineWeight = 4;
        lines.lineMarkers = false;

        // Draw the chart
        mylineChart.draw();
        $(window).on('resize', function () {
            mylineChart.draw();
        });
        $(".sidebar-toggle").on("click", function () {
            mylineChart.draw();
        });
        var index;
        for(var i = 0; i < mylineChart.series.length; i++){
            if(mylineChart.series[i].index == 2){
                index = i;
                break;
            }
        }
        //Changes here
        d3.selectAll(".dimple-series-" + index).remove();
        //Changes here
        mylineChart.series.splice(index, 1);

    });
// dynamic line colors chart end
});