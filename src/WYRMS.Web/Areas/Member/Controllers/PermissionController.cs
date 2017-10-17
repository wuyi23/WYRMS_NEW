using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
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
    public class PermissionController : BaseController
    {
        private readonly PermissionService _permissionService;
        private readonly ModuleService _moduleService;

        public PermissionController(PermissionService permissionService, ModuleService moduleService)
        {
            this._permissionService = permissionService;
            _moduleService = moduleService;
        }

        //
        // GET: /Member/Permissions/
        [HttpGet]
        [OprPermission(EnumPermissionCode.QueryPermission)]
        public ActionResult Index()
        {
            GetButtonPermissions();
            var enabledItems = DataSourceHelper.GetIsTrue();
            ViewBag.EnableItems = enabledItems;
            return View();
        }

        [HttpPost]
        [OprPermission(EnumPermissionCode.QueryPermission)]
        public JsonResult GetPermissions(int limit, int offset, string permissionName, int enable)
        {
            int total = 0;
            Expression<Func<Permissions, bool>> wh = c => true;
            if (!string.IsNullOrEmpty(permissionName))
            {
                wh = wh.And(c => c.Name.Contains(permissionName.Trim()));
            }
            if (enable >= 0)
            {
                var yesOrNot = enable != 0;
                wh = wh.And(c => c.Enabled == yesOrNot);
            }
            var result = _permissionService.GetListPermissionVM(wh, limit, offset, out total);

            return Json(new { total = total, rows = result }, JsonRequestBehavior.AllowGet);
        }

        #region 新增
        [HttpGet]
        [OprPermission(EnumPermissionCode.AddPermission)]
        public ActionResult Create()
        {
            var vm = new PermissionVM();
            ViewBag.ModuleList = _moduleService.ToListEx(c => c.Enabled == true && c.ParentId != null, c =>
                new SelectListItem()
                {
                    Text = c.Name,
                    Value = SqlFunctions.StringConvert((double)c.Id).Trim()
                });
            return PartialView(vm);
        }

        [HttpPost]
        [OprPermission(EnumPermissionCode.AddPermission)]
        public ActionResult Create(PermissionVM vm)
        {
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新输入"));
            var result = _permissionService.Insert(vm);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        #endregion

        #region 修改
        //
        // GET: /Member/Permissions/Edit/5
        [IsAjax]
        [HttpGet]
        [OprPermission(EnumPermissionCode.UpdateModule)]
        public ActionResult Edit(int id = 0)
        {
            var Permissions = _permissionService.GetPermission(c => c.Id == id);
            if (Permissions == null) return PartialView("Create", new PermissionVM());

            ViewBag.ModuleList = _moduleService.ToListEx(c => c.Enabled == true && c.ParentId != null, c =>
                new SelectListItem()
                {
                    Text = c.Name,
                    Value = SqlFunctions.StringConvert((double)c.Id).Trim(),
                    Selected = (Permissions.ModuleId == c.Id)
                });
            var entity = new PermissionVM()
            {
                Id = Permissions.Id,
                Name = Permissions.Name,
                ModuleId = Permissions.ModuleId,
                Code = Permissions.Code,
                Description = Permissions.Description,
                Enabled = Permissions.Enabled,
            };
            return PartialView("Create", entity);
        }

        //
        // POST: /Member/Modules/Edit

        [HttpPost]
        [OprPermission(EnumPermissionCode.UpdateModule)]
        public ActionResult Edit(PermissionVM permissionVM)
        {
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新检查输入"));
            var result = _permissionService.Update(permissionVM);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        #endregion

        #region 私有函数
        /// <summary>
        /// 获取页面按钮可见权限
        /// </summary>
        [NonAction]
        private void GetButtonPermissions()
        {
            string userId = ((System.Web.Security.FormsIdentity)(HttpContext.User.Identity)).Ticket.UserData;
            List<Permissions> permissionCache =
                (List<Permissions>)CacheHelper.GetCache(CacheKey.StrPermissionsByUid + "_" + userId);
            //新增按钮
            Permissions addPermissionButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.AddPermission.ToString());
            ViewBag.AddPermissionButton = addPermissionButton;
            //修改按钮
            Permissions updatePermissionButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.UpdatePermission.ToString());
            ViewBag.UpdatePermissionButton = updatePermissionButton;
        }
        #endregion
    }
}
