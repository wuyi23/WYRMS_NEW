'use strict';

$(function() {

    $("#fls").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#fls').addClass('animated flash').one(animationEnd, function() {
            $(this).removeClass('animated flash');
        });
    });
    $("#tad").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#tad').addClass('animated tada').one(animationEnd, function() {
            $(this).removeClass('animated tada');
        });
    });
    $("#shk").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#shk').addClass('animated shake').one(animationEnd, function() {
            $(this).removeClass('animated shake');
        });
    });
    $("#sw").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#sw').addClass('animated swing').one(animationEnd, function() {
            $(this).removeClass('animated swing');
        });
    });
    $("#pul").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#pul').addClass('animated pulse').one(animationEnd, function() {
            $(this).removeClass('animated pulse');
        });
    });
    $("#wobb").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#wobb').addClass('animated wobble').one(animationEnd, function() {
            $(this).removeClass('animated wobble');
        });
    });
    $("#jell").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#jell').addClass('animated jello').one(animationEnd, function() {
            $(this).removeClass('animated jello');
        });
    });
    $("#rubber").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#rubber').addClass('animated rubberBand').one(animationEnd, function() {
            $(this).removeClass('animated rubberBand');
        });
    });
    $("#bi").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#bi').addClass('animated bounceIn').one(animationEnd, function() {
            $(this).removeClass('animated bounceIn');
        });
    });
    $("#bid").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#bid').addClass('animated bounceInDown').one(animationEnd, function() {
            $(this).removeClass('animated bounceInDown');
        });
    });
    $("#bil").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#bil').addClass('animated bounceInLeft').one(animationEnd, function() {
            $(this).removeClass('animated bounceInLeft');
        });
    });
    $("#bir").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#bir').addClass('animated bounceInRight').one(animationEnd, function() {
            $(this).removeClass('animated bounceInRight');
        });
    });
    $("#bo").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#bo').addClass('animated bounceOut').one(animationEnd, function() {
            $(this).removeClass('animated bounceOut');
        });
    });
    $("#bol").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#bol').addClass('animated bounceOutLeft').one(animationEnd, function() {
            $(this).removeClass('animated bounceOutLeft');
        });
    });
    $("#bor").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#bor').addClass('animated bounceOutRight').one(animationEnd, function() {
            $(this).removeClass('animated bounceOutRight');
        });
    });
    $("#bod").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#bod').addClass('animated bounceOutDown').one(animationEnd, function() {
            $(this).removeClass('animated bounceOutDown');
        });
    });
    $("#fi").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#fi').addClass('animated fadeIn').one(animationEnd, function() {
            $(this).removeClass('animated fadeIn');
        });
    });
    $("#fid").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#fid').addClass('animated fadeInDown').one(animationEnd, function() {
            $(this).removeClass('animated fadeInDown');
        });
    });
    $("#filb").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#filb').addClass('animated fadeInLeftBig').one(animationEnd, function() {
            $(this).removeClass('animated fadeInLeftBig');
        });
    });
    $("#firb").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#firb').addClass('animated fadeInRightBig').one(animationEnd, function() {
            $(this).removeClass('animated fadeInRightBig');
        });
    });
    $("#fo").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#fo').addClass('animated fadeOut').one(animationEnd, function() {
            $(this).removeClass('animated fadeOut');
        });
    });
    $("#fol").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#fol').addClass('animated fadeOutLeft').one(animationEnd, function() {
            $(this).removeClass('animated fadeOutLeft');
        });
    });
    $("#for").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#for').addClass('animated fadeOutRight').one(animationEnd, function() {
            $(this).removeClass('animated fadeOutRight');
        });
    });
    $("#fou").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#fou').addClass('animated fadeOutUp').one(animationEnd, function() {
            $(this).removeClass('animated fadeOutUp');
        });
    });
    $("#flp").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#flp').addClass('animated flip').one(animationEnd, function() {
            $(this).removeClass('animated flip');
        });
    });
    $("#fix").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#fix').addClass('animated flipInX').one(animationEnd, function() {
            $(this).removeClass('animated flipInX');
        });
    });
    $("#fiy").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#fiy').addClass('animated flipInY').one(animationEnd, function() {
            $(this).removeClass('animated flipInY');
        });
    });
    $("#fox").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#fox').addClass('animated flipOutX').one(animationEnd, function() {
            $(this).removeClass('animated flipOutX');
        });
    });
    $("#foy").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#foy').addClass('animated flipOutY').one(animationEnd, function() {
            $(this).removeClass('animated flipOutY');
        });
    });
    $("#lis").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#lis').addClass('animated lightSpeedIn').one(animationEnd, function() {
            $(this).removeClass('animated lightSpeedIn');
        });
    });
    $("#roi").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#roi').addClass('animated rotateIn').one(animationEnd, function() {
            $(this).removeClass('animated rotateIn');
        });
    });
    $("#rou").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#rou').addClass('animated rotateOut').one(animationEnd, function() {
            $(this).removeClass('animated rotateOut');
        });
    });
    $("#lso").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#lso').addClass('animated lightSpeedOut').one(animationEnd, function() {
            $(this).removeClass('animated lightSpeedOut');
        });
    });
    $("#riur").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#riur').addClass('animated rotateInUpRight').one(animationEnd, function() {
            $(this).removeClass('animated rotateInUpRight');
        });
    });
    $("#riul").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#riul').addClass('animated rotateInUpLeft').one(animationEnd, function() {
            $(this).removeClass('animated rotateInUpLeft');
        });
    });
    $("#roul").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#roul').addClass('animated rotateOutUpLeft').one(animationEnd, function() {
            $(this).removeClass('animated rotateOutUpLeft');
        });
    });
    $("#siu").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#siu').addClass('animated slideInUp').one(animationEnd, function() {
            $(this).removeClass('animated slideInUp');
        });
    });
    $("#sid").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#sid').addClass('animated slideInDown').one(animationEnd, function() {
            $(this).removeClass('animated slideInDown');
        });
    });
    $("#sil").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#sil').addClass('animated slideInLeft').one(animationEnd, function() {
            $(this).removeClass('animated slideInLeft');
        });
    });
    $("#sir").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#sir').addClass('animated slideInRight').one(animationEnd, function() {
            $(this).removeClass('animated slideInRight');
        });
    });
    $("#sou").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#sou').addClass('animated slideOutUp').one(animationEnd, function() {
            $(this).removeClass('animated slideOutUp');
        });
    });
    $("#sor").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#sor').addClass('animated slideOutRight').one(animationEnd, function() {
            $(this).removeClass('animated slideOutRight');
        });
    });
    $("#zi").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#zi').addClass('animated zoomIn').one(animationEnd, function() {
            $(this).removeClass('animated zoomIn');
        });
    });
    $("#zo").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#zo').addClass('animated zoomOut').one(animationEnd, function() {
            $(this).removeClass('animated zoomOut');
        });
    });
    $("#ziu").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#ziu').addClass('animated zoomInUp').one(animationEnd, function() {
            $(this).removeClass('animated zoomInUp');
        });
    });
    $("#hi").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#hi').addClass('animated hinge').one(animationEnd, function() {
            $(this).removeClass('animated hinge');
        });
    });
    $("#ri").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#ri').addClass('animated rollIn').one(animationEnd, function() {
            $(this).removeClass('animated rollIn');
        });
    });
    $("#ro").on('click ',function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#ro').addClass('animated rollOut').one(animationEnd, function() {
            $(this).removeClass('animated rollOut');
        });
    });
});