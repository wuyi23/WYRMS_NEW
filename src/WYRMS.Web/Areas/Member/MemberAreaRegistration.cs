using System.Web.Mvc;

namespace WYRMS.Web.Areas.Member
{
    public class MemberAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Member";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Member_default1",
                "Member/{controller}/{action}/{id}",
                new {id = UrlParameter.Optional },
                new string[] { "WYRMS.Web.Areas.Member.Controllers" }
            );
        }
    }
}
