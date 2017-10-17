"use strict";
$(document).ready(function () {
    //table tools example
    var table = $('#table1').DataTable({
        // dom: 'Bflrtip',
        "dom": '<"m-t-10"B><"m-t-10 pull-left"f><"m-t-10 pull-right"l>rt<"pull-left m-t-10"i><"m-t-10 pull-right"p>',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    //re-order columns
    var table2 = $('#table2').dataTable({
        "dom": '<"m-t-10 pull-left"l><"m-t-10 pull-right"f>rt<"pull-left m-t-10"i><"m-t-10 pull-right"p>',
    });

    new $.fn.dataTable.ColReorder(table2);


    // add row, delete row example
    var table3 = $('#table3').DataTable({
        "order": [
            [0, "desc"]
        ],
        "dom": '<"m-t-10 pull-left"l><"m-t-10 pull-right"f>rt<"pull-left m-t-10"i><"m-t-10 pull-right"p>',
    });
    //total number of existing rows
    var counter = 18;


    //row addition code
    $('#addButton').on('click', function () {
        table3.row.add([
            counter,
            counter + ' new',
            counter + ' user',
            counter + '_unique_user',
            counter + '_unique_user@domain.com'
        ]).draw();

        counter++;
    });

    //row deletion code

    $('#table3').find('tbody').on('click', 'tr', function () {
        if ($(this).hasClass('danger')) {
            $(this).removeClass('danger');
        } else {
            table3.$('tr.danger').removeClass('danger');
            $(this).addClass('danger');
        }
    });

    $('#delButton').on('click', function () {
        if (!$("#table3 tr").hasClass('danger')) {
            alert('please select a row first');
            //exit;
        }
        table3.row('.danger').remove().draw(false);
    });

});