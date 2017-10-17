"use strict";

$(document).ready(function () {
    $('#date-range0').dateRangePicker({autoClose: true});
    $(".content").find('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });

    function adddays(noofdays) {
        return (noofdays * 24 * 60 * 60 * 1000);
    }

    var eventarr = [{
        "id": "293",
        "title": "Team Out",
        "url": "http://lorvent.com/",
        "class": "event-important",
        "start": Date.now(),
        "end": Date.now() + adddays(1)
    }, {
        "id": "276",
        "title": "Product Seminar",
        "url": "404.html",
        "class": "event-success",
        "start": Date.now() + adddays(3),
        "end": Date.now() + adddays(5)
    }, {
        "id": "277",
        "title": "Client Meeting",
        "url": "http://lorvent.com/",
        "class": "event-info",
        "start": Date.now() + adddays(2),
        "end": Date.now() + adddays(4)
    }, {
        "id": "278",
        "title": "Anniversary Celebrations",
        "url": "http://lorvent.com/",
        "class": "event-primary",
        "start": Date.now() + adddays(2),
        "end": Date.now() + adddays(4)
    }, {
        "id": "279",
        "title": "Product Delivery",
        "url": "http://lorvent.com/",
        "class": "event-info",
        "start": Date.now() + adddays(-5),
        "end": Date.now() + adddays(-3)
    }, {
        "id": "280",
        "title": "Some Event",
        "url": "404.html",
        "class": "event-warning",
        "start": Date.now() + adddays(-4),
        "end": Date.now() + adddays(-2)
    }];
    var today = moment().format("YYYY-MM-DD");
    (function ($) {
        "use strict";
        var options = {
            events_source: eventarr,
            view: 'month',
            tmpl_path: 'vendors/bootstrap-calendar/tmpls/',
            tmpl_cache: true,
            day: today,
            onAfterEventsLoad: function (events) {
                if (!events) {
                    return;
                }
                var list = $('#eventlist');
                list.html('');

                $.each(events, function (key, val) {
                    var eventclass = val.class.split("-")[1];
                    if (eventclass == "important") {
                        eventclass = "danger";
                    }
                    $(document.createElement('li'))
                        .html('<a href="' + val.url + '" class="text-' + eventclass + '">' + val.title + '<span class="pull-right delete_event" Title="Remove"><i class="fa fa-times showbtns" aria-hidden="true"></i></span></a>')
                        .appendTo(list);
                });
            },
            onAfterViewLoad: function (view) {
                $('.page-header h3').text(this.getTitle());
                $('.btn-group button').removeClass('active');
                $('button[data-calendar-view="' + view + '"]').addClass('active');
            },
            classes: {
                months: {
                    general: 'label'
                }
            }
        };

        var calendar = $('#calendar').calendar(options);
        $("#active").find(".badge1").text(eventarr.length);
        $("#add-new-event").on("click", function () {
            var values = $(this).closest(".modal-content");
            if (values.find("#new-event").val() == "" || values.find("#date-range0").val() == "") {
                alert("Event or Event Date Should not be empty");
            } else {
                var random_id = Math.floor(Math.random() * 1111);
                var startday = moment(values.find("#date-range0").val().split(" ")[0]);
                var endday = moment(values.find("#date-range0").val().split(" ")[2]);
                var evturl = "http://" + values.find("#event_url").val();
                if (evturl == 'http://') {
                    evturl = "#";
                }
                var newevent = {
                    id: random_id,
                    title: values.find("#new-event").val(),
                    url: evturl,
                    class: values.find('#eventclass').val(),
                    start: Date.now() + adddays(startday.diff(today, "days")),
                    end: Date.now() + adddays(endday.diff(today, "days"))
                };
                eventarr.push(newevent);
                $("#myModal").modal("hide");
            }
            calendar.setOptions({events_source: eventarr});
            $("#active").find(".badge1").text(eventarr.length);
            calendar.view();
        });
        $('#eventlist').on("click", ".delete_event", function (e) {
            e.preventDefault();
            for (var i = 0; i < eventarr.length; i++) {
                if (eventarr[i].title == $(this).closest("a").text()) {
                    eventarr.splice(i, 1);
                }
            }
            calendar.setOptions({events_source: eventarr});
            $("#active").find(".badge1").text(eventarr.length);
            calendar.view();
        });

        $('.btn-group button[data-calendar-nav]').each(function () {
            var $this = $(this);
            $this.click(function () {
                calendar.navigate($this.data('calendar-nav'));
            });
        });

        $('.btn-group button[data-calendar-view]').each(function () {
            var $this = $(this);
            $this.click(function () {
                calendar.view($this.data('calendar-view'));
            });
        });

        $('#first_day').on('change', function () {
            var value = $(this).val();
            value = value.length ? parseInt(value) : null;
            calendar.setOptions({first_day: value});
            calendar.view();
        });

        $('#language').on('change', function () {
            $(".cal-lang").remove();
            if ($(this).val() != '') {
                $("body").append("<script class='cal-lang' src='vendors/bootstrap-calendar/js/language/" + $(this).val() + ".js'></scirpt>");
            }
            calendar.setLanguage($(this).val());
            calendar.view();
        });

        $('#events-in-modal').on("ifChanged", function () {
            var val = $(this).is(':checked') ? $(this).val() : null;
            calendar.setOptions({modal: val});
        });
        $('#format-12-hours').on("ifChanged", function () {
            var val = $(this).is(':checked') ? true : false;
            calendar.setOptions({format12: val});
            calendar.view();
        });
        $('#show_wbn').on("ifChanged", function () {
            var val = $(this).is(':checked') ? true : false;
            calendar.setOptions({display_week_numbers: val});
            calendar.view();
        });
        $('#show_wb').on("ifChanged", function () {
            var val = $(this).is(':checked') ? true : false;
            calendar.setOptions({weekbox: val});
            calendar.view();
        });
        $("body").on("hide.bs.modal", function () {
            $("#eventform").find("[type='reset']").click();
        });
    }(jQuery));

    $('#eventlist').slimScroll({
        color: '#A9B6BC',
        height: '219px',
        size: '5px'
    });
});