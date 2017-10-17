"use strict";

$(document).ready(function() {
    $("#sortable_portlets").find('.sortable').sortable({
        connectWith: "#sortable_portlets .sortable",
        items: ".portlet",
        cancel: ".notsort",
        opacity: 0.8,
        placeholder: 'portlet-placeholder ui-corner-all',
        forcePlaceholderSize: true,
        tolerance: "pointer"
    });
});
