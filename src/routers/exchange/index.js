/*
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 10:10:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 10:12:18
 */
export default [{
    path: '/exchange',
    name: "exchange",
    meta: {
        title: "币币交易"
    },
    component: resolve => require(['@page/exchange/exchange'], resolve)
}, {
    path: '/exchange/*',
    name: "exchange",
    meta: {
        title: "币币交易"
    },
    component: resolve => require(['@page/exchange/exchange'], resolve)
}, ]