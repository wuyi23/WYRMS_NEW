using System.Web.Mvc;

namespace WYRMS.Web.Areas.Common
{
    public class CommonAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Common";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Common_default1",
                "Common/{controller}/{action}/{id}",
                new {id = UrlParameter.Optional },
                new string[] { "WYRMS.Web.Areas.Common.Controllers" }
            );
        }
    }
}
