"use strict";

$(document).ready(function() {

    $(".content").find('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
    $("#input-43").fileinput({
        browseClass: "btn btn-info",
        showPreview: false,
        allowedFileExtensions: ["zip", "rar", "gz", "tgz"],
        elErrorContainer: "#errorBlock43"
            // you can configure `msgErrorClass` and `msgInvalidFileExtension` as well
    });
    $("#input-42").fileinput({
        browseClass: "btn btn-warning",
        maxFilesNum: 10,
        allowedFileExtensions: ["jpg", "gif", "png", "txt"]
    });
    $("#input-41").fileinput({
        browseClass: "btn btn-danger",
        maxFileCount: 10,
        allowedFileTypes: ["image", "video"]
    });
    $(".btn-modify").on("click", function() {

        var $btn = $(this);
        if ($btn.text() == "Modify") {
            $("#input-40").fileinput("disable");
            $btn.html("Revert");
            alert("Hurray! I have disabled the input and hidden the upload button.");
        } else {
            $("#input-40").fileinput("enable");
            $btn.html("Modify");
            alert("Hurray! I have reverted back the input to enabled with the upload button.");
        }
    });

    $("#input-23").fileinput({
        browseClass: "btn btn-default",
        showUpload: false,
        mainTemplate: "{preview}\n" +
            "<div class='input-group {class}'>\n" +
            "   <div class='input-group-btn'>\n" +
            "       {browse}\n" +
            "       {upload}\n" +
            "       {remove}\n" +
            "   </div>\n" +
            "   {caption}\n" +
            "</div>"
    });
    $("#input-21").fileinput({
        previewFileType: "image",
        browseClass: "btn btn-success",
        browseLabel: " Pick Image",
        browseIcon: '<i class="glyphicon glyphicon-picture"></i>',
        removeClass: "btn btn-danger",
        removeLabel: "Delete",
        removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
        uploadClass: "btn btn-info",
        uploadLabel: " Upload",
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',
    });
    $("#input-20").fileinput({
        browseClass: "btn btn-info btn-block",
        showCaption: false,
        showRemove: false,
        showUpload: false
    });
    $("#input-4").fileinput({ browseClass: "btn btn-success", showCaption: false });
    $("#input-5").fileinput({ browseClass: "btn btn-warning", showUpload: false, maxFileCount: 10, mainClass: "input-group-lg" });
});
