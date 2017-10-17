"use strict";

$(document).ready(function () {
    $('#basic_modal').on('hide.bs.modal', function() {
        $("#basic_modal").removeClass().addClass("modal fade animated rollOut");
    }).on('hidden.bs.modal', function() {
        $("#basic_modal").removeClass().addClass("modal fade animated");
    });
    $("[data-animate-modal]").on('click', function() {
        $("#basic_modal").addClass($(this).attr("data-animate-modal"));
    });
    //========color of modals=======
    $(".modalcolor").on("click", function() {
        $("#color_modal").find('.modal-header').css("background-color", $(this).attr("data-modalcolor"));
    });
});