"use strict";

$(document).ready(function () {

    $('#icon-search').on("input", function () {
        $(".bs-glyphicons").find(".glyphicon-class").each(function () {
            var regex = new RegExp($("#icon-search").val().trim().toLowerCase());
            var x = $(this).text();
            var res = x.match(regex, "i");
            if (res == null) {
                $(this).closest("li").hide();
            } else {
                $(this).closest("li").show();
            }
        });
    });
    jQuery.fn.outerHTML = function () {
        return jQuery('<div />').append(this.eq(0).clone()).html();
    };
    var icon_size = $("#icon-size");
    icon_size.on("input", function () {
        var x = parseInt(icon_size.val()) + parseInt(6);
        $(".fontnormal").html(".bs-glyphicons .glyphicon{font-size:" + icon_size.val() + "px;}.bs-glyphicons>li:hover>.glyphicon{font-size:" + x + "px;}");
        $(".icon-sizeshow").text(icon_size.val() + "px");
    });
    $("head").append("<style class='fontnormal'></style>");
    $(".bs-glyphicons>li").on("click", function () {
        var x = $(this).find(".glyphicon").outerHTML();
        copyTextToClipboard(x);
    });

    function copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea).select();
        var successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        toastr.success('Element Copied to Clipboard. Now you can use it anywhere.');
    }
});