/*
 * @Description: uc部分的路由
 * @Author: 张志强
 * @Date: 2019-09-06 09:44:36
 * @LastEditTime: 2019-09-06 09:53:47
 * @LastEditors: Please set LastEditors
 */
export default [{
    path: '/login', //登录
    name: "login",
    meta: {
        title: "登录"
    },
    component: resolve => require(['@page/uc/login'], resolve)
}, {
    path: '/register', //注册
    name: "register",
    meta: {
        title: "注册"
    },
    component: resolve => require(['@page/uc/register'], resolve)
}, {
    path: '/findPwd', //忘记密码
    name: "findPwd",
    meta: {
        title: "忘记密码"
    },
    component: resolve => require(['@page/uc/findpwd'], resolve)
}];