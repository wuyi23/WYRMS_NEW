"use strict";

$(document).ready(function() {

    /* popover panel js */
    $("[data-toggle='popover']").popover();

    /* tooltops panel js */
    $(".tooltip-examples a").tooltip({
        placement: 'top'
    });

    /* popover panel fifa js */
    $('.po-markup > .po-link').popover({
        trigger: 'hover',

        html: true, // must have if HTML is contained in popover
        // get the Title and conent
        title: function() {
            return $(this).parent().find('.po-Title').html();
        },
        content: function() {
            return $(this).parent().find('.po-body').html();
        },
        container: 'body',
        placement: 'right'
    });

    /* toolbars panel js */
    $("#user-options1").find('a').on('click', function() {
        var $this = $(this);
        var $button = $('div[data-toolbar="user-options1"]');
        var $newClass = $this.find('i').attr('class').substring(3);
        var $oldClass = $button.find('i').attr('class').substring(3);
        if ($newClass != $oldClass) {
            $button.find('i').animate({
                top: "+=50",
                opacity: 0
            }, 200, function() {
                $(this).removeClass($oldClass).addClass($newClass).css({ top: "-=100", opacity: 1 }).animate({
                    top: "+=50"
                });
            });
        }
    });
    $('div[data-toolbar="user-options1"]').toolbar({
        content: '#user-options1',
        position: 'top'
    });
    $('div[data-toolbar="user-options"]').toolbar({
        content: '#user-options',
        position: 'top'
    });
    $('div[data-toolbar="set-01"]').toolbar({
        content: '#set-01',
        position: 'top'
    });
    $('div[data-toolbar="set-02"]').toolbar({
        content: '#set-02',
        position: 'top'
    });
    $('div[data-toolbar="set-03"]').toolbar({
        content: '#set-03',
        position: 'top'
    });
    $('div[data-toolbar="set-04"]').toolbar({
        content: '#set-04',
        position: 'top'
    });
    $('div[data-toolbar="transport-options-o"]').toolbar({
        content: '#transport-options-o',
        position: 'top'
    });
    /* customized */
    $('div[data-toolbar="user-options-b"]').toolbar({
        content: '#user-options-b',
        position: 'top',
        event: 'click'
    });
    $('div[data-toolbar="set-a"]').toolbar({
        content: '#set-a',
        position: 'top'
    });
    $('div[data-toolbar="set-c"]').toolbar({
        content: '#set-c',
        position: 'left'
    });
    $('div[data-toolbar="set-e"]').toolbar({
        content: '#set-e',
        position: 'right'
    });
    $('div[data-toolbar="set-f"]').toolbar({
        content: '#set-f',
        position: 'top'
    });
    $('div[data-toolbar="transport-options-d"]').toolbar({
        content: '#transport-options-d',
        position: 'bottom'
    });

});
