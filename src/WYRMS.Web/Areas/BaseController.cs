using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WYRMS.Web.Extension.Filters;

namespace WYRMS.Web.Areas
{
    [GlobalAuthorize]
    public class BaseController : Controller
    {
        [NonAction]
        protected List<SelectListItem> GetSelectListItems(Type enumType, int defaultSelectId = -1)
        {
            var arry = Enum.GetValues(enumType);
            return (from object item in arry
                    select new SelectListItem()
                    {
                        Text = item.ToString(),
                        Value = ((int)item).ToString(),
                        Selected = defaultSelectId == (int)item
                    }).ToList();
        }
    }
}
