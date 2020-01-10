/*
 * @Descripttion: 个人中心总路由
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 10:32:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 19:19:22
 */
let routes = [];
const routerContext = require.context("./", true, /router\.js$/);
routerContext.keys().forEach(router => {
    if (router.startsWith("./index")) {
        return;
    }
    const routeModule = routerContext(router);
    routes = [...routes, ...(routeModule.default || routeModule)]
});
export default [{
    path: '/uc',
    component: resolve => require(['@page/uc/MemberCenter'], resolve),
    children: routes
}];