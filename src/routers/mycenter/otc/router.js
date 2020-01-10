/*
 * @Descripttion: 法币管理路由
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 11:08:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 11:15:25
 */
export default [{
    path: 'ad',
    name: "ad",
    meta: {
        title: "我的广告"
    },
    component: resolve => require(['@components/otc/MyAd'], resolve),
}, {
    path: 'ad/create',
    name: "adCreate",
    meta: {
        title: "添加广告"
    },
    component: resolve => require(['@page/otc/AdPublish'], resolve),
}, {
    path: 'ad/update',
    name: "adUpdate",
    meta: {
        title: "修改广告"
    },
    component: resolve => require(['@page/otc/AdPublish'], resolve),
}, {
    path: 'order',
    name: "order",
    meta: {
        title: "我的订单"
    },
    component: resolve => require(['@components/uc/myorder'], resolve),
}, ]