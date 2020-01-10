/*
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 10:13:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-07 09:22:45
 */
export default [{
    path: '/otc',
    name: "otc",
    meta: {
        title: "法币交易"
    },
    component: resolve => require(['@page/otc/Main'], resolve),
    children: [{
        path: 'trade/*',
        component: resolve => require(['@page/otc/Trade'], resolve),
    }]
}, {
    path: '/identbusiness',
    name: "identbusiness",
    meta: {
        title: "成为商家"
    },
    component: resolve => require(['@page/uc/IdentBusiness'], resolve)
}, {
    path: '/otc/tradeInfo', //法币交易页面
    name: 'tradeInfo',
    meta: {
        title: "买入卖出"
    },
    component: resolve => require(['@page/otc/TradeInfo'], resolve),
}, {
    path: '/checkuser', //查询账户法币交易的数据
    name: "checkuser",
    meta: {
        title: "账户"
    },
    component: resolve => require(['@page/otc/CheckUser'], resolve)
}, {
    path: '/chat',
    name: "chat",
    meta: {
        title: "订单详情"
    },
    component: resolve => require(['@page/otc/Chat'], resolve)
}, {
    path:"/otcorder",
    name:"otcorder",
    meta:{
        title:"法币订单"
    },
    component:resolve => require(["@components/uc/myorder"],resolve)
}];