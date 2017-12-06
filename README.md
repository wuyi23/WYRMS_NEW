声明：仅供学习交流技术使用，可转载相关介绍文案，但必须保留源码出处地址，不可在其他网站上传本项目源码（其他网站上传本源码均为侵权，如有发现，请及时联系我）。未经本人同意，不可用于任何商业用途，谢谢合作。如需用与商业用途，请与本人联系qq1226520745。<br/>

本项目是WYRMS的新版本（原codefirst版地址：https://github.com/wuyi23/WYRMS ） ，之前朋友要拿来做项目，为适应开发，我帮他重构代码，数据库改成了dbfirst，UI也换成了收费的了。之前已经征得他同意，我还是开源我做的权限这部分的基础模块，不过我后来又自己重构了，所以可能有bug,哈哈。<br/>
主要变化为以下几点：<br/>
（1）本次数据库使用dbfirst，之前使用的是codefirst。<br/>
（2）重构了仓储类及其他代码逻辑。<br/>
（3）首页菜单存储在h5的localStorage中，刷新仍可选中。<br/>
（4）权限添加服务端验证。<br/>
（5）修复了其他N多bug。<br/>
（6）UI变了（建议大家还是用回我之前免费的AdminLTE，我是懒得改了）<br/>
（7）首页左侧支持多级菜单

使用说明：
数据库在database文件夹里，网站登录用户名：admin，密码：123456，验证码:123456<br/>
Demo演示地址（PC端建议使用Chrome浏览器打开）：http://www.gzuwuyi.cn ，

![image](https://github.com/wuyi23/WYRMS_NEW/blob/master/screenshots/login.png)
![image](https://github.com/wuyi23/WYRMS_NEW/blob/master/screenshots/Index.png)
![image](https://github.com/wuyi23/WYRMS_NEW/blob/master/screenshots/phoneWindows.png)
