
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using WYRMS.DAL;
using WYRMS.DAL.Interfaces;
using WYRMS.Domain.Model;
using WYRMS.Tools;
using WYRMS.ViewModel.Member;

namespace WYRMS.CoreBLL.Service.Member
{
    public class ModuleService : IService
    {
        private readonly IRepository<Modules> _moduleReps;
        private readonly IRepository<Permissions> _permissionReps;
        private readonly IDbContextFactory _ctxFac;

        public ModuleService(IRepository<Modules> moduleReps, IRepository<Permissions> permissionReps, IDbContextFactory ctxFac)
        {
            _moduleReps = moduleReps;
            _permissionReps = permissionReps;
            _ctxFac = ctxFac;
        }

        public Modules GetModule(Expression<Func<Modules, bool>> wh)
        {
            return _moduleReps.FirstOrDefault(wh);
        }

        /// <summary>
        /// 获取模块分页列表
        /// </summary>
        /// <param name="wh">查询where表达式</param>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        public IList<ModuleVM> GetListModuleVM(Expression<Func<Modules, bool>> wh, int limit, int offset, out int total)
        {

            var q = from m1 in _ctxFac.Ctx.Modules.Where(wh)
                    join m2 in _ctxFac.Ctx.Modules on m1.ParentId equals m2.Id into joinModule
                    from item in joinModule.DefaultIfEmpty()
                    select new ModuleVM
                    {
                        Id = m1.Id,
                        Name = m1.Name,
                        LinkUrl = m1.LinkUrl,
                        IsMenu = m1.IsMenu,
                        Code = m1.Code,
                        Description = m1.Description,
                        Enabled = m1.Enabled,
                        ParentName = item.Name,
                        UpdateDate = m1.UpdateDate,
                        Icon = m1.Icon
                    };
            total = q.Count();
            if (offset >= 0)
            {
                return q.OrderBy(c => c.Code).Skip(offset).Take(limit).ToList();
            }
            return q.ToList();
        }

        public OperationResult Insert(ModuleVM model)
        {
            try
            {
                Modules oldModule = _moduleReps.FirstOrDefault(c => c.Name == model.Name.Trim());
                if (oldModule != null)
                {
                    return new OperationResult(OperationResultType.Warning, "数据库中已经存在相同名称的模块，请修改后重新提交！");
                }
                var entity = new Modules
                {
                    Name = model.Name.Trim(),
                    ParentId = model.ParentId,
                    LinkUrl = model.LinkUrl,
                    IsMenu = model.IsMenu,
                    Code = model.Code,
                    Description = model.Description,
                    Enabled = model.Enabled,
                    UpdateDate = DateTime.Now,
                    Icon = model.Icon
                };
                _moduleReps.Add(entity);
                return new OperationResult(OperationResultType.Success, "新增数据成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "新增数据失败，数据库插入数据时发生了错误!");
            }
        }

        public OperationResult Update(ModuleVM model)
        {
            try
            {
                var modules = _moduleReps.FirstOrDefault(c => c.Id == model.Id);
                if (modules == null)
                {
                    throw new Exception();
                }
                var other = _moduleReps.FirstOrDefault(c => c.Id != model.Id && c.Name == model.Name.Trim());
                if (other != null)
                {
                    return new OperationResult(OperationResultType.Warning, "数据库中已经存在相同名称的模块，请修改后重新提交！");
                }
                modules.Name = model.Name.Trim();
                modules.ParentId = model.ParentId;
                modules.LinkUrl = model.LinkUrl;
                modules.IsMenu = model.IsMenu;
                modules.Code = model.Code;
                modules.Description = model.Description;
                modules.Enabled = model.Enabled;
                modules.UpdateDate = DateTime.Now;
                modules.Icon = model.Icon;
                _moduleReps.Update(modules);
                //禁用模块，则模块下的权限也要禁用
                if (!modules.Enabled)
                {
                    _permissionReps.Update(c => c.ModuleId == modules.Id, u => new Permissions()
                    {
                        Enabled = false
                    });
                }
                return new OperationResult(OperationResultType.Success, "更新数据成功！");
            }
            catch
            {
                return new OperationResult(OperationResultType.Error, "更新数据失败!");
            }
        }

        public OperationResult Delete(IEnumerable<ModuleVM> list)
        {
            try
            {
                if (list != null)
                {
                    var moduleIds = list.Select(c => c.Id).ToList();
                    int count = _moduleReps.Delete(c => moduleIds.Contains(c.Id));
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
        /// 返回实体部分字段列表
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        public IList<TResult> ToListEx<TResult>(Expression<Func<Modules, bool>> whereLambda,
            Expression<Func<Modules, TResult>> selector)
        {
            return _moduleReps.ToListEx(whereLambda, selector);
        }

    }
}