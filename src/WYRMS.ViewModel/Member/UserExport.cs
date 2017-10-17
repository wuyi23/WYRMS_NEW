using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WYRMS.ViewModel.Member
{
    public class UserExport
    {
        [Display(Name = "登录名称")]
        public string UserName { get; set; }

        [Display(Name = "真实姓名")]
        public string TrueName { get; set; }

        [Display(Name = "邮箱")]
        public string Email { get; set; }

        [Display(Name = "电话")]
        public string Phone { get; set; }

        [Display(Name = "地址")]
        public string Address { get; set; }

        [Display(Name = "是否激活")]
        public string Enabled { get; set; }

        [Display(Name = "更新时间")]
        public DateTime UpdateDate { get; set; }
    }
}
