using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using NPOI;
using NPOI.XSSF.UserModel;

namespace WYRMS.Tools.NPOI
{
    public class ExcelNpoi:IExcelNpoi
    {
        private XSSFWorkbook _wb;

        /// <summary>
        /// 网络中导出 Excel
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="fileName">文件名称（不需要后缀）</param>
        public void HttpExport<T>(IEnumerable<T> source, string fileName = "")
        {
            CreateExcel<T>(source);
            if (string.IsNullOrEmpty(fileName))
                fileName = DateTime.Now.ToString("yyyyMMddHHmmss");
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            HttpContext.Current.Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}.xlsx", fileName));
            _wb.Write(HttpContext.Current.Response.OutputStream);
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
        }

        /// <summary>
        /// 导出文件到本地路径
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="fileName"></param>
        public void FileExport<T>(IEnumerable<T> source, string fileName)
        {
            CreateExcel<T>(source);
            using (var fs = new FileStream(fileName, FileMode.Create, FileAccess.Write))
            {
                _wb.Write(fs);
            }
        }

        /// <summary>
        /// 网路导入文件
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="postedFile"></param>
        /// <returns></returns>
        IEnumerable<T> IExcelNpoi.HttpImport<T>(HttpPostedFileBase postedFile)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 本地路径导入文件
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="fileName"></param>
        /// <returns></returns>
        IEnumerable<T> IExcelNpoi.FileImport<T>(string fileName)
        {
            throw new NotImplementedException();
        }


        #region 私有函数

        private void CreateExcel<T>(IEnumerable<T> source)
        {
            _wb = new XSSFWorkbook();
            var sh = (XSSFSheet)_wb.CreateSheet("Sheet1");

            POIXMLProperties props = _wb.GetProperties();
            props.CoreProperties.Creator = "WYRMS";
            props.CoreProperties.Created = DateTime.Now;

            var properties = typeof(T).GetProperties().ToList();

            //构建表头
            var header = sh.CreateRow(0);
            for (var j = 0; j < properties.Count; j++)
            {
                var display = properties[j].GetCustomAttributes(typeof(DisplayAttribute), true)
                    .Cast<DisplayAttribute>()
                    .FirstOrDefault();
                header.CreateCell(j).SetCellValue(display != null ? display.Name : properties[j].Name);
            }
            var list = source.ToList();

            //填充数据
            for (var i = 0; i < list.Count; i++)
            {
                var r = sh.CreateRow(i + 1);
                for (var j = 0; j < properties.Count; j++)
                {
                    var value = properties[j].GetValue(list[i], null);
                    r.CreateCell(j).SetCellValue(value == null ? "" : value.ToString());
                }
            }
        }
        #endregion
    }
}
