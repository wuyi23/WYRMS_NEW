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

        #region 广告管理模块

        /// <summary>
        /// 广告分类1、web、2、拼机、3、特惠包机、4、空中巴士
        /// </summary>
        public enum AdType
        {
            Web = 1,
            拼机 = 2,
            特惠包机 = 3,
            空中巴士 = 4,
            私享家=5,
        }

        /// <summary>
        /// 1、上架  0、下架
        /// </summary>
        public enum IsShow
        {
            下架 = 0,
            上架 = 1
        }

        /// <summary>
        /// 显示类型：1、启动，2为首页banner
        /// </summary>
        public enum AdShowType
        {
            启动 = 1,
            首页banner = 2,
            拼机详情页页广告 = 3,
            空中巴士详情页广告 = 4,
            特惠包机详情页广告 = 5
        }


        public enum Online
        {
            内文=0,
            外链=1
        }

        #endregion

        #region 优惠卷管理模块

        /// <summary>
        /// 优惠券场景：1、拼机；2、空中巴士；3、特惠包机；4、包机
        /// </summary>
        public enum CouponScene
        {
            拼机 = 1,
            空中巴士 = 2,
            特惠包机 = 3,
            包机 = 4
        }

        /// <summary>
        /// 优惠券状态：1、开启；2、关闭；
        /// </summary>
        public enum CouponState
        {
            开启 = 1,
            关闭 = 2
        }

        /// <summary>
        /// 优惠券获取渠道：1、注册获得；2、活动赠送；3、生日赠送；4、邀请好友获得
        /// </summary>
        public enum CouponSourceChanel
        {
            注册获得 = 1,
            活动赠送 = 2,
            生日赠送 = 3,
            邀请好友获得 = 4
        }

        #endregion

        #region 红包管理模块
        /// <summary>
        /// 红包场景：1、拼机；2、空中巴士；3、特惠包机；4、包机；
        /// </summary>
        public enum RedPacketScene
        {
            拼机 = 1,
            空中巴士 = 2,
            特惠包机 = 3,
            包机 = 4
        }
        #endregion

        #region 用户优惠卷
        /// <summary>
        ///优惠卷类型（  普通优惠卷 = 0,  红包优惠卷 = 1）
        /// </summary>
        public enum CouponTye
        {
            普通优惠卷 = 0,
            红包优惠卷 = 1
        }
        /// <summary>
        /// 用户优惠券状态：1、未使用；2、已使用；3、已失效；4、（系统）撤销
        /// </summary>
        public enum UserCouponState
        {
            未使用 = 1,
            已使用 = 2,
            已失效 = 3,
            系统撤销 = 4
        }

        #endregion

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
