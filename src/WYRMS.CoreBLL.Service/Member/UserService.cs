/************************************
 * 描述：尚未添加描述
 * 作者：吴毅
 * 日期：2016/2/4 17:04:40  
*************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Transactions;
using System.Web.Caching;
using EntityFramework.Extensions;
using WYRMS.DAL;
using WYRMS.DAL.Interfaces;
using WYRMS.Domain.Model;
using WYRMS.Tools;
using WYRMS.Tools.helpers;
using WYRMS.ViewModel.Member;
using WYRMS.Tools.NPOI;
using System.Web.Security;

namespace WYRMS.CoreBLL.Service.Member
{
    public class UserService : IService
    {
        private readonly IRepository<Users> _userReps;
        private readonly IExcelNpoi _excelNpoi;
        private readonly SysEntities _ctx;

        public UserService(IRepository<Users> userReps, IExcelNpoi excelNpoi, SysEntities ctx)
        {
            _userReps = userReps;
            _excelNpoi = excelNpoi;
            _ctx = ctx;
        }

        public Users GetUser(Expression<Func<Users, bool>> wh)
        {
            return _userReps.FirstOrDefault(wh);
        }

        /// <summary>
        /// 获取用户分页列表
        /// </summary>
        /// <param name="wh">查询where表达式</param>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <param name="total"></param>
        /// <param name="orderByLambda"></param>
        /// <param name="isAsc"></param>
        /// <returns></returns>
        public IList<Users> GetPageList<TS>(int offset, int limit, out int total, Expression<Func<Users, bool>> wh, Expression<Func<Users, TS>> orderByLambda, bool isAsc = true)
        {
            return _userReps.ToPageList(offset, limit, out total, wh, orderByLambda, isAsc);
        }

        public OperationResult Insert(UserVM model)
        {
            try
            {
                Users oldUser = _userReps.FirstOrDefault(c => c.UserName == model.UserName.Trim());
                if (oldUser != null)
                {
                    return new OperationResult(OperationResultType.Warning, "数据库中已经存在相同的用户名称，请修改后重新提交！");
                }
                var entity = new Users
                {
                    UserName = model.UserName.Trim(),
                    TrueName = model.TrueName.Trim(),
                    Password = model.Password,
                    Phone = model.Phone,
                    Email = model.Email,
                    Address = model.Address,
                    Enabled = model.Enabled,
                    UpdateDate = DateTime.Now
                };
                _userReps.Add(entity);
                return new OperationResult(OperationResultType.Success, "新增数据成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "新增数据失败，数据库插入数据时发生了错误!");
            }
        }

        public OperationResult Update(UserVM model)
        {
            try
            {
                var user = _userReps.FirstOrDefault(c => c.Id == model.Id);
                if (user == null)
                {
                    throw new Exception();
                }
                var other = _userReps.FirstOrDefault(c => c.Id != model.Id && c.UserName == model.UserName.Trim());
                if (other != null)
                {
                    return new OperationResult(OperationResultType.Warning, "数据库中已经存在相同的用户名称，请修改后重新提交！");
                }
                user.TrueName = model.TrueName.Trim();
                user.UserName = model.UserName.Trim();
                user.Address = model.Address;
                user.Phone = model.Phone;
                user.Email = model.Email;
                user.UpdateDate = DateTime.Now;
                _userReps.Update(user);
                return new OperationResult(OperationResultType.Success, "更新数据成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "更新数据失败!");
            }
        }

        public OperationResult Delete(IEnumerable<UserVM> list)
        {
            try
            {
                if (list != null)
                {
                    var userIds = list.Select(c => c.Id).ToList();
                    int count = _userReps.Delete(c => userIds.Contains(c.Id));
                    if (count > 0)
                    {
                        return new OperationResult(OperationResultType.Success, "删除数据成功！");
                    }
                    return new OperationResult(OperationResultType.Error, "删除数据失败!");
                }
                return new OperationResult(OperationResultType.ParamError, "参数错误，请选择需要删除的数据!");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "删除数据失败!");
            }
        }

        public OperationResult ResetPassword(IEnumerable<UserVM> list)
        {
            var listIds = list.Select(c => c.Id).ToList();
            try
            {
                string md5Pwd = EncryptionHelper.GetMd5Hash("123456");
                _userReps.Update(u => listIds.Contains(u.Id), u => new Users() { Password = md5Pwd });
                return new OperationResult(OperationResultType.Success, "密码重置成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "密码重置失败!");
            }
        }

        public OperationResult UpdateUserRoles(int userId, string[] chkRoles)
        {
            try
            {
                int[] idInts = Array.ConvertAll<string, int>(chkRoles, Convert.ToInt32);

                using (var scope = new TransactionScope())
                {
                    _ctx.RoleUsers.Where(c => c.User_Id == userId).Delete();
                    var userRoles = idInts.Select(id => new RoleUsers()
                    {
                        User_Id = userId,
                        Role_Id = id
                    }).ToList();
                    if (userRoles.Count > 0)
                    {
                        _ctx.RoleUsers.AddRange(userRoles);
                        _ctx.SaveChanges();
                    }
                    scope.Complete();
                }
                #region 重置权限缓存
                var roleIdsByUser = idInts.ToList();
                List<Permissions> permissions = new List<Permissions>();

                var roleIdsByUserGroup = (from ur in _ctx.UserGroupRoles
                                          join uu in _ctx.UserGroupUsers on ur.UserGroup_Id equals uu.UserGroup_Id
                                          where uu.User_Id == userId
                                          select ur.Role_Id).ToList();
                roleIdsByUser.AddRange(roleIdsByUserGroup);
                var roleIds = roleIdsByUser.Distinct().ToList();
                permissions = (from r in _ctx.Roles
                               join pr in _ctx.PermissionRoles on r.Id equals pr.Role_Id
                               join p in _ctx.Permissions on pr.Permission_Id equals p.Id
                               where roleIds.Contains(r.Id) && r.Enabled == true
                               select p).Distinct().ToList();

                var strKey = CacheKey.StrPermissionsByUid + "_" + userId;
                //设置Cache滑动过期时间
                CacheHelper.SetCache(strKey, permissions, Cache.NoAbsoluteExpiration, FormsAuthentication.Timeout);
                #endregion

                return new OperationResult(OperationResultType.Success, "设置用户角色成功！");

            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "设置用户角色失败!");
            }
        }

        public OperationResult UpdateUserGroups(int userId, string[] chkUserGroups)
        {
            try
            {
                int[] idInts = Array.ConvertAll(chkUserGroups, Convert.ToInt32);
                _ctx.UserGroupUsers.Where(c => c.User_Id == userId).Delete();
                var userGroupUsers = idInts.Select(id => new UserGroupUsers()
                {
                    User_Id = userId,
                    UserGroup_Id = id
                }).ToList();

                if (userGroupUsers.Count > 0)
                {
                    _ctx.UserGroupUsers.AddRange(userGroupUsers);
                }
                _ctx.SaveChanges();

                ResetPermissiionsCache(userId, idInts);
                return new OperationResult(OperationResultType.Success, "设置用户组成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "设置用户组失败!");
            }
        }

        public OperationResult EditPersionalInfo(PersonalInfoVM vm)
        {
            try
            {
                var user = _userReps.FirstOrDefault(c => c.Id == vm.Id && c.Enabled == true);
                if (user == null)
                {
                    throw new Exception();
                }
                if (user.Password != EncryptionHelper.GetMd5Hash(vm.Password.Trim()))
                {
                    return new OperationResult(OperationResultType.Error, "旧密码不正确。");
                }
                if (!vm.NewPassword.Equals(vm.ComfirmPassword))
                {
                    return new OperationResult(OperationResultType.Error, "两次输入的新密码不相同，请重新输入");
                }
                var pwd = EncryptionHelper.GetMd5Hash(vm.NewPassword.Trim());
                _userReps.Update(c => c.Id == vm.Id, u => new Users()
                {
                    Password = pwd,
                    UpdateDate = DateTime.Now
                });
                return new OperationResult(OperationResultType.Success, "密码修改成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "密码修改失败!");
            }
        }

        public OperationResult UploadMyImg(string url, string currentUserId)
        {
            if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(currentUserId))
                return new OperationResult(OperationResultType.Error, "上传错误，请重新上传");
            try
            {
                int userId = Convert.ToInt32(currentUserId);
                var user = _userReps.FirstOrDefault(c => c.Id == userId && c.Enabled == true);
                if (user == null)
                {
                    return new OperationResult(OperationResultType.Error, "当前用户不存在或已被禁用。");
                }
                _userReps.Update(c => c.Id == userId, u => new Users()
                {
                    ImgUrl = url,
                    UpdateDate = DateTime.Now
                });
                return new OperationResult(OperationResultType.Success, "头像修改成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "头像修改失败!");
            }

        }

        public void Export<TS>(Expression<Func<Users, bool>> wh, Expression<Func<Users, TS>> orderByLambda,
            bool isAsc = true)
        {
            var list = _userReps.ToListEx(wh, q => new UserExport()
            {
                UserName = q.UserName,
                Address = q.Address,
                Enabled = q.Enabled ? "是" : "否",
                Email = q.Email,
                Phone = q.Phone,
                TrueName = q.TrueName,
                UpdateDate = q.UpdateDate
            }, orderByLambda, isAsc);
            _excelNpoi.HttpExport(list, string.Format("用户名单_{0:yyyyMMddHHmmss}", DateTime.Now));
        }

        #region 私有函数
        private void ResetPermissiionsCache(int userId, int[] idInts)
        {
            var roleIdsByUser = _ctx.RoleUsers.Where(c => c.User_Id == userId).Select(r => r.Role_Id).ToList();
            var roleIdsByUserGroup = idInts.ToList();
            roleIdsByUser.AddRange(roleIdsByUserGroup);
            var roleIds = roleIdsByUser.Distinct().ToList();
            var permissions = (from r in _ctx.Roles
                               join pr in _ctx.PermissionRoles on r.Id equals pr.Role_Id
                               join p in _ctx.Permissions on pr.Permission_Id equals p.Id
                               where roleIds.Contains(r.Id) && r.Enabled == true
                               select p).Distinct().ToList();
            var strKey = CacheKey.StrPermissionsByUid + "_" + userId;
            //设置Cache滑动过期时间
            CacheHelper.SetCache(strKey, permissions, Cache.NoAbsoluteExpiration, FormsAuthentication.Timeout);
        } 
        #endregion
    }
}
