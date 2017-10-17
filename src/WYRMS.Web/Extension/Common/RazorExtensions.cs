using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web;
using System.Web.Mvc;
using WYRMS.Tools.Extensions;

namespace System.Web.Mvc.Html
{
    public static class RazorExtensions
    {

        /// <summary>
        /// 日期控件（用法： @Html.CalendarFor(model => model.UpdateDate, "开始时间", 0)）
        /// </summary>
        /// <typeparam name="TModel"></typeparam>
        /// <typeparam name="TProperty"></typeparam>
        /// <param name="helper"></param>
        /// <param name="expression"></param>
        /// <param name="placeholder"></param>
        /// <param name="formatType">0 - YYYY-MM-DD, 1 - YYYY-MM-DD HH:mm, 2 - YYYY-MM-DD HH:mm:ss , 3-HH:mm:ss，4-YYYY-MM</param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <param name="defaultDate"></param>
        /// <param name="htmlAttributes"></param>
        /// <returns></returns>
        public static MvcHtmlString CalendarFor<TModel, TProperty>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TProperty>> expression, string placeholder = "", int formatType = 0,
            DateTime? startDate = null, DateTime? endDate = null, DateTime? defaultDate = null, object htmlAttributes = null)
        {
            string value = string.Empty;
            string format = "YYYY-MM-DD HH:mm:ss";
            string csFormat = "yyyy-MM-dd HH:mm:ss";
            int inputWidth = 201;
            KeyValuePair<string, string> kv = GetExpressionValue(helper, expression);


            switch (formatType)
            {
                case 0:
                    format = "YYYY-MM-DD";
                    csFormat = "yyyy-MM-dd";
                    inputWidth = 150;
                    break;
                case 1:
                    format = "YYYY-MM-DD HH:mm";
                    csFormat = "yyyy-MM-dd HH:mm";
                    break;
                case 2:
                    format = "YYYY-MM-DD HH:mm:ss";
                    csFormat = "yyyy-MM-dd HH:mm:ss";
                    break;
                case 3:
                    format = "HH:mm:ss";
                    csFormat = "HH:mm:ss";
                    inputWidth = 150;
                    break;
                case 4:
                    format = "YYYY-MM";
                    csFormat = "yyyy-MM";
                    inputWidth = 150;
                    break;
                case 5:
                    format = "HH:mm";
                    csFormat = "HH:mm";
                    inputWidth = 150;
                    break;
            }
            if (defaultDate.HasValue)
            {
                value = defaultDate.Value.ToString(csFormat);
            }
            if (!string.IsNullOrEmpty(kv.Value))
            {
                //DateTime date;
                //value = DateTime.TryParse(kv.Value, out date) ? date.ToString(csFormat) : kv.Value;

                var valueTime = kv.Value.TryDateTime();
                value = (valueTime == null || valueTime == DateTime.MinValue) ? "" : valueTime.Value.ToString(csFormat);
            }

            string id = Guid.NewGuid().ToString();
            StringBuilder options = new StringBuilder();
            StringBuilder builder = new StringBuilder();

            if (startDate.HasValue)
            {
                options.AppendFormat("minDate: '{0}',", startDate.Value.ToString(csFormat));
            }
            if (endDate.HasValue)
            {
                options.AppendFormat("maxDate: '{0}'", endDate.Value.ToString(csFormat));
            }

            options.AppendFormat("format: '{0}',", format);
            options.Append("showTodayButton: true, showClear: true");

            builder.AppendLine(string.Format("<div class='input-group' style='width: {0}px;' >", inputWidth));

            // 判断时间字段是否为可空，如果不为空加上required验证标签
            var typeName = expression.Body.Type.FullName;
            var verifyTag = typeName == "System.DateTime" ? "data-val='true' data-val-required='时间不能为空'" : "";

            builder.AppendLine(string.Format(
                "<input type='text'  class='form-control' name='{0}' value='{1}' placeholder='{2}' id='{3}' {4} ",
                kv.Key, value, placeholder, id, verifyTag));


            if (htmlAttributes != null)
            {
                var htmlAttrArray = htmlAttributes.GetType().GetProperties();
                foreach (var item in htmlAttrArray)
                {
                    var val = item.GetValue(htmlAttributes, null);
                    builder.AppendFormat(" {0}=\"{1}\" ", item.Name, val);
                }
            }
            builder.Append(" />");
            builder.AppendLine("<span class='input-group-addon'>");
            builder.AppendLine("<span class='glyphicon glyphicon-calendar'></span>");
            builder.AppendLine("</span>");
            builder.AppendLine("</div>");
            builder.AppendFormat("<script type=\"text/javascript\">$(function () {{$('#{0}').datetimepicker({{ {1} }});}});</script>", id, options.ToString());

            return new MvcHtmlString(builder.ToString());
        }


        /// <summary>
        /// 枚举下拉框
        /// </summary>
        /// <typeparam name="TModel"></typeparam>
        /// <typeparam name="TProperty"></typeparam>
        /// <param name="htmlHelper"></param>
        /// <param name="expression"></param>
        /// <param name="enumType">枚举</param>
        /// <param name="optionLabel">默认空项文本</param>
        /// <param name="htmlAttributes">自定义html属性</param>
        /// <returns></returns>
        public static MvcHtmlString SelectEnumFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, Type enumType, string optionLabel = null, object htmlAttributes = null)
        {
            var modelProperty = GetExpressionValue(htmlHelper, expression);

            var displayName = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData).DisplayName;
            // 判断下拉框选项是否为可空，如果不为空加上required验证标签
            var typeName = expression.Body.Type.FullName;
            var verifyTag = typeName == "System.Int32" ?
                string.Format("data-val='true' data-val-required='{0}字段是必需的'", displayName) : "";
            var builder = new StringBuilder();
            builder.AppendFormat("<select name={0} id={0} {1} ", modelProperty.Key, verifyTag).AppendLine();
            if (htmlAttributes != null)
            {
                var htmlAttrArray = htmlAttributes.GetType().GetProperties();
                foreach (var item in htmlAttrArray)
                {
                    var val = item.GetValue(htmlAttributes, null);
                    builder.AppendFormat(" {0}=\"{1}\" ", item.Name, val);
                }
            }
            builder.Append(">");
            if (!string.IsNullOrEmpty(optionLabel))
                builder.AppendFormat("<option value=\"\">{0}</option>", optionLabel).AppendLine();
            var arry = Enum.GetValues(enumType);
            foreach (var item in arry)
            {
                builder.AppendFormat("<option {0} value={1}>{2}</option>", modelProperty.Value == ((int)item).ToString() ? "selected=\"selected\"" : "", ((int)item).ToString(), item.ToString());
            }
            builder.AppendLine("</select>");

            return new MvcHtmlString(builder.ToString());
        }


        #region 私有函数
        /// <summary>
        /// 返回属性的名称和值
        /// </summary>
        /// <typeparam name="TModel"></typeparam>
        /// <typeparam name="TProperty"></typeparam>
        /// <param name="expression"></param>
        /// <returns></returns>
        private static KeyValuePair<string, string> GetExpressionValue<TModel, TProperty>(HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            var key = ExpressionHelper.GetExpressionText(expression);
            var modelValue = ModelMetadata.FromLambdaExpression<TModel, TProperty>(expression, htmlHelper.ViewData).Model;

            TProperty value = modelValue == null ? default(TProperty) : (TProperty)modelValue;
            return new KeyValuePair<string, string>(key, Convert.ToString(value));
        }
        #endregion
    }
}