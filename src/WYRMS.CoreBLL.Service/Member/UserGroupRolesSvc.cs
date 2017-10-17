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
    /// date：2017/10/17 星期二 09:46:19
    /// Summary description for UserGroupRolesSvc
    /// </summary>
    public class UserGroupRolesSvc : IService
    {
        private readonly IRepository<UserGroupRoles> _userGroupRolesReps;

        public UserGroupRolesSvc(IRepository<UserGroupRoles> userGroupRolesReps)
        {
            _userGroupRolesReps = userGroupRolesReps;
        }

        /// <summary>
        /// 返回实体部分字段列表
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        public IList<TResult> ToListEx<TResult>(Expression<Func<UserGroupRoles, bool>> whereLambda, Expression<Func<UserGroupRoles, TResult>> selector)
        {
            return _userGroupRolesReps.ToListEx(whereLambda, selector);
        }
    }
}
