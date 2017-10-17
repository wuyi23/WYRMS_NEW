"use strict";

$(document).ready(function () {

    var my_token = 'pk.eyJ1IjoiYmhhcnUiLCJhIjoiY2l0dmhxYWcwMDA1cjJ6cW14eHVpaHp4eCJ9.atVtH1bNhN4WgYUrzh0h_g';
//Basic map
    var mymap = L.map('advanced_map').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        id: 'advanced_map',
        accessToken: my_token
    }).addTo(mymap);
    var marker = L.marker([51.5, -0.09]).addTo(mymap);
    var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);
    var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(mymap);
    marker.bindPopup("<b>Hello world!</b>").openPopup();
    $(".sidebar-toggle").on('click', function () {
        mymap.invalidateSize();
    });
});
