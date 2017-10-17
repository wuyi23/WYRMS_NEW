var m_pagerow = 0;
//初始化Table
function InitTable(tb, actionUrl, dbQueryParams, tbColumns) {
    $(tb).bootstrapTable({
        url: actionUrl,         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: dbQueryParams,//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列
        showRefresh: true,                  //是否显示刷新按钮
        //minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        uniqueId: "Id",                     //每一行的唯一标识，一般为主键列
        showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: tbColumns,
        onPageChange: function (number, size) {
            m_pagerow = (number - 1) * size;
        }
    });
};

function InitSubTable(tb, actionUrl, dbQueryParams, tbColumns) {
    $(tb).bootstrapTable({
        url: actionUrl,         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: dbQueryParams,//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列
        showRefresh: true,                  //是否显示刷新按钮
        //minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        uniqueId: "Id",                     //每一行的唯一标识，一般为主键列
        showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: tbColumns,
        onPageChange: function (number, size) {
            m_pagerow = (number - 1) * size;
        }
    });
};

function InitTableWithCountDown(tb, actionUrl, dbQueryParams, tbColumns,onSuccess) {
    $(tb).bootstrapTable({
        url: actionUrl,         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: dbQueryParams,//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列
        showRefresh: true,                  //是否显示刷新按钮
        //minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        uniqueId: "Id",                     //每一行的唯一标识，一般为主键列
        showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: tbColumns,
        onLoadSuccess:onSuccess,
        onPageChange: function (number, size) {
            m_pagerow = (number - 1) * size;
        }
    });
};
//表格行多选删除
function MultDelete(table, actionUrl) {
    var arrselections = $(table).bootstrapTable('getSelections');
    if (arrselections.length <= 0) {
        toastr.warning('请选择有效数据');
        return;
    }
    WinMsg.confirm({ message: "确认要删除选择的数据吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        $.ajax({
            type: "post",
            url: actionUrl,
            data: { "arrselections": JSON.stringify(arrselections) },
            success: function (result) {
                if (result.ResultType == 0) {
                    toastr.success(result.Message);
                    $(table).bootstrapTable('refresh');
                }
                else {
                    toastr.error(result.Message);
                }
            },
            error: function () {
                toastr.error('网络错误，请重新提交！');
            }
        });
    });
}

//重置密码
function MultReset(table, actionUrl) {
    var arrselections = $(table).bootstrapTable('getSelections');
    if (arrselections.length <= 0) {
        toastr.warning('请选择有效数据');
        return;
    }
    WinMsg.confirm({ message: "确定要将已选择用户的密码重置为初始密码“123456”吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        $.ajax({
            type: "post",
            url: actionUrl,
            data: { "arrselections": JSON.stringify(arrselections) },
            success: function (result) {
                if (result.ResultType == 0) {
                    toastr.success(result.Message);
                    //$(table).bootstrapTable('refresh');
                }
                else {
                    toastr.error(result.Message);
                }
            },
            error: function () {
                toastr.error('网络错误，请重新提交！');
            }
        });
    });
}

//推送
function MultPush(parm,table, actionUrl) {
    WinMsg.confirm({ message: "确定要进行系统消息推送吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        $.ajax({
            type: "post",
            url: actionUrl,
            data: parm,
            success: function (data) {
                if (data.result == "success") {
                    toastr.success("系统消息已成功推送！");
                    $(table).bootstrapTable('refresh');
                }
                else {
                    toastr.error("消息推送失败，请重试！");
                }
            },
            error: function () {
                toastr.error('网络错误，请重新提交！');
            }
        });
    });
}

//热门推荐
function MultSuggest(table, actionUrl) {
    var arrselections = $(table).bootstrapTable('getSelections');
    if (arrselections.length > 1) {
        toastr.warning('只能选择一行进行编辑');
        return;
    }
    if (arrselections.length <= 0) {
        toastr.warning('请选择有效数据');
        return;
    }

   
   
    WinMsg.confirm({ message: "确认要推荐选择的航班吗？" }).on(function (e) {
      
        if (!e) {
            return;
        }
      
        $.ajax({
            type: "post",
            url: actionUrl,
            data: { "Id": arrselections[0].Id },
            success: function (result) {
                if (result.ResultType == 0) {
                    toastr.success(result.Message);
                    $(table).bootstrapTable('refresh');
                }
                else {
                    toastr.error(result.Message);
                }
            },
            error: function () {
                toastr.error('网络错误，请重新提交！');
            }
        });
    });
}

//关闭拼机申请
function MultCloseShareApplay(parm, table, actionUrl) {
    WinMsg.confirm({ message: "确定要关闭该条拼机申请吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        $.ajax({
            type: "post",
            url: actionUrl,
            data: parm,
            success: function (data) {
                if (data.Success) {
                    toastr.success("拼机申请已关闭！");
                    $(table).bootstrapTable('refresh');
                }
                else {
                    toastr.error("申请关闭失败，请重试！");
                }
            },
            error: function () {
                toastr.error('网络错误，请重新提交！');
            }
        });
    });
}

function MultCloseThbjOrder(parm, table, actionUrl) {
    WinMsg.confirm({ message: "确定要关闭该条包机订单吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        $.ajax({
            type: "post",
            url: actionUrl,
            data: parm,
            success: function (data) {
               
                if (data.data.Success) {
                    toastr.success("包机订单已关闭！");
                    $(table).bootstrapTable('refresh');
                }
                else {
                    toastr.error("包机订单关闭失败，请重试！");
                }
            },
            error: function () {
                toastr.error('网络错误，请重新提交！');
            }
        });
    });
}


//设置飞行
function SetPlaneFly(table, actionUrl) {
    var arrselections = $(table).bootstrapTable('getSelections');
    if (arrselections.length > 1) {
        toastr.warning('只能选择一行进行编辑');
        return;
    }
    if (arrselections.length <= 0) {
        toastr.warning('请选择有效数据');
        return;
    }

    WinMsg.confirm({ message: "确认该航班起飞？" }).on(function (e) {
        if (!e) {
            return;
        }
        $.ajax({
            type: "post",
            url: actionUrl,
            data: { "planeId": arrselections[0].Id },
            success: function (result) {
                if (result.ResultType == 0) {
                    toastr.success(result.Message);
                    $(table).bootstrapTable('refresh');
                }
                else {
                    toastr.error(result.Message);
                }
            },
            error: function () {
                toastr.error('网络错误，请重新提交！');
            }
        });
    });
}
