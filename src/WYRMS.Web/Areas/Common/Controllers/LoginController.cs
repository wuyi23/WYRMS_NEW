using System;
using System.Web.Mvc;
using WYRMS.CoreBLL.Service.Member;
using WYRMS.Tools;
using WYRMS.ViewModel;

namespace WYRMS.Web.Areas.Common.Controllers
{
    public class LoginController : BaseController
    {

        private readonly AccountService _accountService;

        public LoginController(AccountService accountService)
        {
            _accountService = accountService;
        }


        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Index(LoginVM loginVM)
        {
            try
            {
                OperationResult result = _accountService.Login(loginVM);
                return Json(result);
            }
            catch (Exception ex)
            {
                var result = new OperationResult(OperationResultType.Error, ex.Message);
                return Json(result);
            }

        }

        public ActionResult Logout()
        {
            _accountService.Logout();
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult GetCheckCode(string name, string pwd)
        {
            OperationResult result = _accountService.SendCheckCode(name, pwd);
            return Json(result);
        }

    }
}
