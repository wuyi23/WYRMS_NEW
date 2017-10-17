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
    /// date：2017/10/17 星期二 10:39:58
    /// Summary description for UserGroupUsersSvc
    /// </summary>
  public  class UserGroupUsersSvc:IService
    {
        private readonly IRepository<UserGroupUsers> _userGroupUsersReps;

        public UserGroupUsersSvc(IRepository<UserGroupUsers> userGroupUsersReps)
        {
            _userGroupUsersReps = userGroupUsersReps;
        }

        /// <summary>
        /// 返回实体部分字段列表
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
      public IList<TResult> ToListEx<TResult>(Expression<Func<UserGroupUsers, bool>> whereLambda, Expression<Func<UserGroupUsers, TResult>> selector)
        {
            return _userGroupUsersReps.ToListEx(whereLambda, selector);
        }
    }
}
