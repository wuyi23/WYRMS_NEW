using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WYRMS.DAL.Interfaces;
using WYRMS.Domain.Model;

namespace WYRMS.CoreBLL.Service.Member
{
    /// <summary>
    /// auth：吴毅
    /// date：2017/10/17 星期二 10:35:43
    /// Summary description for RoleUsersSvc
    /// </summary>
    public class RoleUsersSvc:IService
    {

        private readonly IRepository<RoleUsers> _roleUsersReps;

        public RoleUsersSvc(IRepository<RoleUsers> roleUsersReps)
        {
            _roleUsersReps = roleUsersReps;
        }

        /// <summary>
        /// 返回实体部分字段列表
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        public IList<TResult> ToListEx<TResult>(Expression<Func<RoleUsers, bool>> whereLambda, Expression<Func<RoleUsers, TResult>> selector)
        {
            return _roleUsersReps.ToListEx(whereLambda, selector);
        }
    }
}
