"use strict";

$(document).ready(function () {
    var chart1 = AmCharts.makeChart("chart1", {
        "type": "serial",
        "addClassNames": true,
        "theme": "light",
        "autoMargins": false,
        "marginLeft": 30,
        "marginRight": 8,
        "marginTop": 10,
        "marginBottom": 26,
        "balloon": {
            "adjustBorderColor": false,
            "horizontalPadding": 10,
            "verticalPadding": 8,
            "color": "#ffffff"
        },

        "dataProvider": [{
            "year": 2009,
            "income": 23.5,
            "expenses": 21.1,
            "color": "#4fc1e9"
        }, {
            "year": 2010,
            "income": 26.2,
            "expenses": 30.5,
            "color": "#4fc1e9"
        }, {
            "year": 2011,
            "income": 30.1,
            "expenses": 34.9,
            "color": "#4fc1e9"
        }, {
            "year": 2012,
            "income": 29.5,
            "expenses": 31.1,
            "color": "#4fc1e9"
        }, {
            "year": 2013,
            "income": 30.6,
            "expenses": 28.2,
            "dashLengthLine": 5,
            "color": "#4fc1e9"
        }, {
            "year": 2014,
            "income": 34.1,
            "expenses": 32.9,
            "dashLengthColumn": 5,
            "alpha": 0.2,
            "additional": "(projection)",
            "color": "#4fc1e9"
        }],
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
            "alphaField": "alpha",
            "balloonText": "<span style='font-size:12px;'>[[Title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
            "fillAlphas": 1,
            "colorField": "color",
            "title": "Income",
            "fillColors": "#ff0000",
            "type": "column",
            "valueField": "income",
            "dashLengthField": "dashLengthColumn"
        }, {
            "id": "graph2",
            "balloonText": "<span style='font-size:12px;'>[[Title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
            "bullet": "round",
            "lineThickness": 3,
            "bulletSize": 7,
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "fillColors": "#ff0000",
            "useLineColorForBulletBorder": true,
            "bulletBorderThickness": 3,
            "fillAlphas": 0,
            "lineAlpha": 1,
            "title": "Expenses",
            "valueField": "expenses",
            "dashLengthField": "dashLengthLine"
        }],
        "categoryField": "year",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "tickLength": 0
        },
        "export": {
            "enabled": false
        }
    });

    // 3d stacked column chart

    var chart2 = AmCharts.makeChart("chart2", {
        "theme": "light",
        "type": "serial",
        "dataProvider": [{
            "country": "USA",
            "year2004": 3.5,
            "year2005": 4.2
        }, {
            "country": "UK",
            "year2004": 1.7,
            "year2005": 3.1
        }, {
            "country": "Canada",
            "year2004": 2.8,
            "year2005": 2.9
        }, {
            "country": "Japan",
            "year2004": 2.6,
            "year2005": 2.3
        }, {
            "country": "France",
            "year2004": 1.4,
            "year2005": 2.1
        }, {
            "country": "Brazil",
            "year2004": 2.6,
            "year2005": 4.9
        }, {
            "country": "Russia",
            "year2004": 6.4,
            "year2005": 7.2
        }, {
            "country": "India",
            "year2004": 8,
            "year2005": 7.1
        }, {
            "country": "China",
            "year2004": 9.9,
            "year2005": 10.1
        }],
        "valueAxes": [{
            "stackType": "3d",
            "unit": "%",
            "position": "left",
            "title": "GDP growth rate"
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "GDP grow in [[category]] (2004): <b>[[value]]</b>",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "title": "2004",
            "type": "column",
            "fillColors": "#428bca",
            "valueField": "year2004"
        }, {
            "balloonText": "GDP grow in [[category]] (2005): <b>[[value]]</b>",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "title": "2005",
            "type": "column",
            "fillColors": "#fb8678",
            "valueField": "year2005"
        }],
        "plotAreaFillAlphas": 0.1,
        "depth3D": 60,
        "angle": 30,
        "categoryField": "country",
        "categoryAxis": {
            "gridPosition": "start"
        },
        "export": {
            "enabled": false
        }
    });
    jQuery('.chart-input').off().on('input change', function() {
        var property = jQuery(this).data('property');
        var target = chart2;
        chart2.startDuration = 0;

        if (property == 'topRadius') {
            target = chart2.graphs[0];
            if (this.value == 0) {
                this.value = undefined;
            }
        }

        target[property] = this.value;
        chart2.validateNow();
    });

    // Column chart with images on top chart

    var chart3 = AmCharts.makeChart("chart3", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [{
            "name": "Firefox",
            "points": 35654,
            "color": "#4fc1e9",
            "bullet": "img/firefox.png"
        }, {
            "name": "Safari",
            "points": 65456,
            "color": "#ffb65f",
            "bullet": "img/safari.png"
        }, {
            "name": "Chrome",
            "points": 45724,
            "color": "#fb8678",
            "bullet": "img/chrome.png"
        }, {
            "name": "Opera",
            "points": 13654,
            "color": "#428bca",
            "bullet": "img/opera.png"
        }],
        "valueAxes": [{
            "maximum": 80000,
            "minimum": 0,
            "axisAlpha": 0,
            "dashLength": 4,
            "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
            "bulletOffset": 10,
            "bulletSize": 52,
            "colorField": "color",
            "cornerRadiusTop": 8,
            "customBulletField": "bullet",
            "fillAlphas": 0.8,
            "lineAlpha": 0,
            "type": "column",
            "valueField": "points"
        }],
        "marginTop": 0,
        "marginRight": 0,
        "marginLeft": 0,
        "marginBottom": 0,
        "autoMargins": false,
        "categoryField": "name",
        "categoryAxis": {
            "axisAlpha": 0,
            "gridAlpha": 0,
            "inside": true,
            "tickLength": 0
        },
        "export": {
            "enabled": false
        }
    });
    // Duration on value axis
    var chart4 = AmCharts.makeChart("chart4", {
        "type": "serial",
        "theme": "light",
        "legend": {
            "equalWidths": false,
            "useGraphSettings": true,
            "valueAlign": "left",
            "valueWidth": 120
        },
        "dataProvider": [{
            "date": "2012-01-01",
            "distance": 227,
            "townName": "New York",
            "townName2": "New York",
            "townSize": 25,
            "latitude": 40.71,
            "duration": 408
        }, {
            "date": "2012-01-02",
            "distance": 371,
            "townName": "Washington",
            "townSize": 14,
            "latitude": 38.89,
            "duration": 482
        }, {
            "date": "2012-01-03",
            "distance": 433,
            "townName": "Wilmington",
            "townSize": 6,
            "latitude": 34.22,
            "duration": 562
        }, {
            "date": "2012-01-04",
            "distance": 345,
            "townName": "Jacksonville",
            "townSize": 7,
            "latitude": 30.35,
            "duration": 379
        }, {
            "date": "2012-01-05",
            "distance": 480,
            "townName": "Miami",
            "townName2": "Miami",
            "townSize": 10,
            "latitude": 25.83,
            "duration": 501
        }, {
            "date": "2012-01-06",
            "distance": 386,
            "townName": "Tallahassee",
            "townSize": 7,
            "latitude": 30.46,
            "duration": 443
        }, {
            "date": "2012-01-07",
            "distance": 348,
            "townName": "New Orleans",
            "townSize": 10,
            "latitude": 29.94,
            "duration": 405
        }, {
            "date": "2012-01-08",
            "distance": 238,
            "townName": "Houston",
            "townName2": "Houston",
            "townSize": 16,
            "latitude": 29.76,
            "duration": 309
        }, {
            "date": "2012-01-09",
            "distance": 218,
            "townName": "Dalas",
            "townSize": 17,
            "latitude": 32.8,
            "duration": 287
        }, {
            "date": "2012-01-10",
            "distance": 349,
            "townName": "Oklahoma City",
            "townSize": 11,
            "latitude": 35.49,
            "duration": 485
        }, {
            "date": "2012-01-11",
            "distance": 603,
            "townName": "Kansas City",
            "townSize": 10,
            "latitude": 39.1,
            "duration": 890
        }, {
            "date": "2012-01-12",
            "distance": 534,
            "townName": "Denver",
            "townName2": "Denver",
            "townSize": 18,
            "latitude": 39.74,
            "duration": 810
        }, {
            "date": "2012-01-13",
            "townName": "Salt Lake City",
            "townSize": 12,
            "distance": 425,
            "duration": 670,
            "latitude": 40.75,
            "dashLength": 8,
            "alpha": 0.4
        }, {
            "date": "2012-01-14",
            "latitude": 36.1,
            "duration": 470,
            "townName": "Las Vegas",
            "townName2": "Las Vegas"
        }, {
            "date": "2012-01-15"
        }, {
            "date": "2012-01-16"
        }, {
            "date": "2012-01-17"
        }, {
            "date": "2012-01-18"
        }, {
            "date": "2012-01-19"
        }],
        "valueAxes": [{
            "id": "distanceAxis",
            "axisAlpha": 0,
            "gridAlpha": 0,
            "position": "left",
            "title": "distance"
        }, {
            "id": "latitudeAxis",
            "axisAlpha": 0,
            "gridAlpha": 0,
            "labelsEnabled": false,
            "position": "right"
        }, {
            "id": "durationAxis",
            "duration": "mm",
            "durationUnits": {
                "hh": "h ",
                "mm": "min"
            },
            "axisAlpha": 0,
            "gridAlpha": 0,
            "inside": true,
            "position": "right",
            "title": "duration"
        }],
        "graphs": [{
            "alphaField": "alpha",
            "balloonText": "[[value]] miles",
            "dashLengthField": "dashLength",
            "fillAlphas": 0.7,
            "legendPeriodValueText": "total: [[value.sum]] mi",
            "legendValueText": "[[value]] mi",
            "title": "distance",
            "type": "column",
            "valueField": "distance",
            "valueAxis": "distanceAxis",
            "fillColors": "#ffb65f"
        }, {
            "balloonText": "latitude:[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "useLineColorForBulletBorder": true,
            "bulletColor": "#FFFFFF",
            "bulletSizeField": "townSize",
            "dashLengthField": "dashLength",
            "descriptionField": "townName",
            "labelPosition": "right",
            "labelText": "[[townName2]]",
            "legendValueText": "[[value]]/[[description]]",
            "title": "latitude/city",
            "fillAlphas": 0,
            "valueField": "latitude",
            "valueAxis": "latitudeAxis"
        }, {
            "bullet": "square",
            "bulletBorderAlpha": 1,
            "bulletBorderThickness": 1,
            "dashLengthField": "dashLength",
            "legendValueText": "[[value]]",
            "title": "duration",
            "fillAlphas": 0,
            "valueField": "duration",
            "valueAxis": "durationAxis"
        }],
        "chartCursor": {
            "categoryBalloonDateFormat": "DD",
            "cursorAlpha": 0.1,
            "cursorColor": "#000000",
            "fullWidth": true,
            "valueBalloonsEnabled": false,
            "zoomable": false
        },
        "dataDateFormat": "YYYY-MM-DD",
        "categoryField": "date",
        "categoryAxis": {
            "dateFormats": [{
                "period": "DD",
                "format": "DD"
            }, {
                "period": "WW",
                "format": "MMM DD"
            }, {
                "period": "MM",
                "format": "MMM"
            }, {
                "period": "YYYY",
                "format": "YYYY"
            }],
            "parseDates": true,
            "autoGridCount": true,
            "axisColor": "#555555",
            "gridAlpha": 0.1,
            "gridColor": "#FFFFFF"
        },
        "export": {
            "enabled": false
        }
    });

    // Reversed Value Axis chart
    var chart5 = AmCharts.makeChart("chart5", {
        "type": "serial",
        "theme": "light",
        "legend": {
            "useGraphSettings": true
        },
        "dataProvider": [{
            "year": 1930,
            "italy": 1,
            "germany": 5,
            "uk": 3
        }, {
            "year": 1934,
            "italy": 1,
            "germany": 2,
            "uk": 6
        }, {
            "year": 1938,
            "italy": 2,
            "germany": 3,
            "uk": 1
        }, {
            "year": 1950,
            "italy": 3,
            "germany": 4,
            "uk": 1
        }, {
            "year": 1954,
            "italy": 5,
            "germany": 1,
            "uk": 2
        }, {
            "year": 1958,
            "italy": 3,
            "germany": 2,
            "uk": 1
        }, {
            "year": 1962,
            "italy": 1,
            "germany": 2,
            "uk": 3
        }, {
            "year": 1966,
            "italy": 2,
            "germany": 1,
            "uk": 5
        }, {
            "year": 1970,
            "italy": 3,
            "germany": 5,
            "uk": 2
        }, {
            "year": 1974,
            "italy": 4,
            "germany": 3,
            "uk": 6
        }, {
            "year": 1978,
            "italy": 1,
            "germany": 2,
            "uk": 4
        }],
        "valueAxes": [{
            "integersOnly": true,
            "maximum": 6,
            "minimum": 1,
            "reversed": true,
            "axisAlpha": 0,
            "dashLength": 5,
            "gridCount": 10,
            "position": "left",
            "title": "Place taken"
        }],
        "startDuration": 0.5,
        "graphs": [{
            "balloonText": "place taken by Italy in [[category]]: [[value]]",
            "bullet": "round",
            "hidden": true,
            "title": "Italy",
            "valueField": "italy",
            "fillAlphas": 0
        }, {
            "balloonText": "place taken by Germany in [[category]]: [[value]]",
            "bullet": "round",
            "title": "Germany",
            "valueField": "germany",
            "fillAlphas": 0
        }, {
            "balloonText": "place taken by UK in [[category]]: [[value]]",
            "bullet": "round",
            "title": "United Kingdom",
            "valueField": "uk",
            "fillAlphas": 0
        }],
        "chartCursor": {
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "year",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "fillAlpha": 0.5,
            "fillColor": "#fb8678",
            "gridAlpha": 0,
            "position": "top"
        },
        "export": {
            "enabled": false,
            "position": "bottom-right"
        }
    });

});
