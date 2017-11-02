
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Security;
using WYRMS.DAL.Interfaces;
using WYRMS.Domain.Model;
using WYRMS.Tools;
using WYRMS.Tools.helpers;
using WYRMS.ViewModel;
using WYRMS.ViewModel.Member;

namespace WYRMS.CoreBLL.Service.Member
{
    /// <summary>
    /// 账户业务类
    /// </summary>
    public class AccountService : IService
    {
        private readonly IRepository<Users> _userReps;
        private readonly IDbContextFactory _ctxFac;

        public AccountService(IRepository<Users> userReps, IDbContextFactory ctxFac)
        {
            _userReps = userReps;
            _ctxFac = ctxFac;
        }

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="loginVM">登录模型信息</param>
        /// <returns>登录操作结果</returns>
        public OperationResult Login(LoginVM loginVM)
        {
            if (loginVM == null)
            {
                return new OperationResult(OperationResultType.ParamError, "参数错误");
            }
            var user = _userReps.FirstOrDefault(m => m.UserName == loginVM.LoginName.Trim());
            if (user == null)
            {
                return new OperationResult(OperationResultType.QueryNull, "指定账号的用户不存在");
            }
            if (user.Password != EncryptionHelper.GetMd5Hash(loginVM.Password.Trim()))
            {
                return new OperationResult(OperationResultType.Warning, "登录密码不正确。");
            }
            //TODO:获取验证码
            if (loginVM.Checkcode != "123456")
            {
                return new OperationResult(OperationResultType.Warning, "验证码不正确。");
            }

            SetFormsAuthentication(user);
            var permissions = SetUserPermissionsCache(user.Id);
            var permissionIds = permissions.Select(p => p.Id).ToList();
            var menuHtml = GetLeftSideMenus(permissionIds);
            Dictionary<string, object> data = new Dictionary<string, object>
            {
                {"leftmenu", menuHtml},
                {"username", user.TrueName},
                {"myimg", GetMyImgHtml(user.ImgUrl)}
            };

            return new OperationResult(OperationResultType.Success, "登录成功", data); ;
        }

        /// <summary>
        /// 发送验证码
        /// </summary>
        /// <param name="name">用户名</param>
        /// <param name="pwd">密码</param>
        /// <returns></returns>
        public OperationResult SendCheckCode(string name, string pwd)
        {
            OperationResult result;
            var user = _userReps.FirstOrDefault(m => m.UserName == name.Trim());
            if (user == null)
            {
                result = new OperationResult(OperationResultType.QueryNull, "指定账号的用户不存在");
            }
            else if (user.Password != EncryptionHelper.GetMd5Hash(pwd.Trim()))
            {
                result = new OperationResult(OperationResultType.Warning, "登录密码不正确。");
            }
            else
            {
                //TODO:获取验证码
                result = new OperationResult(OperationResultType.Success);
            }
            return result;
        }

        /// <summary>
        ///  用户退出
        /// </summary>
        public void Logout()
        {
            FormsAuthentication.SignOut();
        }

        #region 私有函数

        private List<Permissions> SetUserPermissionsCache(int userId)
        {
            var roleIdsByUser = _ctxFac.Ctx.RoleUsers.Where(c => c.User_Id == userId).Select(r => r.Role_Id).ToList();
            var roleIdsByUserGroup = (from ur in _ctxFac.Ctx.UserGroupRoles
                                      join uu in _ctxFac.Ctx.UserGroupUsers on ur.UserGroup_Id equals uu.UserGroup_Id
                                      where uu.User_Id == userId
                                      select ur.Role_Id).ToList();
            roleIdsByUser.AddRange(roleIdsByUserGroup);
            var roleIds = roleIdsByUser.Distinct().ToList();
            var permissions = (from r in _ctxFac.Ctx.Roles
                               join pr in _ctxFac.Ctx.PermissionRoles on r.Id equals pr.Role_Id
                               join p in _ctxFac.Ctx.Permissions on pr.Permission_Id equals p.Id
                               where roleIds.Contains(r.Id) && r.Enabled == true
                               select p).Distinct().ToList();

            var strKey = CacheKey.StrPermissionsByUid + "_" + userId;
            //设置Cache滑动过期时间
            CacheHelper.SetCache(strKey, permissions, Cache.NoAbsoluteExpiration, FormsAuthentication.Timeout);
            return permissions;
        }

        private void SetFormsAuthentication(Users user)
        {
            DateTime expiration = DateTime.Now.Add(FormsAuthentication.Timeout);
            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(
                1, //指定版本号：可随意指定
                user.UserName, //登录用户名：对应 Web.config 中 <allow users="Admin" … /> 的 users 属性
                DateTime.Now, //发布时间
                expiration, //失效时间
                true, //是否为持久 Cookie
                user.Id.ToString(),
                //用户数据：可用 ((System.Web.Security.FormsIdentity)(HttpContext.Current.User.Identity)).Ticket.UserData 获取
                FormsAuthentication.FormsCookiePath); //指定 Cookie 为 Web.config 中 <forms path="/" … /> path 属性，不指定则默认为“/”

            //声明一个 Cookie，名称为 Web.config 中 <forms name=".APSX" … /> 的 name 属性，对应的值为身份验票加密后的字串
            var authCookie = FormsAuthentication.GetAuthCookie(FormsAuthentication.FormsCookieName, false);
            authCookie.Value = FormsAuthentication.Encrypt(ticket);
            authCookie.Expires = expiration; //此句非常重要，少了的话，就算此 Cookie 在身份验票中指定为持久性 Cookie ，也只是即时型的 Cookie 关闭浏览器后就失效；
            HttpContext.Current.Response.Cookies.Add(authCookie);
        }

        /// <summary>
        /// 获取首页左侧菜单栏
        /// </summary>
        /// <param name="permissionIds"></param>
        /// <returns></returns>
        private string GetLeftSideMenus(List<int> permissionIds)
        {
            List<ModuleVM> menuList = new List<ModuleVM>();

            var moduleIds = _ctxFac.Ctx.Permissions.Where(p => permissionIds.Contains(p.Id) && p.Enabled == true)
                .Select(c => c.ModuleId).Distinct().ToList();
            var childModules = _ctxFac.Ctx.Modules.Where(c => moduleIds.Contains(c.Id))
                               .Select(c => new ModuleVM
                               {
                                   Id = c.Id,
                                   ParentId = c.ParentId,
                                   Name = c.Name,
                                   LinkUrl = c.LinkUrl,
                                   Code = c.Code,
                                   Icon = c.Icon
                               }).ToList();

            GetMenuTree(childModules, ref menuList);
            //if (childModules.Count > 0)
            //{


            //var parentIds = childModules.Select(c => c.ParentId).Distinct().ToList();
            //parentMenuList = _ctxFac.Ctx.Modules.Where(c => parentIds.Contains(c.Id))
            //               .OrderBy(c => c.Code)
            //               .Select(c => new ModuleVM { Id = c.Id, Name = c.Name, LinkUrl = c.LinkUrl, Code = c.Code, Icon = c.Icon }).ToList();
            //foreach (var item in parentMenuList)
            //{
            //    var children = childModules.Where(c => c.ParentId == item.Id)
            //                        .OrderBy(c => c.Code)
            //                        .Select(c => new ModuleVM { Name = c.Name, LinkUrl = c.LinkUrl, Icon = c.Icon }).ToList();
            //    if (children.Count > 0)
            //    {
            //        item.ChildModules = children;
            //    }
            //}
            //edss  }
            //TODO:改下面


            var menuHtml = new StringBuilder();
            menuHtml.AppendLine("<ul class='navigation' Id='leftmenu'>");
             CreateMenuHtml(menuList, ref menuHtml);
            //foreach (var item in menuList)
            //{
            //    menuHtml.AppendLine("<li class='menu-dropdown'>");
            //    menuHtml.AppendFormat("<a href='#'><i class='menu-icon fa {0}'></i>", item.Icon);
            //    menuHtml.AppendFormat(" <span>{0}</span><span class='fa arrow'></span>", item.Name);
            //    menuHtml.AppendLine("</a>");
            //    menuHtml.AppendLine("<ul class='sub-menu collapse'>");
            //    foreach (var child in item.ChildModules)
            //    {
            //        menuHtml.AppendLine("<li>");
            //        menuHtml.AppendFormat(" <a href='{0}'><i class='fa fa-fw {1}'></i>{2}</a>", child.LinkUrl.Substring(1), child.Icon,
            //            child.Name);
            //        menuHtml.AppendLine("</li>");
            //    }
            //    menuHtml.AppendLine(" </ul>");
            //    menuHtml.AppendLine(" </li>");

            //}
            menuHtml.AppendLine(" </ul>");
            return menuHtml.ToString();
        }


        private void CreateMenuHtml(IList<ModuleVM> menuList, ref StringBuilder menuHtml)
        {
            foreach (var item in menuList)
            {
                if (item.ChildModules == null || item.ChildModules.Count <= 0)
                {
                    menuHtml.AppendLine("<li>");
                    menuHtml.AppendFormat(" <a href='{0}'><i class='fa fa-fw {1}'></i>{2}</a>", item.LinkUrl.Substring(1), item.Icon,
                        item.Name);
                    menuHtml.AppendLine("</li>");
                }
                else
                {
                    menuHtml.AppendLine("<li class='menu-dropdown'>");
                    menuHtml.AppendFormat("<a href='#'><i class='menu-icon fa {0}'></i>", item.Icon);
                    menuHtml.AppendFormat(" <span>{0}</span><span class='fa arrow'></span>", item.Name);
                    menuHtml.AppendLine("</a>");
                    menuHtml.AppendLine("<ul class='sub-menu collapse'>");
                    CreateMenuHtml(item.ChildModules, ref menuHtml);
                    menuHtml.AppendLine(" </ul>");
                    menuHtml.AppendLine(" </li>");
                }
            }
        }

        private void GetMenuTree(List<ModuleVM> childModules, ref List<ModuleVM> menuTree)
        {
            menuTree.AddRange(childModules.Where(module => !module.ParentId.HasValue));
            var parentIds = childModules.Where(c => c.ParentId.HasValue).Select(c => c.ParentId).Distinct().ToList();
            if (parentIds.Count > 0)
            {
                var parentMenuList = _ctxFac.Ctx.Modules.Where(c => parentIds.Contains(c.Id))
                    .OrderBy(c => c.Code)
                    .Select(c => new ModuleVM { Id = c.Id, ParentId = c.ParentId, Name = c.Name, LinkUrl = c.LinkUrl, Code = c.Code, Icon = c.Icon }).ToList();
                foreach (var item in parentMenuList)
                {
                    var children = childModules.Where(c => c.ParentId == item.Id)
                                        .OrderBy(c => c.Code).ToList();
                    if (children.Count > 0)
                    {
                        item.ChildModules = children;
                    }
                }
                GetMenuTree(parentMenuList, ref menuTree);
            }
        }

        /// <summary>
        /// 首页用户头像
        /// </summary>
        /// <param name="imgUrl"></param>
        /// <returns></returns>
        private string GetMyImgHtml(string imgUrl)
        {
            // 原html写法 <img src="/Resources/img/authors/avatar1.jpg" id="myImg" class="img-circle" alt="User Image">
            var imgHtml = new StringBuilder();
            imgHtml.Append("<img src='");
            if (string.IsNullOrEmpty(imgUrl))
            {
                imgHtml.Append("/Resources/img/authors/avatar1.jpg' id='myImg' class='img-circle' alt='User Image'>");
            }
            else
            {
                imgHtml.AppendFormat("{0}' id='myImg' class='img-circle' alt='User Image'>", imgUrl);
            }
            return imgHtml.ToString();
        }
        #endregion
    }
}
