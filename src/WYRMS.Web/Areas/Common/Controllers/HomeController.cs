using System.Web.Mvc;

namespace WYRMS.Web.Areas.Common.Controllers
{
    public class HomeController : BaseController
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }
    }
}
