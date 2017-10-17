using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Web;

namespace WYRMS.Tools.helpers
{
    public class CommonTools
    {

        public static string ImageUrlConvert(string url)
        {
            if (!string.IsNullOrWhiteSpace(url))
            {
                if (url.Contains(":"))
                {

                    return url;

                }
                else
                {

                    return ConfigurationManager.AppSettings["Images_url"].ToString() + url;
                }
            }
            else
            {

                return ConfigurationManager.AppSettings["Images_url"] + ConfigurationManager.AppSettings["DefaultAvatar_url"];
            
            }



        }

        public static string GlobalwingsIcon()
        {

            return ConfigurationManager.AppSettings["Images_url"].ToString() +
                   ConfigurationManager.AppSettings["GlobalwingsIcon"].ToString();


        }

        public static string DateFormatToString(DateTime dt)
        {
            TimeSpan span = (DateTime.Now - dt).Duration();
            if (span.TotalDays > 60)
            {
                return dt.ToString("yyyy-MM-dd");
            }
            else if (span.TotalDays > 30)
            {
                return "1个月前";
            }
            else if (span.TotalDays > 14)
            {
                return "2周前";
            }
            else if (span.TotalDays > 7)
            {
                return "1周前";
            }
            else if (span.TotalDays > 1)
            {
                return string.Format("{0}天前", (int)Math.Floor(span.TotalDays));
            }
            else if (span.TotalHours > 1)
            {
                return string.Format("{0}小时前", (int)Math.Floor(span.TotalHours));
            }
            else if (span.TotalMinutes > 1)
            {
                return string.Format("{0}分钟前", (int)Math.Floor(span.TotalMinutes));
            }
            else if (span.TotalSeconds >= 1)
            {
                return string.Format("{0}秒前", (int)Math.Floor(span.TotalSeconds));
            }
            else
            {
                return "1秒前";
            }
        }

        public static string GetserviceHost()
        {


           return ConfigurationManager.AppSettings["LoginWebsite"];
            

        }

    }
}
