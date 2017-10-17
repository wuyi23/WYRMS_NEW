using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WYRMS.Tools;
using WYRMS.Tools.Enums;
using WYRMS.Tools.helpers;
using WYRMS.Domain.Model;

namespace WYRMS.Web.Extension.Filters
{
    /// <summary>
    /// 权限验证属性
    /// </summary>
    [AttributeUsage(AttributeTargets.Method)]
    public class OprPermissionAttribute : ActionFilterAttribute
    {
        public string Code { get; set; }

        public OprPermissionAttribute(EnumPermissionCode perm)
        {
            this.Code = perm.ToString();
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                string userId = ((System.Web.Security.FormsIdentity)(HttpContext.Current.User.Identity)).Ticket.UserData;
                List<Permissions> permissionCache = (List<Permissions>)CacheHelper.GetCache(CacheKey.StrPermissionsByUid + "_" + userId);
                if (!permissionCache.Exists(c => c.Code == Code))
                {
                    if (HttpContext.Current.Request.RequestType == "POST")
                    {
                        filterContext.Result = new RedirectResult("~/Common/Login/index");
                    }
                    else
                    {
                        filterContext.Result = new RedirectResult("~/Common/Login/index");
                    }
                }
            }
            catch (Exception)
            {
                filterContext.Result = new RedirectResult("~/Common/Login/index");
                
            }
          
        }

    }
}