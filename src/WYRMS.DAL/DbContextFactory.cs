using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WYRMS.DAL.Interfaces;
using WYRMS.Domain.Model;

namespace WYRMS.DAL
{
    /// <summary>
    /// auth：吴毅
    /// date：2017/10/17 星期二 11:08:36
    /// Summary description for DbContextFactory
    /// </summary>
    public class DbContextFactory : IDbContextFactory
    {
        private readonly SysEntities _ctx;

        public DbContextFactory(SysEntities ctx)
        {
            _ctx = ctx;
        }

        public SysEntities Ctx
        {
            get
            {
                return _ctx;
            }
        }
    }
}
