/************************************
 * 描述：尚未添加描述
 * 作者：吴毅
 * 日期：2016/3/28 14:54:31  
*************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Transactions;
using EntityFramework.Extensions;
using WYRMS.DAL.Interfaces;
using WYRMS.Domain.Model;
using WYRMS.Tools;
using WYRMS.ViewModel.Member;

namespace WYRMS.CoreBLL.Service.Member
{
    public class UserGroupService : IService
    {
        private readonly IRepository<UserGroups> _userGroupReps;
        private readonly IDbContextFactory _ctxFac;

        public UserGroupService(IRepository<UserGroups> userGroupReps,IDbContextFactory ctxFac)
        {
            _userGroupReps = userGroupReps;
            _ctxFac = ctxFac;
        }

        public UserGroups GetUserGroup(Expression<Func<UserGroups, bool>> wh)
        {
            return _userGroupReps.FirstOrDefault(wh);
        }

        /// <summary>
        /// 获取用户组分页列表
        /// </summary>
        /// <param name="wh">查询where表达式</param>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <param name="total"></param>
        /// <param name="orderByLambda"></param>
        /// <param name="thenByLambda"></param>
        /// <param name="isAscOrderBy"></param>
        /// <param name="isAscThenBy"></param>
        /// <returns></returns>
        public IList<UserGroups> GetPageList<TS, TSt>(int offset, int limit, out int total, Expression<Func<UserGroups, bool>> wh, Expression<Func<UserGroups, TS>> orderByLambda, Expression<Func<UserGroups, TSt>> thenByLambda, bool isAscOrderBy = true, bool isAscThenBy = true)
        {
            return _userGroupReps.ToPageList(offset, limit, out total, wh, orderByLambda, thenByLambda, isAscOrderBy, isAscThenBy);
        }

        public OperationResult Insert(UserGroupVM model)
        {
            try
            {
                UserGroups oldGroup = _userGroupReps.FirstOrDefault(c => c.GroupName == model.GroupName.Trim());
                if (oldGroup != null)
                {
                    return new OperationResult(OperationResultType.Warning, "数据库中已经存在相同名称的用户组，请修改后重新提交！");
                }
                var entity = new UserGroups()
                {
                    GroupName = model.GroupName.Trim(),
                    Description = model.Description,
                    OrderSort = model.OrderSort,
                    Enabled = model.Enabled,
                    UpdateDate = DateTime.Now
                };
                _userGroupReps.Add(entity);
                return new OperationResult(OperationResultType.Success, "新增数据成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "新增数据失败，数据库插入数据时发生了错误!");
            }
        }

        public OperationResult Update(UserGroupVM model)
        {
            try
            {
                var oldRole = _userGroupReps.FirstOrDefault(c => c.Id == model.Id);
                if (oldRole == null)
                {
                    return new OperationResult(OperationResultType.Error, "更新数据失败!");
                }
                var other = _userGroupReps.FirstOrDefault(c => c.Id != model.Id && c.GroupName == model.GroupName.Trim());
                if (other != null)
                {
                    return new OperationResult(OperationResultType.Warning, "数据库中已经存在相同名称的用户组，请修改后重新提交！");
                }
                oldRole.GroupName = model.GroupName.Trim();
                oldRole.Description = model.Description;
                oldRole.OrderSort = model.OrderSort;
                oldRole.Enabled = model.Enabled;
                oldRole.UpdateDate = DateTime.Now;
                _userGroupReps.Update(oldRole);
                return new OperationResult(OperationResultType.Success, "更新数据成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "更新数据失败!");
            }
        }

        public OperationResult Delete(IEnumerable<UserGroupVM> list)
        {
            try
            {
                if (list != null)
                {
                    var groupIds = list.Select(c => c.Id).ToList();
                    int count = _userGroupReps.Delete(c => groupIds.Contains(c.Id));
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

        public OperationResult UpdateUserGroupRoles(int userGroupId, string[] chkRoles)
        {
            try
            {
                int[] idInts = Array.ConvertAll<string, int>(chkRoles, Convert.ToInt32);
                var oldUserGroup = _userGroupReps.FirstOrDefault(c => c.Id == userGroupId);
                if (oldUserGroup == null)
                {
                    return new OperationResult(OperationResultType.Error, "该用户组不存在，设置用户组角色失败!");
                }

                using (var scope = new TransactionScope())
                {
                    _ctxFac.Ctx.UserGroupRoles.Where(c => c.UserGroup_Id == userGroupId).Delete();
                    var userGroupRoles = idInts.Select(id => new UserGroupRoles()
                    {
                        UserGroup_Id = userGroupId,
                        Role_Id = id
                    }).ToList();
                    if (userGroupRoles.Count > 0)
                    {
                        _ctxFac.Ctx.UserGroupRoles.AddRange(userGroupRoles);
                    }
                    _ctxFac.Ctx.SaveChanges();
                    scope.Complete();
                }
                return new OperationResult(OperationResultType.Success, "设置用户组角色成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "设置用户组角色失败!");
            }
        }

        /// <summary>
        /// 返回实体部分字段列表
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        public List<TResult> ToListEx<TResult>(Expression<Func<UserGroups, bool>> whereLambda, Expression<Func<UserGroups, TResult>> selector)
        {
            return _userGroupReps.ToListEx(whereLambda, selector);
        }
    }
}
