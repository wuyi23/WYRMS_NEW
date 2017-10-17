"use strict";

jQuery.fn.outerHTML = function() {
    return jQuery('<div />').append(this.eq(0).clone()).html();
};
$(document).ready(function() {

    $(".fa-icon").each(function() {
        $(this).find("i").after("<br />");
    });
    $(".iconoptions button").on("click", function() {
        if (!$(this).hasClass("active")) {
            toastr.info('Changes Made, Hover on any icon to see effect');
        }
        $(".iconoptions").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    $(".fa-icon").hover(function() {
        if ($(".iconoptions").find('.active').attr("data-faclass") != undefined) {
            $(this).find("i").toggleClass($(".iconoptions .active").attr("data-faclass"));
        }
    }).on("click", function() {
        var x = $(this).find("i").outerHTML();
        copyTextToClipboard(x);
    });
    $('#icon-search').on("input", function() {
        $(".fa-icon").each(function() {
            var regex = new RegExp($("#icon-search").val().trim().toLowerCase());
            var x = $(this).clone().children().remove().end().text();
            var res = x.match(regex, "i");
            if (res == null) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
    var icon_size = $("#icon-size");
    icon_size.on("input", function() {
        var x = parseInt(icon_size.val()) + parseInt(6);
        $(".fontnormal").html(".fa-icon i{font-size:" + icon_size.val() + "px;}.fa-icon:hover i{font-size:" + x + "px;}");
        $(".icon-sizeshow").text(icon_size.val() + "px");
    });
    $("head").append("<style class='fontnormal'></style>");
});

function copyTextToClipboard(text) {
    "use strict";
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea).select();
    var successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    toastr.success('Element Copied to Clipboard. Now you can use it anywhere.');
}
$(".iconoption_toggle").on("click", function() {
    "use strict";
    $(this).toggleClass("right_175");
    $(this).find("i").toggleClass("fa-flip-horizontal");
    $(".iconoptions").toggleClass("right_0");
});
