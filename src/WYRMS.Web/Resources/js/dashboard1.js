"use strict";

$(document).ready(function () {

    $('#count-box').CountUpCircle({
        duration: 2500,
        opacity_anim: true,
        step_divider: 2
    });
    $('#count-box2').CountUpCircle({
        duration: 2500,
        opacity_anim: true,
        step_divider: 5
    });
    $('#count-box3').CountUpCircle({
        duration: 2500,
        opacity_anim: true,
        step_divider: 7
    });
    $('#count-box4').CountUpCircle({
        duration: 2500,
        opacity_anim: true,
        step_divider: 10
    });

    

    /*
     Background slideshow
     */
    $('.index-header').backstretch([
        "img/4.jpg", "img/3.jpg", "img/2.jpg"
    ], {duration: 3000, fade: 750});


    // top sales visits and income widgets gradient

    var granimInstance1 = new Granim({
        element: '#canvas-interactive1',
        name: 'interactive-gradient1',
        elToSetClassOn: '.canvas-interactive-wrapper1',
        direction: 'diagonal',
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#834d9b', '#d04ed6'],
                    ['#1CD8D2', '#93EDC7']
                ],
                transitionSpeed: 12000
            }
        }
    });
    var granimInstance2 = new Granim({
        element: '#canvas-interactive2',
        name: 'interactive-gradient2',
        elToSetClassOn: '.canvas-interactive-wrapper2',
        direction: 'diagonal',
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#834d9b', '#d04ed6'],
                    ['#1CD8D2', '#93EDC7']
                ],
                transitionSpeed: 12000
            }
        }
    });
    var granimInstance3 = new Granim({
        element: '#canvas-interactive3',
        name: 'interactive-gradient3',
        elToSetClassOn: '.canvas-interactive-wrapper3',
        direction: 'diagonal',
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#834d9b', '#d04ed6'],
                    ['#1CD8D2', '#93EDC7']
                ],
                transitionSpeed: 12000
            }
        }
    });
    var granimInstance4 = new Granim({
        element: '#canvas-interactive4',
        name: 'interactive-gradient4',
        elToSetClassOn: '.canvas-interactive-wrapper4',
        direction: 'diagonal',
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#834d9b', '#d04ed6'],
                    ['#1CD8D2', '#93EDC7']
                ],
                transitionSpeed: 12000
            }
        }
    });
    // top sales visits and income widgets gradient ends



   

  
   
   
   
   


    

   

    

   

});

$(document).ready(function () {

     $('#shareingtable').dataTable({
        "responsive": true,
		"oLanguage": {
"sLengthMenu": "每页显示 _MENU_ 条记录",
"sZeroRecords": "对不起，查询不到任何相关数据",
"sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
"sInfoEmtpy": "找不到相关数据",
"sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
"sProcessing": "正在加载中...",
"sSearch": "搜索",
"oPaginate": {
"sFirst": "第一页",
"sPrevious":" 上一页 ",
"sNext": " 下一页 ",
"sLast": " 最后一页 "
},
}
    });
	
	 $('#chareterTable').dataTable({
        "responsive": true
    });
	
	 $('#flightactive_table').dataTable({
        "responsive": true
    });
   
// area chart end
});