using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WYRMS.Tools.helpers
{
   public class OrderHelper
    {

        /// <summary>
        /// 创建订单--订单编号统一此处生成，无视参数赋值
        /// </summary>
        /// <param name="od"></param>
        /// <returns></returns>
        public static string GetOrdersnum(string user_id, string productType)
        {

            Random r = new Random(BitConverter.ToInt32(Guid.NewGuid().ToByteArray(), 0));

            string orderNumber = productType + user_id + DateTime.Now.ToString("yyMMddHHmmssfff") + r.Next(99).ToString();

            return orderNumber;

        }



    }
}
