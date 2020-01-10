/*
 * @Description: 帮助的路由
 * @Author: 张志强
 * @Date: 2019-09-06 09:59:06
 * @LastEditTime: 2019-09-06 10:03:27
 * @LastEditors: sueRimn
 */
export default [{
    path: '/helplist',
    name: "helplist",
    meta: {
        title: "帮助中心"
    },
    component: resolve => require(['@page/cms/HelpList'], resolve)
}, {
    path: '/helpdetail',
    name: "helpdetail",
    meta: {
        title: "帮助详情"
    },
    component: resolve => require(['@page/cms/HelpDetail'], resolve)
}, ]