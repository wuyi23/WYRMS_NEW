"use strict";

$(document).ready(function () {
    $("#add_row").find('i').on('click', function () {
        $("#customtable").find('tbody').append('<tr><td contenteditable></td> <td contenteditable></td> <td class="text-center" contenteditable></td> <td></td> <td class="text-right" contenteditable></td> <td class="row_delete text-center"><i class="fa fa-fw fa-times"></i></td> </tr>');
        $("tbody tr:last-child td:first-child").focus();
    });
    $("#customtable").on("click", ".row_delete i", function () {
        $(this).closest("tr").remove();
    });
});
