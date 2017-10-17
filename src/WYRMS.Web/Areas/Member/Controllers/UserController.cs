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
using WYRMS.ViewModel;
using WYRMS.ViewModel.Member;
using WYRMS.Web.Extension.Common;
using WYRMS.Web.Extension.Filters;

namespace WYRMS.Web.Areas.Member.Controllers
{
    public class UserController : BaseController
    {
        private readonly UserService _userService;
        private readonly RoleService _roleService;
        private readonly RoleUsersSvc _roleUsersSvc;
        private readonly UserGroupUsersSvc _userGroupUsersSvc;
        private readonly UserGroupService _userGroupService;


        public UserController(UserService userService, RoleService roleService, RoleUsersSvc roleUsersSvc, UserGroupUsersSvc userGroupUsersSvc, UserGroupService userGroupService)
        {
            this._userService = userService;
            _roleService = roleService;
            _roleUsersSvc = roleUsersSvc;
            _userGroupUsersSvc = userGroupUsersSvc;
            _userGroupService = userGroupService;
        }

        //
        // GET: /Member/User/
        [HttpGet]
        [OprPermission(EnumPermissionCode.QueryUser)]
        public ActionResult Index()
        {
            GetButtonPermissions();
            var enabledItems = DataSourceHelper.GetIsTrue();
            ViewBag.EnableItems = enabledItems;
            return View();
        }

        [HttpPost]
        [OprPermission(EnumPermissionCode.QueryUser)]
        public JsonResult GetUsers(int limit, int offset, string userName, int enable)
        {
            Expression<Func<Users, bool>> wh = c => true;
            if (!string.IsNullOrEmpty(userName))
            {
                wh = wh.And(c => c.TrueName.Contains(userName.Trim()));
            }
            if (enable >= 0)
            {
                var yesOrNot = enable != 0;
                wh = wh.And(c => c.Enabled == yesOrNot);
            }
            int total;
            var lstUsers = _userService.GetPageList(offset, limit, out total, wh, t => t.UpdateDate, false);
            var result = new List<UserVM>();
            if (lstUsers.Count > 0)
            {
                result = lstUsers.Select(t => new UserVM()
                {
                    Id = t.Id,
                    UserName = t.UserName,
                    TrueName = t.TrueName,
                    Email = t.Email,
                    Phone = t.Phone,
                    Address = t.Address,
                    Enabled = t.Enabled,
                    UpdateDate = t.UpdateDate
                }).ToList();
            }
            return Json(new { total = total, rows = result }, JsonRequestBehavior.AllowGet);
        }

        // GET: /Member/User/Create
        [HttpGet]
        [OprPermission(EnumPermissionCode.AddUser)]
        public ActionResult Create()
        {
            var model = new UserVM();
            return PartialView(model);
        }

        [HttpPost]
        [OprPermission(EnumPermissionCode.AddUser)]
        public ActionResult Create(UserVM userVm)
        {
            ValidationHelper.RemoveValidationError(ModelState, "Password");//移除Modle中不需要验证的属性Password
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新检查输入"));
            userVm.Password = EncryptionHelper.GetMd5Hash("123456");
            var result = _userService.Insert(userVm);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        //
        // GET: /Member/User/Edit/5
        [IsAjax]
        [HttpGet]
        [OprPermission(EnumPermissionCode.UpdateUser)]
        public ActionResult Edit(int id = 0)
        {
            var user = _userService.GetUser(c => c.Id == id);
            if (user == null) return PartialView("Create", new UserVM());
            var model = new UserVM()
            {
                Id = user.Id,
                UserName = user.UserName,
                TrueName = user.TrueName,
                Address = user.Address,
                Phone = user.Phone,
                Email = user.Email,
                Enabled = user.Enabled,
            };
            return PartialView("Create", model);
        }

        //
        // POST: /Member/User/Edit

        [HttpPost]
        [OprPermission(EnumPermissionCode.UpdateUser)]
        public ActionResult Edit(UserVM userVM)
        {
            ValidationHelper.RemoveValidationError(ModelState, "Password");//移除Modle中不需要验证的属性Password
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新检查输入"));
            var result = _userService.Update(userVM);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }

        //
        // POST: /Member/User/Delete
        [HttpPost]
        [OprPermission(EnumPermissionCode.DeleteUser)]
        public ActionResult Delete()
        {
            var userlist = Request.Form["arrselections"];
            IEnumerable<UserVM> list = JsonConvert.DeserializeObject<List<UserVM>>(userlist);
            var result = _userService.Delete(list);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        //
        // POST: /Member/User/ResetPassword
        [HttpPost]
        [OprPermission(EnumPermissionCode.ResetPwdUser)]
        public ActionResult ResetPassword()
        {
            var userlist = Request.Form["arrselections"];
            IEnumerable<UserVM> list = JsonConvert.DeserializeObject<List<UserVM>>(userlist);
            var result = _userService.ResetPassword(list);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }


        #region 设置角色
        // GET: /Member/User/SetRoles
        [IsAjax]
        [HttpGet]
        [OprPermission(EnumPermissionCode.SetRolesUser)]
        public ActionResult SetRoles(int id = 0)
        {
            ViewBag.KeyId = id;
            var user = _userService.GetUser(c => c.Id == id);
            if (user == null)
            {
                return PartialView("Create", new UserVM());
            }
            else
            {

                IList<int> ids = _roleUsersSvc.ToListEx(c => c.User_Id == id, c => c.Role_Id);
                var list = _roleService.ToListEx(c => c.Enabled == true, c => new CheckBoxVM()
                {
                    Name = "chkRoles",
                    Value = c.Id,
                    Discription = c.RoleName,
                    IsChecked = ids.Contains(c.Id)
                });
                return PartialView("_SetCheckBox", list);
            }
        }
        [HttpPost]
        [OprPermission(EnumPermissionCode.SetRolesUser)]
        public ActionResult SetRoles(int keyId, string[] chkRoles)
        {
            if (keyId <= 0)
            {
                return Json(new OperationResult(OperationResultType.ParamError, "参数错误!"));
            }
            OperationResult result = _userService.UpdateUserRoles(keyId, chkRoles);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        #endregion

        #region 设置用户组
        // GET: /Member/User/SetUserGroups
        [IsAjax]
        [HttpGet]
        [OprPermission(EnumPermissionCode.SetGroupUser)]
        public ActionResult SetUserGroups(int id = 0)
        {
            ViewBag.KeyId = id;
            var user = _userService.GetUser(c => c.Id == id);
            if (user == null)
            {
                return PartialView("Create", new UserVM());
            }
            else
            {

                var ids = _userGroupUsersSvc.ToListEx(c => c.User_Id == id, c => c.UserGroup_Id);
                var list = _userGroupService.ToListEx(c => c.Enabled == true, c => new CheckBoxVM()
                {
                    Name = "chkUserGroups",
                    Value = c.Id,
                    Discription = c.GroupName,
                    IsChecked = ids.Contains(c.Id)

                });
                return PartialView("_SetCheckBox", list);
            }
        }
        [HttpPost]
        [OprPermission(EnumPermissionCode.SetGroupUser)]
        public ActionResult SetUserGroups(int keyId, string[] chkUserGroups)
        {
            if (keyId <= 0)
            {
                return Json(new OperationResult(OperationResultType.ParamError, "参数错误!"));
            }
            OperationResult result = _userService.UpdateUserGroups(keyId, chkUserGroups);
            result.Message = result.Message ?? result.ResultType.GetDescription();
            return Json(result);
        }
        #endregion

        [HttpGet]
        public ActionResult EditPersionalInfo()
        {
            string userId = ((System.Web.Security.FormsIdentity)(HttpContext.User.Identity)).Ticket.UserData;
            int id = Convert.ToInt32(userId);
            var user = _userService.GetUser(c => c.Id == id);
            if (user == null) return PartialView("PersonalInfo", new PersonalInfoVM());
            int phone;
            int.TryParse(user.Phone, out phone);
            var model = new PersonalInfoVM()
            {
                Id = user.Id
            };
            return PartialView("PersonalInfo", model);

        }
        [HttpPost]
        public ActionResult EditPersionalInfo(PersonalInfoVM vm)
        {
            if (!ModelState.IsValid) return Json(new OperationResult(OperationResultType.ParamError, "参数错误，请重新检查输入"));
            var result = _userService.EditPersionalInfo(vm);
            return Json(result);
        }

        [HttpGet]
        public ActionResult UploadMyImg()
        {
            return PartialView("EditMyImg");
        }

        [HttpPost]
        public ActionResult UploadMyImg(string url)
        {
            string userId = ((System.Web.Security.FormsIdentity)(HttpContext.User.Identity)).Ticket.UserData;
            var result = _userService.UploadMyImg(url, userId);
            return Json(result);
        }


        [HttpPost]
        [OprPermission(EnumPermissionCode.ExportUser)]
        public void ExportUser(string userName, int? enable)
        {
            Expression<Func<Users, bool>> wh = c => true;
            if (!string.IsNullOrEmpty(userName))
            {
                wh = wh.And(c => c.TrueName.Contains(userName.Trim()));
            }
            if (enable >= 0)
            {
                var yesOrNot = enable != 0;
                wh = wh.And(c => c.Enabled == yesOrNot);
            }
            _userService.Export(wh, t => t.UpdateDate, false);
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
            Permissions addUserButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.AddUser.ToString());
            ViewBag.AddUserButton = addUserButton;
            //修改按钮
            Permissions updateUserButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.UpdateUser.ToString());
            ViewBag.UpdateUserButton = updateUserButton;
            //删除按钮
            Permissions deleteUserButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.DeleteUser.ToString());
            ViewBag.DeleteUserButton = deleteUserButton;
            //重置密码按钮
            Permissions resetPwdUserButton =
                permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.ResetPwdUser.ToString());
            ViewBag.ResetPwdUserButton = resetPwdUserButton;
            //设置用户组
            Permissions setGroupUserButton =
           permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.SetGroupUser.ToString());
            ViewBag.SetGroupUserButton = setGroupUserButton;
            //设置角色
            Permissions setRolesUserButton =
           permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.SetRolesUser.ToString());
            ViewBag.SetRolesUserButton = setRolesUserButton;
            //设置角色
            Permissions exportUserButton =
           permissionCache.FirstOrDefault(c => c.Enabled == true && c.Code == EnumPermissionCode.ExportUser.ToString());
            ViewBag.ExportUserButton = exportUserButton;
        }
        #endregion

    }
}
