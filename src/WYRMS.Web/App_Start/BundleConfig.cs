using System.Web.Optimization;

namespace WYRMS.Web
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                //"~/Scripts/jquery-{version}.js",
                    "~/Scripts/AdminLTE2.3.0/plugins/jQuery/jQuery-2.1.4.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(

                "~/Resources/js/app.js",
                  "~/Resources/js/backstretch.js",
                  "~/Resources/vendors/granim/js/granim.min.js",
                   "~/Resources/vendors/countupcircle/js/jquery.countupcircle.js",
                  "~/Resources/vendors/bootstraptable/dist/bootstrap-table.js",
                  "~/Resources/vendors/bootstraptable/dist/locale/bootstrap-table-zh-CN.js",
                   "~/Resources/vendors/iCheck/js/icheck.js",
                    "~/Scripts/Custom/WinMsg.js"
                   ));
            // 使用要用于开发和学习的 Modernizr 的开发版本。然后，当你做好
            // 生产准备时，请使用 http://modernizr.com 上的生成工具来仅选择所需的测试。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                       "~/Content/site.css",
                       "~/Resources/css/custom_css/bootstrap_tables.css",
                       "~/Resources/vendors/awesomebootstrapcheckbox/css/awesome-bootstrap-checkbox.css",
                       "~/Resources/css/buttons_sass.css",
                       "~/Resources/vendors/bootstraptable/dist/bootstrap-table.css",
                       "~/Resources/css/custom.css",
                        "~/Resources/css/custom_css/bootstrap_tables.css",
                       "~/Resources/css/layouts.css",
                        "~/Resources/css/custom_css/dashboard1.css",
                       "~/Resources/vendors/hover/css/hover-min.css",
                       "~/Resources/vendors/animate/animate.min.css",
                       "~/Resources/css/custom_css/advanced_modals.css",
                       "~/Resources/css/formelements.css",
                       "~/Scripts/Toastr/toastr.css",
                       "~/Scripts/bootstraptable/dist/bootstrap-table.css"));

        }
    }
}