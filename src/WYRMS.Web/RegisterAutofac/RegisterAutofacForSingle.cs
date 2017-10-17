/************************************
 * 描述：尚未添加描述
 * 作者：吴毅
 * 日期：2015/9/6 15:55:34  
*************************************/

using System;
using System.Linq;
using Autofac;
using Autofac.Integration.Mvc;
using System.Reflection;
using System.Web.Compilation;
using System.Web.Mvc;
using WYRMS.CoreBLL.Service;
using WYRMS.DAL;
using WYRMS.DAL.Interfaces;
using WYRMS.Domain.Model;
using WYRMS.Tools.NPOI;

namespace WYRMS.Web
{
    public static class RegisterAutofacForSingle
    {
        public static void RegisterAutofac()
        {
            ContainerBuilder builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly()); //开启了Controller的依赖注入功能,这里使用Autofac提供的RegisterControllers扩展方法来对程序集中所有的Controller一次性的完成注册
            builder.RegisterFilterProvider(); //开启了Filter的依赖注入功能，为过滤器使用属性注入必须在容器创建之前调用RegisterFilterProvider方法，并将其传到AutofacDependencyResolver

            #region IOC注册区域

            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>)).InstancePerHttpRequest();
            builder.RegisterType<ExcelNpoi>().As<IExcelNpoi>().InstancePerHttpRequest();

            var assemblies = BuildManager.GetReferencedAssemblies()
                         .Cast<Assembly>()
                         .Where(a => a.GetTypes().FirstOrDefault(t => t.GetInterfaces().Contains(typeof(IService))) != null)
                         .ToArray();
            builder.RegisterAssemblyTypes(assemblies)
                .Where(t => t.GetInterfaces().Contains(typeof(IService)))
                .AsSelf()
                .InstancePerHttpRequest();
            builder.RegisterType<SysEntities>().AsSelf().InstancePerHttpRequest();
            builder.RegisterType<DbContextFactory>().As<IDbContextFactory>().InstancePerHttpRequest();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerHttpRequest();
            #endregion
            // then
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

        }


    }
}
