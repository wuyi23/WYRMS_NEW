using System;
using System.Text;
//using J.Helper;

namespace WYRMS.Tools.helpers
{
    public class SmsMsg
    {
        public static string RandIntCode(int n)
        {
            char[] chArray = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
            StringBuilder builder = new StringBuilder();
            Random random = new Random(DateTime.Now.Millisecond);
            for (int i = 0; i < n; i++)
            {
                builder.Append(chArray[random.Next(0, chArray.Length)].ToString());
            }
            return builder.ToString();
        }

        public static bool sendSMS(string moblieNo, string msg, ref string respose)
        {
            string urlAndParameter = string.Format("{0}?account={1}&pswd={2}&mobile={3}&msg={4}&needstatus=true&extno=", new object[] { Smsconfig.SmsSendUrl, Smsconfig.SmsName, Smsconfig.SmsPwd, moblieNo, msg });
            try
            {
                //string str2 = Http.HttpGet(urlAndParameter);
                //respose = str2;
                return true;
            }
            catch (Exception exception)
            {
                respose = exception.Message;
                return false;
            }
        }



    }


    public class Smsconfig
    {
        public static string SmsName
        {
            get
            {
                return "BG1MSZL_GW";
            }
        }

        public static string SmsPwd
        {
            get
            {
                return "Globalwings2017";
            }
        }

        public static string SmsSendUrl
        {
            get
            {
                return "https://sapi.253.com/msg/HttpBatchSendSM";
            }
        }
    }
}
