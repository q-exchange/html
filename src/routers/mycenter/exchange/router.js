/*
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 11:01:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 11:07:24
 */
export default [{
    path: 'entrust/current',
    name: "entrustCurrent",
    meta: {
        title: "币币管理当前委托"
    },
    component: resolve => require(['@components/uc/EntrustCurrent'], resolve),
}, {
    path: 'entrust/history',
    name: "entrustHistory",
    meta: {
        title: "币币管理历史委托"
    },
    component: resolve => require(['@components/uc/EntrustHistory'], resolve),
},{
    path: 'coinorder',
    name: "coinorder",
    meta: {
        title: "币币订单"
    },
    component: resolve => require(['@components/uc/coinorder'], resolve),
} ]