"use strict";

$(document).ready(function() {

    $(".sidebar-toggle").on("click", function() {
        map1.refresh();
        map2.refresh();
        map3.refresh();
        map4.refresh();
        map5.refresh();
        map6.refresh();
    });
    var map5 = new GMaps({
        div: "#gmap-styled",
        lat: 41.895465,
        lng: 12.482324,
        zoom: 15,
        zoomControl: true,
        zoomControlOpt: {
            style: "SMALL",
            position: "TOP_LEFT"
        },
        panControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        overviewMapControl: false
    });
    var styles = [{
        stylers: [
            { hue: "#00ffe6" },
            { saturation: -20 }
        ]
    }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
        ]
    }, {
        featureType: "road",
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    }];
    map5.addStyle({
        styles: styles,
        mapTypeId: "maps_style"
    });

    map5.setStyle("maps_style");

    var map6 = new GMaps({
        el: '#gmap-types',
        lat: -12.043333,
        lng: -77.028333,
        zoom: 12,
        mapTypeControlOptions: {
            mapTypeIds: ["hybrid", "roadmap", "satellite", "terrain", "osm", "cloudmade"]
        }
    });
    map6.addMapType("osm", {
        getTileUrl: function(coord, zoom) {
            return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenStreetMap",
        maxZoom: 18
    });
    map6.addMapType("cloudmade", {
        getTileUrl: function(coord, zoom) {
            return "http://b.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/1/256/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "CloudMade",
        maxZoom: 18
    });
    map6.setMapTypeId("osm");
    var map1;
    map1 = new GMaps({
        el: '#gmap-top',
        zoom: 12,
        lat: -12.043333,
        lng: -77.028333,
        zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        overviewMapControl: false
    });
    var map4;
    map4 = new GMaps({
        el: '#gmap-markers',
        zoom: 12,
        lat: -12.043333,
        lng: -77.028333
    });
    map4.addMarker({
        lat: -12.043333,
        lng: -77.03,
        title: 'Lima',
        details: {
            database_id: 42,
            author: 'HPNeo'
        },
        click: function(e) {
            if (console.log)
                console.log(e);
            alert('You clicked in this marker');
        },
        mouseover: function(e) {
            if (console.log)
                console.log(e);
        }
    });
    map4.addMarker({
        lat: -12.042,
        lng: -77.028333,
        title: 'Marker with InfoWindow',
        infoWindow: {
            content: '<p>HTML Content</p>'
        }
    });

    var map3;
    map3 = new GMaps({
        el: '#gmap-satellite',
        zoom: 12,
        lat: -12.043333,
        lng: -77.028333,
        zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        overviewMapControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    var map2;
    map2 = new GMaps({
        el: '#gmap-terrain',
        zoom: 12,
        lat: -12.043333,
        lng: -77.028333,
        zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        overviewMapControl: false,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    $("[data-toggle='offcanvas']").on('click', function(e) {
        $(window).trigger('resize');
    });
});
