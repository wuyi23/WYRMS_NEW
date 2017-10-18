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

    }
}
