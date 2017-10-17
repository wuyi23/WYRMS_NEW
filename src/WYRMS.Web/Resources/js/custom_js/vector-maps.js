'use strict';

$(document).ready(function() {

    $('#vmapworld').vectorMap({
        map: 'world_en',
        backgroundColor: 'rgba(204,204,204,0.4)',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#22bc9d','#1baa7d'],
        normalizeFunction: 'polynomial'
    });
    $('#vmaprussia').vectorMap({
        map: 'russia_en',
        backgroundColor: 'rgba(204,204,204,0.4)',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#428bca','#3071a9'],
        normalizeFunction: 'polynomial'
    });
    $('#vmapgermany').vectorMap({
        map: 'germany_en',
        backgroundColor: 'rgba(204,204,204,0.4)',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#fb8678', '#fa5a46'],
        normalizeFunction: 'polynomial'
    });
    $('#vmapeurope').vectorMap({
        map: 'europe_en',
        backgroundColor: 'rgba(204,204,204,0.4)',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#ffb65f','#ff9f2c'],
        normalizeFunction: 'polynomial'
    });
    $('#vmapnamerica').vectorMap({
        map: 'north-america_en',
        backgroundColor: 'rgba(204,204,204,0.4)',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#4fc1e9','#22b1e3'],
        normalizeFunction: 'polynomial'
    });
    $('#vmapasian').vectorMap({
        map: 'asia_en',
        backgroundColor: 'rgba(204,204,204,0.4)',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#428bca','#3071a9'],
        normalizeFunction: 'polynomial'
    });
    $("[data-toggle='offcanvas']").on('click', function(e) {
        $(window).trigger('resize');
    });
});
