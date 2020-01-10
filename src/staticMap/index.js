/*
 * @Descripttion:  个人中心左侧菜单配置
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 18:58:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 19:38:44
 */
export const memberCenterMap = new Map([
    ["安全设置", "/uc/safe"],
    ["收款方式", "/uc/account"],
    ["我的推广", "/uc/myextension"],
    ["手续费等级", "/uc/feeLevel"],
    ["个人资产", "/uc/money"],
    ["资产流水", "/uc/record"],
    ["充币", "/uc/recharge"],
    ["提币", "/uc/withdraw"],
    ["积分管理", "/uc/bjc"],
    ["糖果赠送记录", "/uc/giveRecord"],
    ["币币管理当前委托", "/uc/entrust/current"],
    ["币币管理历史委托", "/uc/entrust/history"],
    ["我的广告", "/uc/ad"],
    ["我的订单", "/uc/order"],
    ["IEO管理", "/uc/ieoadmin"],
    ["API管理", "/uc/apiManage"],
    ["杠杆管理当前委托", "/uc/level/current"],
    ["杠杆管理历史委托", "/uc/level/history"]
])
export const memberCenterReverseMap = new Map([
    ["/uc/safe", "安全设置"],
    ["/uc/account", "收款方式"],
    ["/uc/myextension", "我的推广"],
    ["/uc/feeLevel", "手续费等级"],
    ["/uc/money", "个人资产"],
    ["/uc/record", "资产流水"],
    ["/uc/recharge", "充币"],
    ["/uc/withdraw", "提币"],
    ["/uc/bjc", "积分管理"],
    ["/uc/giveRecord", "糖果赠送记录"],
    ["/uc/entrust/current", "币币管理当前委托"],
    ["/uc/entrust/history", "币币管理历史委托"],
    ["/uc/ad", "我的广告"],
    ["/uc/order", "我的订单"],
    ["/uc/ieoadmin", "IEO管理"],
    ["/uc/apiManage", "API管理"],
    ["/uc/level/current", "杠杆管理当前委托"],
    ["/uc/level/history", "杠杆管理历史委托"]
]);

export const memberAllFirstDirMap = new Map([
    ["/uc/safe", "账户管理"],
    ["/uc/account", "账户管理"],
    ["/uc/myextension", "账户管理"],
    ["/uc/feeLevel", "账户管理"],
    ["/uc/money", "资产管理"],
    ["/uc/record", "资产管理"],
    ["/uc/recharge", "资产管理"],
    ["/uc/withdraw", "资产管理"],
    ["/uc/bjc", "资产管理"],
    ["/uc/giveRecord", "资产管理"],
    ["/uc/entrust/current", "币币管理"],
    ["/uc/entrust/history", "币币管理"],
    ["/uc/ad", "法币管理"],
    ["/uc/order", "法币管理"],
    ["/uc/ieoadmin", "IEO管理"],
    ["/uc/apiManage", "API管理"],
    ["/uc/level/current", "杠杆交易管理"],
    ["/uc/level/history", "杠杆交易管理"]
]);

export const linkMap = new Map([
    ["账户管理", "/uc/safe"],
    ["资产管理", "/uc/money"],
    ["币币管理", "/uc/entrust/current"],
    ["法币管理", "/uc/ad"],
    ["IEO管理", "/uc/ieoadmin"],
    ["API管理", "/uc/apiManage"],
    ["杠杆交易管理", "/uc/level/current"],
]);

//首页中文币种
export const symbolZhMap = new Map([
    ["ETH", "以太坊"],
    ["BTC", "比特币"],
    ["EOS", "柚子"],
    ["HT", "火币积分"],
]);

//包含footer1的页面
export const escapeRouter = ["/register", "/login", "/findPwd"];

//header背景色特殊处理
// export const headerBg = ["/exchange","",]