using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WYRMS.Tools.Extensions
{
    public static class TryParseException
    {
        public static DateTime? TryDateTime(this object o, DateTime? nullValue = new DateTime?())
        {
            DateTime time;
            if ((o != null) && DateTime.TryParse(o.ToString(), out time))
            {
                return time;
            }
            return nullValue;
        }

    }
}
