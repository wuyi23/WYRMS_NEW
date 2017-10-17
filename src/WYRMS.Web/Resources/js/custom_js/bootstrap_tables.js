
"use strict";

$(document).ready(function() {
    $('#table1').editableTableWidget();
    $(".table-responsive input").attr("maxlength", '30');
    $('#table4').bootstrapTable();
});

function detailFormatter(index, row) {
    var html = [];
    $.each(row, function(key, value) {
        if (key.substr(0, 1) != "_") {
            html.push('<p><b>' + key + ':</b> ' + value + '</p>');
        }
    });
    return html.join('');
}
(function($) {
    var sprintf = $.fn.bootstrapTable.utils.sprintf;
    var TYPE_NAME = {
        json: 'JSON',
        xml: 'XML',
        csv: 'CSV',
        txt: 'TXT',
        sql: 'SQL',
        excel: 'MS-Excel'
    };
    $.extend($.fn.bootstrapTable.defaults, {
        exportDataType: 'basic',
        exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel']
    });
    $.extend($.fn.bootstrapTable.defaults.icons, {
        export: 'glyphicon-export icon-share'
    });
    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initToolbar = BootstrapTable.prototype.initToolbar;
    BootstrapTable.prototype.initToolbar = function() {
        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));
        if (this.options.showExport) {
            var that = this,
                $btnGroup = this.$toolbar.find('>.btn-group'),
                $export = $btnGroup.find('div.export');
            if (!$export.length) {
                $export = $([
                    '<div class="export btn-group">',
                    '<button class="btn' +
                    sprintf(' btn-%s', this.options.buttonsClass) +
                    sprintf(' btn-%s', this.options.iconSize) +
                    ' dropdown-toggle" ' +
                    'Title="Export data"' +
                    'data-toggle="dropdown" type="button">',
                    sprintf('<i class="%s %s"></i> ', this.options.iconsPrefix, this.options.icons.export),
                    '<span class="caret"></span>',
                    '</button>',
                    '<ul class="dropdown-menu" role="menu">',
                    '</ul>',
                    '</div>'
                ].join('')).appendTo($btnGroup);
                var $menu = $export.find('.dropdown-menu'),
                    exportTypes = this.options.exportTypes;
                if (typeof this.options.exportTypes === 'string') {
                    var types = this.options.exportTypes.slice(1, -1).replace(/ /g, '').split(',');
                    exportTypes = [];
                    $.each(types, function(i, value) {
                        exportTypes.push(value.slice(1, -1));
                    });
                }
                $.each(exportTypes, function(i, type) {
                    if (TYPE_NAME.hasOwnProperty(type)) {
                        $menu.append(['<li data-type="' + type + '">',
                            '<a href="javascript:void(0)">',
                            TYPE_NAME[type],
                            '</a>',
                            '</li>'
                        ].join(''));
                    }
                });
                $menu.find('li').on('click', function() {
                    var type = $(this).data('type');
                  function doExport() {
                        that.$el.tableExport({
                            type: type,
                            escape: false
                        });
                    }
                    if (that.options.pagination) {                        
                        that.$el.one(that.options.sidePagination === 'server' ? 'post-body.bs.table' : 'page-change.bs.table', function() {
                            doExport();
                            that.togglePagination();
                        });
                        that.togglePagination();
                    }else {
                        doExport();
                    }
                });
            }
        }
    };
})(jQuery);