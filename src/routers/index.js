/*
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 09:22:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 19:22:05
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let routes = [];
const routerContext = require.context("./", true, /index\.js$/);
routerContext.keys().forEach(router => {
    if (router.startsWith("./index")) {
        return;
    }
    const routeModule = routerContext(router);
    routes = [...routes, ...(routeModule.default || routeModule)]
});
export default new Router({
    mode: 'hash',
    routes,
})