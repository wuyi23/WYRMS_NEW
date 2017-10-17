$(document).ready(function () {
    "use strict";

//leftmenu init
    $(function () {
        $('.menu-dropdown>a').off("click");
        $('.menu-dropdown>a').on("click", function (e) {
            e.preventDefault();
        });
    });

    $("#menu>ul>.menu-dropdown").hover(function () {
        var sideoffset = $(".sidebar").offset();
        var submenuoffset = $(this).children("ul").offset();
        if (sideoffset.top + $(".sidebar").height() < submenuoffset.top + $(this).children("ul").height()) {
            $(this).children("ul").addClass("sidebarbottom");
        }
    });
    $("#menu .menu-dropdown > ul").each(function () {
        if ($(this).height() <= 400) {
            $(this).css('overflow-y', 'auto');
        }
    });
    $(".fixedchaticon").on("click", function (e) {
        e.preventDefault();
        $(".fixedchatdiv").toggleClass("showchat");
    });
    $(document).click(function (e) {
        var container = $(".fixedchatdiv,.fixedchaticon");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass("showchat");
        }
    });
    $('.navbar-nav').on('click', function()
    {
        $(".fixedchatdiv").removeClass("showchat");
    });
    //slim scroll for right side bar
    $('#slim-scroll').slimscroll({
        height: '290px',
        size: '2px',
        color: '#82c2e0',
        opacity: 1
    });
});