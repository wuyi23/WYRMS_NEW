/************************************
 * 描述：尚未添加描述
 * 作者：吴毅
 * 日期：2015/11/18 9:39:57  
*************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;
using System.Web.Security;
using WYRMS.CoreBLL.Service.Member;
using WYRMS.Domain.Model;
using WYRMS.Tools.helpers;
using WYRMS.ViewModel.Member;


namespace WYRMS.Web.Extension.Filters
{
    public class LayoutAttribute : ActionFilterAttribute
    {
        #region Autofac属性注入,Filter的注入不同于Controller, Controller的注入是通过构造函数注入的，而Filter是通过属性注入的
        public RoleService RoleService { get; set; }
        public ModuleService ModuleService { get; set; }
        public PermissionService PermissionService { get; set; }
        public UserService UserService { get; set; }
        public SysEntities EfContext { get; set; }



        #endregion

        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            //顶部菜单
            //((ViewResult)filterContext.Result).ViewBag.LoginName = user.LoginName;

            //左侧菜单
            ((ViewResult)filterContext.Result).ViewBag.SidebarMenuModel = InitSidebarMenu();
        }

        private List<ModuleVM> InitSidebarMenu()
        {
            List<ModuleVM> parentMenuList = new List<ModuleVM>();
            string userId = ((FormsIdentity)(HttpContext.Current.User.Identity)).Ticket.UserData;
            if (!string.IsNullOrEmpty(userId))
            {
                object permissionCache = CacheHelper.GetCache(CacheKey.StrPermissionsByUid + "_" + userId);
                List<int> permissionIds;
                if (permissionCache != null)
                {
                    List<Permissions> permissionList = (List<Permissions>)permissionCache;
                    permissionIds = permissionList.Select(p => p.Id).ToList();
                }
                else
                {
                    var permissions = SetUserPermissions(userId);
                    permissionIds = permissions.Select(p => p.Id).ToList();
                }

                var moduleIds = EfContext.Permissions.Where(p => permissionIds.Contains(p.Id) && p.Enabled == true)
                    .Select(c => c.ModuleId).Distinct().ToList();
                var childModules = EfContext.Modules.Where(c => moduleIds.Contains(c.Id)).Distinct().ToList();

                if (childModules.Count > 0)
                {
                    var parentIds = childModules.Select(c => c.ParentId).Distinct().ToList();
                    parentMenuList = EfContext.Modules.Where(c => parentIds.Contains(c.Id))
                                   .OrderBy(c => c.Code)
                                   .Select(c => new ModuleVM { Id = c.Id, Name = c.Name, LinkUrl = c.LinkUrl, Code = c.Code, Icon = c.Icon }).ToList();
                    foreach (var item in parentMenuList)
                    {
                        var children = childModules.Where(c => c.ParentId == item.Id).OrderBy(c => c.Code).Select(c => new ModuleVM { Name = c.Name, LinkUrl = c.LinkUrl, Icon = c.Icon }).ToList();
                        if (children.Count > 0)
                        {
                            item.ChildModules = children;
                        }
                    }
                }
            }
            return parentMenuList;
        }

        /// <summary>
        /// 设置用户权限缓存
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        private List<Permissions> SetUserPermissions(string userId)
        {
            int id = Convert.ToInt32(userId);
            Users user = UserService.GetUser(m => m.Id == id);

            var roleIdsByUser = EfContext.RoleUsers.Where(c => c.User_Id == user.Id).Select(r => r.Role_Id).ToList();
            var roleIdsByUserGroup = (from ur in EfContext.UserGroupRoles
                join uu in EfContext.UserGroupUsers on ur.UserGroup_Id equals uu.UserGroup_Id
                where uu.User_Id == user.Id
                select ur.Role_Id).ToList();
            roleIdsByUser.AddRange(roleIdsByUserGroup);
            var roleIds = roleIdsByUser.Distinct().ToList();
            var permissions = (from r in EfContext.Roles
                join pr in EfContext.PermissionRoles on r.Id equals pr.Role_Id
                join p in EfContext.Permissions on pr.Permission_Id equals p.Id
                where roleIds.Contains(r.Id) && r.Enabled == true
                select p).Distinct().ToList();

            var strKey = CacheKey.StrPermissionsByUid + "_" + user.Id;
            //设置Cache滑动过期时间为1天
            CacheHelper.SetCache(strKey, permissions, Cache.NoAbsoluteExpiration, FormsAuthentication.Timeout);
            return permissions;
        }
    }
}