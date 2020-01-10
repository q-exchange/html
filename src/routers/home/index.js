/*
 * @Description: 首页路由分包
 * @Author: 张志强
 * @Date: 2019-09-06 09:24:12
 * @LastEditTime: 2019-09-06 09:52:43
 * @LastEditors: Please set LastEditors
 */
export default [{
    path: '/',
    name: "index",
    component: resolve => require(['../../pages/index/Index.vue'], resolve),
}, {
    path: '/index',
    name: "index",
    component: resolve => require(['../../pages/index/Index.vue'], resolve),
}];