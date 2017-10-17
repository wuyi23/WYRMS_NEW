using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WYRMS.Tools.NPOI
{
     public interface  IExcelNpoi
    {
        void FileExport<T>(IEnumerable<T> source, string fileName);
        IEnumerable<T> HttpImport<T>(System.Web.HttpPostedFileBase postedFile) where T : new();
        void HttpExport<T>(IEnumerable<T> source, string fileName = "");
        IEnumerable<T> FileImport<T>(string fileName) where T : new();
    }
}
