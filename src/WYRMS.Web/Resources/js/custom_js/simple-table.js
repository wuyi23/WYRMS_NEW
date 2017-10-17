"use strict";

$(document).ready(function () {

    var my_table = $("#mytable");
    my_table.find("#checkall").click(function () {
        if (my_table.find("#checkall").is(':checked')) {
            my_table.find("input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });
        } else {
            my_table.find("input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
        }
    });
    //removing/hiding panel1
    $('.removepanel1').on('click', function () {
        $('.hidepanel1').hide();
    });
    //removing/hiding panel2
    $('.removepanel2').on('click', function () {
        $('.hidepanel2').hide();
    });
    //removing/hiding panel3
    $('.removepanel3').on('click', function () {
        $('.hidepanel3').hide();
    });
    //removing/hiding panel3
    $('.removepanel4').on('click', function () {
        $('.hidepanel4').hide();
    });
    //removing/hiding panel3
    $('.removepanel5').on('click', function () {
        $('.hidepanel5').hide();
    });
    //starts hiding three panel contents
    $('.showhide').attr('Title', 'Hide Panel content');

    $(document).on('click', '.panel-heading span.clickable', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            $('.showhide').attr('Title', 'Show Panel content');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
            $('.showhide').attr('Title', 'Hide Panel content');
        }
    });
    //Ends Hiding Three Panel Contents

});