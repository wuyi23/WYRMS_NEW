"use strict";

$(function () {

    /* For demo purposes */
    var demo = $("<div />").css({
        position: "fixed",
        top: "150px",
        right: "0",
        background: "rgba(0, 0, 0, 0.7)",
        "border-radius": "5px 0px 0px 5px",
        padding: "5px",
        "font-size": "16px",
        "z-index": "999999",
        cursor: "pointer",
        color: "#ddd"
    }).html(" <i class='fa fa-fw fa-gears skin-icon'></i>").addClass("no-print");

    var demo_settings = $("<div />").css({
        "padding": "10px",
        position: "fixed",
        top: "100px",
        right: "-200px",
        background: "#fff",
        border: "3px solid rgba(0, 0, 0, 0.7)",
        "width": "160px",
        "z-index": "999999"
    }).addClass("no-print");

    demo_settings.append(
        "<h4 style='margin: 0 0 5px 0; border-bottom: 1px dashed #ddd; padding-bottom: 3px;'>Skins</h4>"
        + "<div class='form-group no-margin'>"
        + "<div  style='float: left;width: 40px;'>"
        + "<div class='setting-color'>"
        + "<label>"
        + "<input name='skins' type='radio' onchange='change_skin(\"skin-coreplus\");' checked='checked'/> "
        + "<span class=split>"
        + "<span class='color bg-coreplus'></span>"
        + "<span class='color bg-coreplus-light'></span>"
        + "</span>"
        + "<span class='color bg-gray'></span>"
        + "</label>"
        + "</div>"
        + "</div>"

        + "<div  style='float: left;width: 40px;'>"
        + "<div class='setting-color'>"
        + "<label>"
        + "<input name='skins' type='radio' onchange='change_skin(\"skin-mint\");'/> "
        + "<span class=split>"
        + "<span class='color bg-mint'></span>"
        + "<span class='color bg-mint-light'></span>"
        + "</span>"
        + "<span class='color bg-gray'></span>"
        + "</label>"
        + "</div>"
        + "</div>"

        + "<div  style='float: left;width: 40px;'>"
        + "<div class='setting-color'>"
        + "<label>"
        + "<input name='skins' type='radio' onchange='change_skin(\"skin-grape\");'/> "
        + "<span class=split>"
        + "<span class='color bg-grape'></span>"
        + "<span class='color bg-grape-light'></span>"
        + "</span>"
        + "<span class='color bg-gray'></span>"
        + "</label>"
        + "</div>"
        + "</div>"

        + "<div  style='float: left;width: 40px;'>"
        + "<div class='setting-color'>"
        + "<label>"
        + "<input name='skins' type='radio' onchange='change_skin(\"skin-lavender\");'/> "
        + "<span class=split>"
        + "<span class='color bg-lavender'></span>"
        + "<span class='color bg-lavender-light'></span>"
        + "</span>"
        + "<span class='color bg-gray'></span>"
        + "</label>"
        + "</div>"
        + "</div>"

        + "<div  style='float: left;width: 40px;'>"
        + "<div class='setting-color'>"
        + "<label>"
        + "<input name='skins' type='radio' onchange='change_skin(\"skin-pink\");'/> "
        + "<span class=split>"
        + "<span class='color bg-pink'></span>"
        + "<span class='color bg-pink-light'></span>"
        + "</span>"
        + "<span class='color bg-gray'></span>"
        + "</label>"
        + "</div>"
        + "</div>"

        + "<div  style='float: left;width: 40px;'>"
        + "<div class='setting-color'>"
        + "<label>"
        + "<input name='skins' type='radio' onchange='change_skin(\"skin-sunflower\");' /> "
        + "<span class=split>"
        + "<span class='color bg-sunflower'></span>"
        + "<span class='color bg-sunflower-light'></span>"
        + "</span>"
        + "<span class='color bg-gray'></span>"
        + "</label>"
        + "</div>"
        + "</div>"
        + "</div>"
    );

    demo.click(function () {
        if (!$(this).hasClass("open")) {
            $(this).css("right", "160px");
            demo_settings.css("right", "0");
            $(this).addClass("open");
        } else {
            $(this).css("right", "0");
            demo_settings.css("right", "-160px");
            $(this).removeClass("open")
        }
    });

    $("body").append(demo).append(demo_settings);
});

function change_skin(cls) {

    $("body").removeClass("skin-coreplus skin-mint skin-grape skin-lavender skin-pink skin-sunflower").addClass(cls);
    $('#skin').attr('href','css/custom_css/skins/' + cls + '.css');

}
function change_layout(cls) {
    $("body").removeClass("container fixed-layout fixed-top ").addClass(cls);

}