/************************************
 * 描述：尚未添加描述
 * 作者：吴毅
 * 日期：2015/9/6 15:16:59  
*************************************/

using System.ComponentModel.DataAnnotations;

namespace WYRMS.ViewModel
{
    public class LoginVM
    {
        /// <summary>
        /// 获取或设置 登录账号
        /// </summary>
        [Required(ErrorMessage="用户名不能为空")]
        [Display(Name = "登录账号")]
        [StringLength(20)]
        public string LoginName { get; set; }

        /// <summary>
        /// 获取或设置 登录密码
        /// </summary>
        [Required(ErrorMessage = "登录密码不能为空")]
        [DataType(DataType.Password)]
        [Display(Name = "登录密码")]
        [StringLength(32)]
        public string Password { get; set; }

        /// <summary>
        /// 获取或设置 验证码
        /// </summary>
        [Required(ErrorMessage = "手机验证码不能为空")]
        [Display(Name = "手机验证码")]
        public string Checkcode { get; set; }
    }
}
