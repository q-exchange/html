/*
 * @Descripttion: 静态配置常量
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-07 11:46:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-07 11:50:11
 */

//切换环境ip
export const HOST = "http://47.74.224.58:8888";

//腾讯防水注册的appID
export const TEBNCENTAPPID = "";

//首页公告配置一行显示两个还是一个,由于屏幕大小限制，暂时只支持1，2两种配置;
export const ADVERSENUM = 4;
//首页公告是否有显示更多的入口
export const ADVERSEMORE = false;

//首页轮播图风格 egg: 1=>代表都是大图显示 2=>代表大的背景图自己放置在本地,x小的是后台上传的;
export const INDEXBANNERSTYLE = 1;

//注册 忘记密码  手机号验证
export const phoneRegExp = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

//注册 忘记密码  邮箱验证
export const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

//svgLine 要用到的空数据
let arr = new Array(25);
export const trendTemp = arr.fill(0);

//是否开启邮箱注册
export const isEmailRegister = false;

//IOS下载地址
export const IOSURL = "https://wangzhanzhaopian.oss-cn-shanghai.aliyuncs.com/app.apk";

//安卓下载地址apk配置
export const ANDROIDURL = "https://wangzhanzhaopian.oss-cn-shanghai.aliyuncs.com/app.apk";

//谷歌验证器使用指南
export const googleUrl = "";

//配置企业邮箱
export const ENTERPRISEEMAIL = "企业邮箱";

//企业版权
export const ENTERPRISECOPYRIGHT = "企业版权信息";

//是否支持windows下载
export const isSupportWindow = false;
export const isSupportMac = false;
export const isSupportIphone = true;
export const isSupportAndro = true;