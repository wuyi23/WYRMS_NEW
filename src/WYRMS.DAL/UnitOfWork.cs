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
    /// date：2017/10/12 星期四 14:08:55
    /// Summary description for UnitOfWork
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SysEntities _ctx;

        public UnitOfWork(SysEntities ctx)
        {
            _ctx = ctx;
        }

        public int Commit()
        {
            return _ctx.SaveChanges();
        }
    }
}
