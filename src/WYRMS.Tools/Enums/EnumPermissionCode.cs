using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WYRMS.Tools.Enums
{
    /// <summary>
    /// 权限编码
    /// </summary>
    public enum EnumPermissionCode
    {
        #region 角色管理(10开头的4位数)
        /// <summary>
        /// 查询按钮（角色管理）
        /// </summary>
        QueryRole = 1000,
        /// <summary>
        /// 新增按钮（角色管理）
        /// </summary>
        AddRole = 1001,
        /// <summary>
        /// 修改按钮（角色管理）
        /// </summary>
        UpdateRole = 1002,
        /// <summary>
        /// 删除按钮（角色管理）
        /// </summary>
        DeleteRole = 1003,
        /// <summary>
        /// 授权按钮（角色管理）
        /// </summary>
        AuthorizeRole = 1004,

        #endregion

        #region 用户管理（11开头的4位数）
        /// <summary>
        /// 查询按钮（用户管理）
        /// </summary>
        QueryUser = 1100,
        /// <summary>
        /// 新增按钮（用户管理）
        /// </summary>
        AddUser = 1101,
        /// <summary>
        /// 修改按钮（用户管理）
        /// </summary>
        UpdateUser = 1102,
        /// <summary>
        /// 删除按钮（用户管理）
        /// </summary>
        DeleteUser = 1103,
        /// <summary>
        /// 重置密码按钮（用户管理）
        /// </summary>
        ResetPwdUser = 1104,
        /// <summary>
        /// 设置用户组按钮（用户管理）
        /// </summary>
        SetGroupUser = 1105,
        /// <summary>
        /// 设置角色按钮（用户管理）
        /// </summary>
        SetRolesUser = 1106,
        /// <summary>
        /// 导出按钮（用户管理）
        /// </summary>
        ExportUser = 1107,


        /// <summary>
        /// 查询按钮（用户管理）
        /// </summary>
        QueryUserOnline = 1110,
        /// <summary>
        /// 新增按钮（用户管理）
        /// </summary>
        AddUserOnline = 1111,
        /// <summary>
        /// 修改按钮（用户管理）
        /// </summary>
        UpdateUserOnline = 1112,
        /// <summary>
        /// 删除按钮（用户管理）
        /// </summary>
        DeleteUserOnline = 1113,


        /// <summary>
        /// 查询按钮（用户管理）
        /// </summary>
        QueryUserOffline = 1120,
        /// <summary>
        /// 新增按钮（用户管理）
        /// </summary>
        AddUserOffline = 1121,
        /// <summary>
        /// 修改按钮（用户管理）
        /// </summary>
        UpdateUserOffline = 1122,
        /// <summary>
        /// 删除按钮（用户管理）
        /// </summary>
        DeleteUserOffline = 1123,


        /// <summary>
        /// 查询按钮（用户管理）
        /// </summary>
        QueryPassengerUser = 1130,
        /// <summary>
        /// 新增按钮（用户管理）
        /// </summary>
        AddPassengerUser = 1131,
        /// <summary>
        /// 修改按钮（用户管理）
        /// </summary>
        UpdatePassengerUser = 1132,
        /// <summary>
        /// 删除按钮（用户管理）
        /// </summary>
        DeletePassengerUser = 1133,





        /// <summary>
        /// 查询按钮（用户管理）
        /// </summary>
        QueryCertificateUser = 1140,
        /// <summary>
        /// 新增按钮（用户管理）
        /// </summary>
        AddCertificateUser = 1141,
        /// <summary>
        /// 修改按钮（用户管理）
        /// </summary>
        UpdateCertificateUser = 1142,
        /// <summary>
        /// 删除按钮（用户管理）
        /// </summary>
        DeleteCertificateUser = 1143,



        #endregion

        #region 模块管理（12开头的4位数）
        /// <summary>
        /// 查询按钮（模块管理）
        /// </summary>
        QueryModule = 1200,
        /// <summary>
        /// 新增按钮（模块管理）
        /// </summary>
        AddModule = 1201,
        /// <summary>
        /// 修改按钮（模块管理）
        /// </summary>
        UpdateModule = 1202,
        #endregion

        #region 权限管理（13开头的4位数）
        /// <summary>
        /// 查询按钮（权限管理）
        /// </summary>
        QueryPermission = 1301,
        /// <summary>
        /// 新增按钮（权限管理）
        /// </summary>
        AddPermission = 1302,
        /// <summary>
        /// 修改按钮（权限管理）
        /// </summary>
        UpdatePermission = 1303,
        #endregion

        #region 操作日志管理（14开头的4位数）
        /// <summary>
        /// 查询按钮（操作日志管理）
        /// </summary>
        QuerySystemLog = 1400,

        #endregion

        #region 用户组管理（15开头的4位数）
        /// <summary>
        /// 查询按钮（用户组管理）
        /// </summary>
        QueryUserGroup = 1500,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddUserGroup = 1501,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateUserGroup = 1502,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteUserGroup = 1503,
        /// <summary>
        /// 设置角色按钮（用户组管理）
        /// </summary>
        SetRolesUserGroup = 1504,

        #endregion


        #region 服务商管理(16开头的4位数)

        QuerySuppliers = 1601,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddSuppliers = 1602,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateSuppliers = 1603,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteSuppliers = 1604,




        #endregion


        #region 机型管理（17开头的4位数）

        QueryPlanetypes = 1701,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddPlanetypes = 1702,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdatePlanetypes = 1703,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeletePlanetypes = 1704,




        #endregion

        #region 飞机管理（18开头的4位数）

        QueryPlane = 1801,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddPlane = 1802,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdatePlane = 1803,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeletePlane = 1804,

        #endregion

        #region 城市管理（19开头的4位数）

        QueryCityInfo = 1901,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddCityInfo = 1902,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateCityInfo = 1903,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteCityInfo = 1904,




        #endregion

        #region 机场管理（20开头的4位数）

        QueryAirPortInfo = 2001,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirPortInfo = 2002,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateAirPortInfo = 2003,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteAirPortInfo = 2004,




        #endregion

        #region 航站楼管理（21开头的4位数）

        QueryAirPortGate = 2101,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirPortGate = 2102,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateAirPortGate = 2103,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteAirPortGate = 2104,




        #endregion

        #region 拼机航班管理（22开头的4位数）

        QueryShareFlight = 2201,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirShareFlight = 2202,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateShareFlight = 2203,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteShareFlight = 2204,

        /// <summary>
        /// 推荐
        /// </summary>
        RecommendShareFlight = 2205,

        HoldingSeat=2206,

        /// <summary>
        /// 更新座位状态
        /// </summary>
        HoldingSeatUpdate=2207,

        PushSharemsg = 2208,

        PushShareList = 2209,

        AddShareAdvertisment = 2209,

     
       

        #endregion

        #region 拼机申请管理（23开头的4位数）

        QueryShareingApply = 2301,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirShareingApply = 2302,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateShareingApply = 2303,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteShareingApply = 2304,

        /// <summary>
        /// 获取用户信息
        /// </summary>
        QueryUserInfoShareingApply = 2305,


        #endregion

        #region 拼机订单管理（24开头的4位数）

        QueryShareOrders = 2401,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirShareOrders = 2402,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateShareOrders = 2403,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteShareOrders = 2404,

        /// <summary>
        /// 获取用户信息
        /// </summary>
        QueryUserInfoShareOrder = 2605,

        /// <summary>
        /// 关闭订单
        /// </summary>
        CloseShareOrder = 2606,


        /// <summary>
        /// 确认退款
        /// </summary>
        ConfirmRefundShareOrder = 2607,

        ShareConfirmView = 2608,


        #endregion

        #region 空中巴士航班管理（25开头的4位数）

        QueryAirBusFlight = 2501,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirAirBusFlight = 2502,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateAirBusFlight = 2503,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteAirBusFlight = 2504,
        /// <summary>
        /// 推荐
        /// </summary>
        RecommendAirBusFlight = 2505,

        /// <summary>
        /// 占座更新
        /// </summary>
        HoldingSeatUpdateBusFlight = 2506,

        /// <summary>
        /// 占座更新
        /// </summary>
        HoldingSeatBusFlight = 2507,


        PushAirbusmsg = 2508,

        PushAirbusList = 2509,

        AddAirBusAdvertisment = 2510,

        #endregion

        #region 空中巴士订单管理（26开头的4位数）

        QueryAirBusOrders = 2601,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirAirBusOrders = 2602,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateAirBusOrders = 2603,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteAirBusOrders = 2604,

        /// <summary>
        /// 获取用户信息
        /// </summary>
        QueryUserInfoAirBusOrder = 2605,

        /// <summary>
        /// 关闭订单
        /// </summary>
        CloseAirBusOrder = 2606,

        AirBusConfirmView = 2608,


        /// <summary>
        /// 确认退款
        /// </summary>
        ConfirmRefundAirBusOrder = 2607,



        #endregion

        #region 包机申请管理（27开头的4位数）

        QueryApplyCharters = 2701,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>

        RevieweAirApplyCharters = 10002,

        AddAirApplyCharters = 2702,

        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>

        PubliceApplyCharters = 10003,

        UpdateApplyCharters = 2703,

        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteApplyCharters = 2704,

        /// <summary>
        /// 获取用户信息
        /// </summary>
        QueryUserInfoApplyCharters = 2705,

        CloseApplyCharters=2076,

        #endregion

        #region 包机航班管理（28开头的4位数）

        QueryCharterFlights = 2801,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirCharterFlights = 2802,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateCharterFlights = 2803,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteCharterFlights = 2804,




        #endregion

        #region 包机订单管理（29开头的4位数）

        QueryCharterOrders = 2901,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirCharterOrders = 2902,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateCharterOrders = 2903,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteCharterOrders = 2904,

        /// <summary>
        /// 获取用户信息
        /// </summary>
        QueryUserInfoCharterOrder = 2905,

        /// <summary>
        /// 关闭订单
        /// </summary>
        CloseCharterOrder = 2906,


        /// <summary>
        /// 确认退款
        /// </summary>
        ConfirmRefundCharterOrder = 2908,


        CharterDepositConfirmView = 3109,

        CharterRetainageConfirmView = 3110,


        #endregion


        #region 特惠包机航班管理（30开头的4位数）

        QueryPreferentialFlight = 3001,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirPreferentialFlight = 3002,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdatePreferentialFlight = 3003,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeletePreferentialFlight = 3004,

        /// <summary>
        /// 推荐
        /// </summary>
        RecommendPreferentialFlight = 3005,


        PushPreferentialmsg = 3006,

        PushPreferentialList = 3007,

        AddPreferentialAdvertisment = 3008,

        #endregion

        #region 特惠包机订单管理（31开头的4位数）

        QueryPreferentialOrder = 3101,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddAirPreferentialOrder = 3102,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdatePreferentialOrder = 3103,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeletePreferentialOrder = 3104,

        /// <summary>
        /// 获取用户信息
        /// </summary>
        QueryUserInfoPreferentialOrder = 3105,

        /// <summary>
        /// 关闭订单
        /// </summary>
        ClosePreferentialOrder=3106,

        /// <summary>
        /// 确认付款
        /// </summary>
        ConfirmPreferentialPayOrder=3107,


        /// <summary>
        /// 确认退款
        /// </summary>
        ConfirmRefundPreferentialOrder=3108,


        PreferentialDepositConfirmView = 3109,

        PreferentialRetainageConfirmView=3110,



        #endregion



        #region 私享家管理（32开头的4位数）

        QueryTopicClassify = 3201,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddTopicClassify = 3202,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateTopicClassify = 3203,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteTopicClassify = 3204,


        QueryTopicItem = 3205,
        /// <summary>
        /// 新增按钮（用户组管理）
        /// </summary>
        AddTopicItem = 3206,
        /// <summary>
        /// 修改按钮（用户组管理）
        /// </summary>
        UpdateTopicItem = 3207,
        /// <summary>
        /// 删除按钮（用户组管理）
        /// </summary>
        DeleteTopicItem = 3208,

        /// <summary>
        /// 清空点赞
        /// </summary>
        CleanUpPraise = 3209,

        PushTopicmsg = 3210,

        PushTopicList = 3211,

        TopicAdvertisment = 3213,

        #endregion

        #region 常见问题分类管理(33开头的4位数)
        /// <summary>
        /// 查询按钮（常见问题管理）
        /// </summary>
        QueryProblemClassify = 3300,
        /// <summary>
        /// 新增按钮（常见问题管理）
        /// </summary>
        AddProblemClassify = 3301,
        /// <summary>
        /// 修改按钮（常见问题管理）
        /// </summary>
        UpdateProblemClassify = 3302,
        /// <summary>
        /// 删除按钮（常见问题管理）
        /// </summary>
        DeleteProblemClassify = 3303,
        #endregion

        #region 常见问题内容管理(34开头的4位数)
        /// <summary>
        /// 查询按钮（常见问题管理）
        /// </summary>
        QueryProblemContent = 3400,
        /// <summary>
        /// 新增按钮（常见问题管理）
        /// </summary>
        AddProblemContent = 3401,
        /// <summary>
        /// 修改按钮（常见问题管理）
        /// </summary>
        UpdateProblemContent = 3402,
        /// <summary>
        /// 删除按钮（常见问题管理）
        /// </summary>
        DeleteProblemContent = 3403,

        #endregion

        #region 相关协议管理(35开头的4位数)
        /// <summary>
        /// 查询按钮（相关协议管理）
        /// </summary>
        QueryProtocal = 3500,
        /// <summary>
        /// 新增按钮（相关协议管理）
        /// </summary>
        AddProtocal = 3501,
        /// <summary>
        /// 修改按钮（相关协议管理）
        /// </summary>
        UpdateProtocal = 3502,
        /// <summary>
        /// 删除按钮（相关协议管理）
        /// </summary>
        DeleteProtocal = 3503,

        #endregion

        #region 公司信息管理(36开头的4位数)
        /// <summary>
        /// 查询按钮（公司信息管理）
        /// </summary>
        QueryCompanyInfo = 3600,
        /// <summary>
        /// 修改按钮（公司信息管理）
        /// </summary>
        UpdateCompanyInfo = 3601,


        #endregion

        #region 会员卡申请管理(37开头的4位数)
        /// <summary>
        /// 查询按钮（公司信息管理）
        /// </summary>
        QueryAssociatorApply = 3700,
        /// <summary>
        /// 新增按钮（公司信息管理）
        /// </summary>
        AddAssociatorApply = 3701,
        /// <summary>
        /// 修改按钮（公司信息管理）
        /// </summary>
        UpdateAssociatorApply = 3702,
        /// <summary>
        /// 删除按钮（公司信息管理）
        /// </summary>
        CannerAssociatorApply = 3703,
        /// <summary>
        /// 删除按钮（会有卡审核）
        /// </summary>
        AuditingAssociatorApply = 3704,



        #endregion

        #region 会员卡申请管理(38开头的4位数)
        /// <summary>
        /// 查询按钮（公司信息管理）
        /// </summary>
        QueryAssociator = 3800,
        /// <summary>
        /// 新增按钮（公司信息管理）
        /// </summary>
        AddAssociator = 3801,
        /// <summary>
        /// 修改按钮（公司信息管理）
        /// </summary>
        UpdateAssociator = 3802,
        /// <summary>
        /// 删除按钮（公司信息管理）
        /// </summary>
        DeleteAssociator = 3803,
        /// <summary>
        /// 删除按钮（会有卡审核）
        /// </summary>
        AuditingAssociator = 3804,



        #endregion

        #region 消息管理（39开头的4位数）


        /// <summary>
        /// 查询按钮
        /// </summary>
        QueryMsgSys = 3901,
        /// <summary>
        /// 新增按钮（消息管理）
        /// </summary>
        AddMsgSys = 3902,
        /// <summary>
        /// 修改按钮（消息管理）
        /// </summary>
        UpdateMsgSys = 3903,
        /// <summary>
        /// 删除按钮（消息管理）
        /// </summary>
        DeleteMsgSys = 3904,


        QueryMsgUser = 3905,
        /// <summary>
        /// 新增按钮（消息管理）
        /// </summary>
        AddMsgUser = 3906,
        /// <summary>
        /// 修改按钮（消息管理）
        /// </summary>
        UpdateMsgUser = 3907,
        /// <summary>
        /// 删除按钮（消息管理）
        /// </summary>
        DeleteMsgUser = 3908,

        /// <summary>
        /// 推送消息
        /// </summary>
        PushUserMsg = 3909,

        /// <summary>
        /// 推送消息
        /// </summary>
        PushSystemMsg = 3910,
        
        /// <summary>
        /// 查询按钮
        /// </summary>
        QueryMsgOrder = 3911,
        /// <summary>
        /// 新增按钮（消息管理）
        /// </summary>
        AddMsgOrder = 3912,
        /// <summary>
        /// 修改按钮（消息管理）
        /// </summary>
        UpdateMsgOrder = 3913,
        /// <summary>
        /// 删除按钮（消息管理）
        /// </summary>
        DeleteMsgOrder = 3914,
        #endregion

        #region 广告管理(40开头的4位数)
        /// <summary>
        /// 查询按钮（广告管理）
        /// </summary>
        QueryAdvertisment = 4000,
        /// <summary>
        /// 新增按钮（广告管理）
        /// </summary>
        AddAdvertisment = 4001,
        /// <summary>
        /// 修改按钮（广告管理）
        /// </summary>
        UpdateAdvertisment = 4002,
        /// <summary>
        /// 删除按钮（广告管理）
        /// </summary>
        DeleteAdvertisment = 4003,

        #endregion

        #region 优惠卷管理(41开头的4位数)
        /// <summary>
        /// 查询按钮（优惠卷管理）
        /// </summary>
        QueryCoupon = 4100,
        /// <summary>
        /// 新增按钮（优惠卷管理）
        /// </summary>
        AddCoupon = 4101,
        /// <summary>
        /// 修改按钮（优惠卷管理）
        /// </summary>
        UpdateCoupon = 4102,
        /// <summary>
        /// 删除按钮（优惠卷管理）
        /// </summary>
        DeleteCoupon = 4103,

        /// <summary>
        /// 发放按钮（优惠卷管理）
        /// </summary>
        SendCoupon = 4104,

        #endregion

        #region 订单消息管理 42

        QueryOrderlist=4201,


        #endregion

        #region 订单消息管理 43

        /// <summary>
        /// 查询推荐航班列表
        /// </summary>
        QueryRecommendflight = 4301,

        /// <summary>
        /// 更新推荐航班列表
        /// </summary>
        UpdateRecommendflight=4302,





        #endregion

        #region 航班管理（44开头的4位数）

        QueryFlightPlane = 4401,
        /// <summary>
        /// 新增按钮（航班管理）
        /// </summary>
        AddFlightPlane = 4402,
        /// <summary>
        /// 修改按钮（航班管理）
        /// </summary>
        UpdateFlightPlane = 4403,
        /// <summary>
        /// 删除按钮（航班管理）
        /// </summary>
        DeleteFlightPlane = 4404,

        /// <summary>
        /// 操作航班
        /// </summary>
        SetFlightPlane = 4405,

        QueryFlightPlaneHistory = 4411,
        /// <summary>
        /// 新增按钮（航班管理）
        /// </summary>
        AddFlightPlaneHistory = 4412,
        /// <summary>
        /// 修改按钮（航班管理）
        /// </summary>
        UpdateFlightPlaneHistory = 4413,
        /// <summary>
        /// 删除按钮（航班管理）
        /// </summary>
        DeleteFlightPlaneHistory = 4414,



        #endregion

        #region 账单管理（45开头的4位数）

        QueryUserBill = 4501,
        /// <summary>
        /// 新增按钮（航班管理）
        /// </summary>
        AddUserBill = 4502,
        /// <summary>
        /// 修改按钮（航班管理）
        /// </summary>
        UpdateUserBill = 4503,
        /// <summary>
        /// 删除按钮（航班管理）
        /// </summary>
        DeleteUserBill = 4504,


        /// <summary>
        /// 
        /// </summary>
        QueryWithDrawDeposit = 4505,
        /// <summary>
        /// 新增按钮（航班管理）
        /// </summary>
        AddWithDrawDeposit = 4506,
        /// <summary>
        /// 修改按钮（航班管理）
        /// </summary>
        UpdateWithDrawDeposit = 4507,
        /// <summary>
        /// 删除按钮（航班管理）
        /// </summary>
        DeleteWithDrawDeposit = 4508,
        /// <summary>
        /// 删除按钮（航班管理）
        /// </summary>
        AcceptWithDrawDeposit = 4509,


        #endregion

    }
}
