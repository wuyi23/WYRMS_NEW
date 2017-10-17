/************************************
 * 描述：尚未添加描述
 * 作者：吴毅
 * 日期：2015/11/20 15:16:38  
*************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using WYRMS.DAL.Interfaces;
using WYRMS.Domain.Model;
using WYRMS.Tools;
using WYRMS.ViewModel.Member;

namespace WYRMS.CoreBLL.Service.Member
{
    public class PermissionService : IService
    {
        private readonly IRepository<Permissions> _permissionReps;
        private readonly IDbContextFactory _ctxFac;

        public PermissionService(IRepository<Permissions> permissionReps,  IDbContextFactory ctxFac)
        {
            _permissionReps = permissionReps;
            _ctxFac = ctxFac;
        }


        public Permissions GetPermission(Expression<Func<Permissions, bool>> wh)
        {
            return _permissionReps.FirstOrDefault(wh);
        }

        /// <summary>
        /// 获取模块分页列表
        /// </summary>
        /// <param name="wh">查询where表达式</param>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        public IList<PermissionVM> GetListPermissionVM(Expression<Func<Permissions, bool>> wh, int limit, int offset, out int total)
        {
            var q = from p in _ctxFac.Ctx.Permissions.Where(wh)
                    join m in _ctxFac.Ctx.Modules on p.ModuleId equals m.Id into joinModule
                    from item in joinModule
                    select new PermissionVM
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Code = p.Code,
                        Description = p.Description,
                        Enabled = p.Enabled,
                        UpdateDate = p.UpdateDate,
                        ModuleId = item.Id,
                        ModuleName = item.Name
                    };
            total = q.Count();
            if (offset >= 0)
            {
                return q.OrderBy(c => c.ModuleId).ThenBy(c => c.Code).Skip(offset).Take(limit).ToList();
            }
            return q.ToList();
        }

        public OperationResult Insert(PermissionVM model)
        {
            try
            {
                var isExist = _permissionReps.Exist(
                      c => c.ModuleId == model.ModuleId && (c.Name == model.Name.Trim() || c.Code == model.Code.Trim()));
                if (isExist)
                {
                    return new OperationResult(OperationResultType.Warning, "该模块中已经存在相同名称或编码的权限，请修改后重新提交！");
                }
                var entity = new Permissions
                {
                    Name = model.Name,
                    ModuleId = model.ModuleId,
                    Code = model.Code,
                    Description = model.Description,
                    Enabled = model.Enabled,
                    UpdateDate = DateTime.Now
                };
                _permissionReps.Add(entity);
                return new OperationResult(OperationResultType.Success, "新增数据成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "新增数据失败，数据库插入数据时发生了错误!");
            }
        }

        public OperationResult Update(PermissionVM model)
        {
            try
            {
                var permissions = _permissionReps.FirstOrDefault(c => c.Id == model.Id);
                if (permissions == null)
                {
                    throw new Exception();
                }
                var other = _permissionReps.FirstOrDefault(c => c.Id != model.Id && c.ModuleId == model.ModuleId 
                                                    && (c.Name == model.Name.Trim() || c.Code == model.Code));
                if (other != null)
                {
                    return new OperationResult(OperationResultType.Warning, "该模块中已经存在相同名称或编码的权限，请修改后重新提交！");
                }
                permissions.Name = model.Name.Trim();
                permissions.ModuleId = model.ModuleId;
                permissions.Code = model.Code;
                permissions.Description = model.Description;
                permissions.Enabled = model.Enabled;
                permissions.UpdateDate = DateTime.Now;
                _permissionReps.Update(permissions);
                return new OperationResult(OperationResultType.Success, "更新数据成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "更新数据失败!");
            }
        }

    }
}
