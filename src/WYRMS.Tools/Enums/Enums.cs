using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WYRMS.Tools.Enums
{
    /// <summary>
    /// 枚举统一管理类
    /// </summary>
    public static class Enums
    {

        #region 用户信息管理

        /// <summary>
        /// 会员类别：1、普通用户，2、个人卡会员，3、董事卡会员
        /// </summary>
        public enum VipCategory
        {
            普通用户 = 1,
            个人卡会员 = 2,
            董事卡会员 = 3
        }

        #endregion


    }
}
