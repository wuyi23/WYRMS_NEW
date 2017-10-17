using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Mvc;
using Newtonsoft.Json;
using WYRMS.CoreBLL.Service.Member;
using WYRMS.Domain.Model;
using WYRMS.Tools;
using WYRMS.Tools.Enums;
using WYRMS.Tools.helpers;
using WYRMS.ViewModel;
using WYRMS.ViewModel.Member;
using WYRMS.Web.Extension.Common;
using WYRMS.Web.Extension.Filters;

namespace WYRMS.Web.Areas.Member.Controllers
{
    public class UserGroupController : BaseController
    {
        private readonly UserGroupService _userGroupService;
        private readonly UserGroupRolesSvc _userGroupRolesSvc;
        private readonly RoleService _roleService;

        public UserGroupController(UserGroupService userGroupService, UserGroupRolesSvc userGroupRolesSvc, RoleService roleService)
        {
            _userGroupService = userGroupService;
            _userGroupRolesSvc = userGroupRolesSvc;
            _roleService = roleService;
        }

        //
        // GET: /Member/UserGroup/
        [HttpGet]
        [OprPermission(EnumPermissionCode.QueryUserGroup)]
        public ActionResult Index()
        {
            GetButtonPermissions();
            //获取下拉框数据源
            var enabledItems = DataSourceHelper.GetIsTrue();
            ViewBag.EnableItems = enabledItems;
            return View();
        }

        [HttpPost]
        [OprPermission(EnumPermissionCode.QueryUserGroup)]
        public JsonResult GetUserGroups(int limit, int offset, string userGroupName, int enable)
        {
            Expression<Func<UserGroups, bool>> wh = c => true;
            if (!string.IsNullOrEmpty(userGroupName))
            {
                wh = wh.And(c => c.GroupName.Contains(userGroupName));
            }
            if (enable >= 0)
            {
                var yesOrNot = enable != 0;
                wh = wh.And(c => c.Enabled == yesOrNot);
            }

            int total;
            var lstGroups = _userGroupService.GetPageList(offset, limit, out total, wh, t => t.OrderSort, t => t.Id);
            var result = new List<UserGroupVM>();
            if (lstGroups.Count > 0)
            {
                result = lstGroups.Select(t => new UserGroupVM()
                {
                    Id = t.Id,
                    GroupName = t.GroupName,
                    Description = t.Description,
                    Enabled = t.Enabled,
                    UpdateDate = t.UpdateDate
                }).ToList();
            }
            return Json(new { total = total, rows = result }, JsonRequestBehavior.AllowGet);
        }

        #region 新增

        //
        // GET: /Member/UserGroup/Create
        [HttpGet]
        [OprPermission(EnumPermissionCode.AddUserGroup)]
        public ActionResult Create()
        {
            var model = new UserGroupVM();
            return PartialView(model);
        }

        //
        // POST: /Member/UserGroup/Create

        [HttpPost]
        [OprPermission(EnumPermissionCode.AddUserGroup)]
        public ActionResult Create(UserGroupVM groupVm)
        {
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新检查输入"));
            var result = _userGroupService.Insert(groupVm);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        #endregion

        #region 编辑
        //
        // GET: /Member/UserGroup/Edit/5
        [IsAjax]
        [HttpGet]
        [OprPermission(EnumPermissionCode.UpdateUserGroup)]
        public ActionResult Edit(int id = 0)
        {
            var userGroup = _userGroupService.GetUserGroup(c => c.Id == id);
            if (userGroup == null) return PartialView("Create", new UserGroupVM());
            var model = new UserGroupVM()
            {
                Id = userGroup.Id,
                GroupName = userGroup.GroupName,
                Description = userGroup.Description,
                OrderSort = userGroup.OrderSort,
                Enabled = userGroup.Enabled,
            };
            return PartialView("Create", model);
        }

        //
        // POST: /Member/UserGroup/Edit

        [HttpPost]
        [OprPermission(EnumPermissionCode.UpdateUserGroup)]
        public ActionResult Edit(UserGroupVM userGroupVM)
        {
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新检查输入"));
            var result = _userGroupService.Update(userGroupVM);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        #endregion

        #region 删除
        //
        // POST: /Member/UserGroup/Delete
        [HttpPost]
        [OprPermission(EnumPermissionCode.DeleteUserGroup)]
        public ActionResult Delete()
        {
            var grouplist = Request.Form["arrselections"];
            IEnumerable<UserGroupVM> list = JsonConvert.DeserializeObject<List<UserGroupVM>>(grouplist);
            var result = _userGroupService.Delete(list);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        #endregion


        #region 设置角色
        // GET: /Member/UserGroup/SetRoles
        [IsAjax]
        [HttpGet]
        [OprPermission(EnumPermissionCode.SetRolesUserGroup)]
        public ActionResult SetRoles(int id = 0)
        {
            ViewBag.KeyId = id;
            var userGroup = _userGroupService.GetUserGroup(c => c.Id == id);
            if (userGroup == null)
            {
                return PartialView("Create", new UserGroupVM());
            }
            else
            {

                List<int> ids = _userGroupRolesSvc.ToListEx(c => c.UserGroup_Id == id, c => c.Role_Id).ToList();
                var list = _roleService.ToListEx(c => c.Enabled == true, c => new CheckBoxVM()
                {
                    Name = "chkGroupRoles",
                    Value = c.Id,
                    Discription = c.RoleName,
                    IsChecked = ids.Contains(c.Id)
                });
                return PartialView("_SetCheckBox", list);
            }
        }
        [HttpPost]
        [OprPermission(EnumPermissionCode.SetRolesUserGroup)]
        public ActionResult SetRoles(int keyId, string[] chkGroupRoles)
        {
            if (keyId <= 0)
            {
                return Json(new OperationResult(OperationResultType.ParamError, "参数错误!"));
            }
            OperationResult result = _userGroupService.UpdateUserGroupRoles(keyId, chkGroupRoles);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        #endregion

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
            Permissions addUserGroupButton =
                permissionCache.FirstOrDefault(c => c.Enabled && c.Code == EnumPermissionCode.AddUserGroup.ToString());
            ViewBag.AddUserGroupButton = addUserGroupButton;
            //修改按钮
            Permissions updateUserGroupButton =
                permissionCache.FirstOrDefault(c => c.Enabled && c.Code == EnumPermissionCode.UpdateUserGroup.ToString());
            ViewBag.UpdateUserGroupButton = updateUserGroupButton;
            //删除按钮
            Permissions deleteUserGroupButton =
                permissionCache.FirstOrDefault(c => c.Enabled && c.Code == EnumPermissionCode.DeleteUserGroup.ToString());
            ViewBag.DeleteUserGroupButton = deleteUserGroupButton;
            //设置角色
            Permissions setRolesUserGroupButton =
           permissionCache.FirstOrDefault(c => c.Enabled && c.Code == EnumPermissionCode.SetRolesUserGroup.ToString());
            ViewBag.SetRolesUserGroupButton = setRolesUserGroupButton;
        }
        #endregion
    }
}
