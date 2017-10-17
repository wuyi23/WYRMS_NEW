using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Transactions;
using EntityFramework.Extensions;
using WYRMS.DAL.Interfaces;
using WYRMS.Domain.Model;
using WYRMS.Tools;
using WYRMS.ViewModel;
using WYRMS.ViewModel.Member;

namespace WYRMS.CoreBLL.Service.Member
{
    public class RoleService : IService
    {
        private readonly IRepository<Roles> _roleReps;
        private readonly IDbContextFactory _ctxFac;

        public RoleService(IRepository<Roles> roleReps, IDbContextFactory ctxFac)
        {
            _roleReps = roleReps;
            _ctxFac = ctxFac;
        }

        public Roles GetRole(Expression<Func<Roles, bool>> wh)
        {
            return _roleReps.FirstOrDefault(wh);
        }

        /// <summary>
        /// 获取角色分页列表
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
        public IList<Roles> GetPageList<TS, TSt>(int offset, int limit, out int total, Expression<Func<Roles, bool>> wh, Expression<Func<Roles, TS>> orderByLambda, Expression<Func<Roles, TSt>> thenByLambda, bool isAscOrderBy = true, bool isAscThenBy = true)
        {
            return _roleReps.ToPageList(offset, limit, out total, wh, orderByLambda, thenByLambda, isAscOrderBy, isAscThenBy);
        }

        public OperationResult Insert(RoleVM model)
        {
            try
            {
                Roles oldRole = _roleReps.FirstOrDefault(c => c.RoleName == model.RoleName.Trim());
                if (oldRole != null)
                {
                    return new OperationResult(OperationResultType.Warning, "数据库中已经存在相同名称的角色，请修改后重新提交！");
                }
                var entity = new Roles
                {
                    RoleName = model.RoleName.Trim(),
                    Description = model.Description,
                    OrderSort = model.OrderSort,
                    Enabled = model.Enabled,
                    UpdateDate = DateTime.Now
                };
                _roleReps.Add(entity);
                return new OperationResult(OperationResultType.Success, "新增数据成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "新增数据失败，数据库插入数据时发生了错误!");
            }
        }

        public OperationResult Update(RoleVM model)
        {
            try
            {
                var oldRole = _roleReps.FirstOrDefault(c => c.Id == model.Id);
                if (oldRole == null)
                {
                    throw new Exception();
                }
                var other = _roleReps.FirstOrDefault(c => c.Id != model.Id && c.RoleName == model.RoleName.Trim());
                if (other != null)
                {
                    return new OperationResult(OperationResultType.Warning, "数据库中已经存在相同名称的角色，请修改后重新提交！");
                }
                oldRole.RoleName = model.RoleName.Trim();
                oldRole.Description = model.Description;
                oldRole.OrderSort = model.OrderSort;
                oldRole.Enabled = model.Enabled;
                oldRole.UpdateDate = DateTime.Now;
                _roleReps.Update(oldRole);
                return new OperationResult(OperationResultType.Success, "更新数据成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "更新数据失败!");
            }
        }

        public OperationResult Delete(IEnumerable<RoleVM> list)
        {
            try
            {
                if (list != null)
                {
                    var roleIds = list.Select(c => c.Id).ToList();
                    int count = _roleReps.Delete(c => roleIds.Contains(c.Id));
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

        /// <summary>
        /// 构造树的数据源
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IList<ZTreeVM> GetListZTreeVM(int id)
        {
            List<ZTreeVM> result = new List<ZTreeVM>();

            List<double> permissionIds = _ctxFac.Ctx.PermissionRoles.Where(c => c.Role_Id == id).Select(c => c.Permission_Id + 0.5).ToList();
            List<ZTreeVM> mouduleNodes = _ctxFac.Ctx.Modules.Where(c => c.Enabled == true).OrderBy(c => c.Code).Select(c => new ZTreeVM
            {
                id = c.Id,
                pId = c.ParentId,
                name = c.Name,
                isParent = !c.ParentId.HasValue,
                open = !c.ParentId.HasValue
            }).ToList();
            List<ZTreeVM> permissionNodes =
                _ctxFac.Ctx.Permissions.Where(c => c.Enabled == true).Select(c => new ZTreeVM()
                {
                    id = c.Id + 0.5,
                    pId = c.ModuleId,
                    name = c.Name
                }).ToList();
            foreach (var node in permissionNodes)
            {
                if (permissionIds.Contains(node.id))
                {
                    node.@checked = true;
                }
            }
            result.AddRange(mouduleNodes);
            result.AddRange(permissionNodes);
            return result;
        }

        //更新权限授权
        public OperationResult UpdateAuthorize(int roleId, int[] ids)
        {
            try
            {
                var oldRole = _roleReps.FirstOrDefault(c => c.Id == roleId);
                if (oldRole == null)
                {
                    return new OperationResult(OperationResultType.Error, "角色不存在，更新角色权限失败!");
                }

                using (var scope = new TransactionScope())
                {
                    _ctxFac.Ctx.PermissionRoles.Where(c => c.Role_Id == roleId).Delete();

                    var permissionRoles = ids.Select(id => new PermissionRoles()
                    {
                        Role_Id = roleId,
                        Permission_Id = id
                    }).ToList();
                    if (permissionRoles.Count > 0)
                    {
                        _ctxFac.Ctx.PermissionRoles.AddRange(permissionRoles);
                        _ctxFac.Ctx.SaveChanges();
                    }
                    scope.Complete();
                }
                return new OperationResult(OperationResultType.Success, "更新角色权限成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "更新角色权限失败!");
            }
        }

        /// <summary>
        /// 返回实体部分字段列表
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        public List<TResult> ToListEx<TResult>(Expression<Func<Roles, bool>> whereLambda, Expression<Func<Roles, TResult>> selector)
        {
            return _roleReps.ToListEx(whereLambda, selector);
        }
    }
}
