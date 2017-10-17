using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WYRMS.ViewModel.Member
{
    /// <summary>
    /// 个人信息
    /// </summary>
    public class PersonalInfoVM
    {
        [Display(Name = "用户ID")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "旧密码")]
        [StringLength(18, MinimumLength = 6, ErrorMessage = "密码长度应在6~18位之间")]
        public string Password { get; set; }

        [Required]
        [Display(Name = "新密码")]
        [StringLength(18, MinimumLength = 6, ErrorMessage = "密码长度应在6~18位之间")]
        public string NewPassword { get; set; }

        [Required]
        [Display(Name = "二次确认")]
        [Compare("NewPassword", ErrorMessage = "两次输入的新密码不相同")]
        [StringLength(18, MinimumLength = 6, ErrorMessage = "密码长度应在6~18位之间")]
        public string ComfirmPassword { get; set; }

    }
}
