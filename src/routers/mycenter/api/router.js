/*
 * @Descripttion: api路由
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 19:29:26
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 19:30:17
 */
export default [{
    path: 'apiManage',
    name: "apiManage",
    meta: {
        title: "API管理"
    },
    component: resolve => require(['@components/uc/apiManage'], resolve),
}]