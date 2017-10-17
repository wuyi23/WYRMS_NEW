"use strict";

$(document).ready(function () {

    //=================Preloader===========//
    $(window).on('load', function () {
        $('.preloader img').fadeOut();
        $('.preloader').fadeOut();
    });
    //=================end of Preloader===========//

    /*Background slideshow */

    $('.bg-slider').backstretch([
        "/Resources/img/pages/lbg-1.jpg", "/Resources/img/pages/lbg-2.jpg", "/Resources/img/pages/lbg-3.jpg"
    ], {
        duration: 2500,
        fade: 1050
    });

    $('input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        increaseArea: '20%' // optional
    });



    /*获取验证码*/
    $("#sendbt").click(function () {
        var isSuccess = checkUserNameAndPwd(); //验证用户名和密码
        if (isSuccess) {
            var name = $('#LoginName').val();
            var pwd = $('#Password').val();
            $.ajax({
                type: "POST",
                url: "/Common/Login/GetCheckCode",
                data: { name: name, pwd: pwd },
                success: function (result) {
                    if (result.Success) {
                        resetCode(); //倒计时
                        toastr.success("验证码已发送至您的手机，请注意查收");
                        $("#Phone").val(result.AppendData);
                        $("#doLogin").removeClass("button-flat", "hvr-grow");
                        $("#doLogin").addClass("button-action-flat", "hvr-push");
                        $("#doLogin").removeAttr("disabled");
                    } else {
                        $("#doLogin").attr({ "disabled": "disabled" });
                        toastr.error(result.Message);
                    }
                },
                error: function () {
                    toastr.error('网络错误，请重新提交！');
                }
            });
        }
    });
    //验证用户名和密码
    function checkUserNameAndPwd() {
        var name = $('#LoginName').val();
        var pwd = $('#Password').val();
        var isSuccess = true;
        if (!name || name.trim() === "") {
            toastr.warning('请您输入用户名');
            isSuccess = false;
            $('#LoginName').focus();
        }
        else if (!pwd || pwd.trim() === "") {
            toastr.warning('请您输入登录密码');
            isSuccess = false;
            $('#Password').focus();
        }
        return isSuccess;
    }

    //验证手机验证吗
    function checkCode() {
        var code = $('#sendbt').val();
        var isSuccess = true;
        if (!code || code.trim() === "") {
            toastr.warning('请您输入验证码');
            isSuccess = false;
            $('#sendbt').focus();
        }
        return isSuccess;
    }
    //倒计时
    function resetCode() {
        $('#sendbt').hide();
        $('#J_second').html('60s');
        $('#J_resetCode').show();
        var second = 60;
        var timer = null;
        timer = setInterval(function () {
            second -= 1;
            if (second > 0) {
                var strtime = second + "s";
                $('#J_second').html(strtime);
            } else {
                clearInterval(timer);
                $('#sendbt').show();
                $('#J_resetCode').hide();
            }
        }, 1000);
    }


    $("#doLogin").click(function () {
        var isSuccess = checkUserNameAndPwd(); //验证用户名和密码
        var isSuccessCode = checkCode();
        if (isSuccess && isSuccessCode) {
            var $form = $("#loginform");
            $.ajax({
                type: "POST",
                url: "/Common/Login/Index",
                data: $form.serialize(),
                success: function (result) {
                    if (result.Success) {
                        var menuHtml = result.AppendData.leftmenu;
                        var userNameHtml = result.AppendData.username;
                        var myimgHtml = result.AppendData.myimg;
                        window.localStorage.setItem("menuHtml", menuHtml);
                        window.localStorage.setItem("userNameHtml", userNameHtml);
                        window.localStorage.setItem("myimgHtml", myimgHtml);
                        //缓存菜单
                        window.location.href = "/Common/Home/Index";
                    }
                    else {
                        toastr.error(result.Message);
                    }
                },
                error: function () {
                    toastr.error('网络错误，请重新提交！');
                }
            });
        }
    });

   

});
