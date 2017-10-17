"use strict";

$(document).ready(function() {

    $('#table1').DataTable({
        "scrollX": true
    });
    $('#table2').DataTable({
        "dom": '<"m-t-10 pull-left"l><"m-t-10 pull-right"f>rt<"pull-left m-t-10"i><"m-t-10 pull-right"p>'
    });
    $('#table3').DataTable({
        "dom": '<"pull-left m-t-10"f><"pull-right  m-t-10"i><"clearfix m-t-10"><"pull-left m-t-10"l><"pull-right m-t-10"p>rt<"pull-left m-t-10"l><"pull-right m-t-10"p><"clearfix m-t-10"><"pull-left m-t-10"f><"pull-right m-t-10"i>'
    });
    $('#table4').DataTable({
        mark: true
    });
    window.onload = function() {
        $(function() {
            var inputMapper = {
                "name": 1,
                "position": 2,
                "office": 3,
                "age": 4
            };
            var dtInstance = $("#table5").DataTable({
                "lengthMenu": [10, 25, 50, "ALL"],
                bLengthChange: false,
                mark: true
            });
            $("input").on("input", function() {
                var $this = $(this);
                var val = $this.val();
                var key = $this.attr("name");
                dtInstance.columns(inputMapper[key] - 1).search(val).draw();
            });
        });
    }
});
