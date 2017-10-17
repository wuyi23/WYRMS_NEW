using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Mvc;
using WYRMS.CoreBLL.Service.Member;
using WYRMS.Domain.Model;
using WYRMS.Tools;
using WYRMS.Tools.Enums;
using WYRMS.Tools.helpers;
using WYRMS.ViewModel.Member;
using WYRMS.Web.Extension.Common;
using WYRMS.Web.Extension.Filters;

namespace WYRMS.Web.Areas.Member.Controllers
{
    public class RoleController : BaseController
    {
        private readonly RoleService _roleService;

        public RoleController(RoleService roleService)
        {
            _roleService = roleService;
        }

        //
        // GET: /Member/Roles/
        [HttpGet]
        [OprPermission(EnumPermissionCode.QueryPermission)]
        public ActionResult Index()
        {
            GetButtonPermissions();
            //获取下拉框数据源
            var enabledItems = DataSourceHelper.GetIsTrue();
            ViewBag.EnableItems = enabledItems;
            return View();
        }

        [HttpPost]
        [OprPermission(EnumPermissionCode.QueryPermission)]
        public JsonResult GetRoles(int limit, int offset, string roleName, int enable)
        {
            Expression<Func<Roles, bool>> wh = c => true;
            if (!string.IsNullOrEmpty(roleName))
            {
                wh = wh.And(c => c.RoleName.Contains(roleName));
            }
            if (enable >= 0)
            {
                var yesOrNot = enable != 0;
                wh = wh.And(c => c.Enabled == yesOrNot);
            }
            int total;
            var lstRoles = _roleService.GetPageList(offset, limit, out total, wh, t => t.OrderSort, t => t.Id);
            var result = new List<RoleVM>();
            if (lstRoles.Count > 0)
            {
                result = lstRoles.Select(t => new RoleVM()
                 {
                     Id = t.Id,
                     RoleName = t.RoleName,
                     Description = t.Description,
                     Enabled = t.Enabled,
                     UpdateDate = t.UpdateDate
                 }).ToList();
            }
            return Json(new { total = total, rows = result }, JsonRequestBehavior.AllowGet);
        }


        //
        // GET: /Member/Roles/Create
        [HttpGet]
        [OprPermission(EnumPermissionCode.AddRole)]
        public ActionResult Create()
        {
            var model = new RoleVM();
            return PartialView(model);
        }

        //
        // POST: /Member/Roles/Create

        [HttpPost]
        [OprPermission(EnumPermissionCode.AddRole)]
        public ActionResult Create(RoleVM roleVm)
        {
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新检查输入"));
            var result = _roleService.Insert(roleVm);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }

        //
        // GET: /Member/Roles/Edit/5
        [IsAjax]
        [HttpGet]
        [OprPermission(EnumPermissionCode.UpdateRole)]
        public ActionResult Edit(int id = 0)
        {
            var Roles = _roleService.GetRole(c => c.Id == id);
            if (Roles == null) return PartialView("Create", new RoleVM());
            var model = new RoleVM()
            {
                Id = Roles.Id,
                RoleName = Roles.RoleName,
                Description = Roles.Description,
                OrderSort = Roles.OrderSort,
                Enabled = Roles.Enabled,
            };
            return PartialView("Create", model);
        }

        //
        // POST: /Member/Roles/Edit

        [HttpPost]
        [OprPermission(EnumPermissionCode.UpdateRole)]
        public ActionResult Edit(RoleVM roleVM)
        {
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新检查输入"));
            var result = _roleService.Update(roleVM);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }

        //
        // POST: /Member/Roles/Delete

        [HttpPost]
        [OprPermission(EnumPermissionCode.DeleteRole)]
        public ActionResult Delete()
        {
            var rolelist = Request.Form["arrselections"];
            IEnumerable<RoleVM> list = JsonConvert.DeserializeObject<List<RoleVM>>(rolelist);
            var result = _roleService.Delete(list);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }

        [IsAjax]
        [HttpGet]
        [OprPermission(EnumPermissionCode.AuthorizeRole)]
        public ActionResult AuthorizePermission(int id = 0)
        {
            var nodes = _roleService.GetListZTreeVM(id);
            return Json(nodes, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OprPermission(EnumPermissionCode.AuthorizeRole)]
        public ActionResult AuthorizePermission(int roleid, string ids)
        {
            var idArray = ids.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
            var idsDoubles = Array.ConvertAll<string, double>(idArray, Convert.ToDouble);
            var idInts = Array.ConvertAll<double, int>(idsDoubles, s => Convert.ToInt32(s - 0.5));
            var result = _roleService.UpdateAuthorize(roleid, idInts);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }

        #region 私有函数
        /// <summary>
        /// 获取按钮可见权限
        /// </summary>
        [NonAction]
        private void GetButtonPermissions()
        {
            string userId = ((System.Web.Security.FormsIdentity)(HttpContext.User.Identity)).Ticket.UserData;
            List<Permissions> permissionCache =
                (List<Permissions>)CacheHelper.GetCache(CacheKey.StrPermissionsByUid + "_" + userId);
            //新增按钮
            Permissions addRoleButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.AddRole.ToString());
            ViewBag.AddRoleButton = addRoleButton;
            //修改按钮
            Permissions updateRoleButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.UpdateRole.ToString());
            ViewBag.UpdateRoleButton = updateRoleButton;
            //删除按钮
            Permissions deleteRoleButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.DeleteRole.ToString());
            ViewBag.DeleteRoleButton = deleteRoleButton;
            //授权按钮
            Permissions authorizeRoleButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.AuthorizeRole.ToString());
            ViewBag.AuthorizeRoleButton = authorizeRoleButton;
        }
        #endregion

    }
}