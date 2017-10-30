using Newtonsoft.Json;
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
    public class ModuleController : BaseController
    {
        private readonly ModuleService _moduleService;

        public ModuleController(ModuleService moduleService)
        {
            this._moduleService = moduleService;
        }

        //
        // GET: /Member/Modules/
        [HttpGet]
        [OprPermission(EnumPermissionCode.QueryModule)]
        public ActionResult Index()
        {
            GetButtonPermissions();
            var enabledItems = DataSourceHelper.GetIsTrue();
            ViewBag.EnableItems = enabledItems;
            return View();
        }
        [HttpPost]
        [OprPermission(EnumPermissionCode.QueryModule)]
        public JsonResult GetModules(int limit, int offset, string moduleName, int enable)
        {
            int total = 0;
            Expression<Func<Modules, bool>> wh = c => true;
            if (!string.IsNullOrEmpty(moduleName))
            {
                wh = wh.And(c => c.Name.Contains(moduleName));
            }
            if (enable >= 0)
            {
                var yesOrNot = enable != 0;
                wh = wh.And(c => c.Enabled == yesOrNot);
            }
            var result = _moduleService.GetListModuleVM(wh, limit, offset, out total);

            return Json(new { total = total, rows = result }, JsonRequestBehavior.AllowGet);
        }

        #region 新增
        [HttpGet]
        [OprPermission(EnumPermissionCode.AddModule)]
        public ActionResult Create()
        {
            var vm = new ModuleVM();
            ViewBag.ParentModuleList = GetMenuDropDownListSource();
            return PartialView(vm);

        }

        private List<SelectListItem> GetMenuDropDownListSource()
        {
            var moduleList = _moduleService.ToListEx(c => c.IsMenu && c.Enabled, c => new ModuleVM()
            {
                Name = c.Name,
                Id = c.Id,
                ParentId = c.ParentId,
                Code = c.Code
            });
            IList<ModuleVM> rootList = moduleList.Where(c => !c.ParentId.HasValue).OrderBy(c => c.Code).ToList();
            GetModuleTree(moduleList, ref rootList);
            var selectItemList = new List<SelectListItem>();
            GetSelectItemList(rootList, ref selectItemList);
            return selectItemList;
        }

        private void GetModuleTree(IList<ModuleVM> allList, ref IList<ModuleVM> parentlist)
        {
            foreach (var item in parentlist)
            {
                IList<ModuleVM> childenList = allList.Where(c => c.ParentId == item.Id).OrderBy(c => c.Code).ToList();
                if (childenList.Count > 0)
                {
                    GetModuleTree(allList, ref childenList);
                    item.ChildModules = childenList;
                }
            }
        }

        private void GetSelectItemList(IList<ModuleVM> treeModuleVm, ref List<SelectListItem> selectItemList, int level = 1)
        {
            foreach (var item in treeModuleVm)
            {
                var text = level == 1 ? item.Name : "".PadLeft(level - 1, '　') + "|--" + item.Name;
                selectItemList.Add(new SelectListItem() { Text = text, Value = item.Id.ToString() });
                if (!item.ChildModules.IsNull())
                {
                    GetSelectItemList(item.ChildModules, ref selectItemList, level + 1);
                }
            }
        }


        [HttpPost]
        [OprPermission(EnumPermissionCode.AddModule)]
        public ActionResult Create(ModuleVM vm)
        {
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新输入"));
            var result = _moduleService.Insert(vm);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        #endregion

        #region 修改
        //
        // GET: /Member/Modules/Edit/5
        [IsAjax]
        [HttpGet]
        [OprPermission(EnumPermissionCode.UpdateModule)]
        public ActionResult Edit(int id = 0)
        {
            var modules = _moduleService.GetModule(c => c.Id == id);
            if (modules == null) return PartialView("Create", new ModuleVM());

            var menuSource = GetMenuDropDownListSource();
            if (modules.ParentId.HasValue)
            {
                foreach (var item in menuSource)
                {
                    if (modules.ParentId.Value.ToString() == item.Value)
                    {
                        item.Selected = true;
                        break;
                    }
                }
            }

            ViewBag.ParentModuleList = menuSource;
            var model = new ModuleVM()
            {
                Id = modules.Id,
                Name = modules.Name,
                ParentId = modules.ParentId,
                LinkUrl = modules.LinkUrl,
                IsMenu = modules.IsMenu,
                Code = modules.Code,
                Description = modules.Description,
                Enabled = modules.Enabled,
                Icon = modules.Icon
            };
            return PartialView("Create", model);
        }

        //
        // POST: /Member/Modules/Edit

        [HttpPost]
        [OprPermission(EnumPermissionCode.UpdateModule)]
        public ActionResult Edit(ModuleVM moduleVM)
        {
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新检查输入"));
            var result = _moduleService.Update(moduleVM);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        #endregion

        #region 删除
        //
        // POST: /Member/Modules/Delete

        [HttpPost]
        public ActionResult Delete()
        {
            var rolelist = Request.Form["arrselections"];
            IEnumerable<ModuleVM> list = JsonConvert.DeserializeObject<List<ModuleVM>>(rolelist);
            var result = _moduleService.Delete(list);
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
            Permissions addModuleButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.AddModule.ToString());
            ViewBag.AddModuleButton = addModuleButton;
            //修改按钮
            Permissions updateModuleButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.UpdateModule.ToString());
            ViewBag.UpdateModuleButton = updateModuleButton;
        }
        #endregion
    }
}
