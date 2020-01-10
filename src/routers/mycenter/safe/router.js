/*
 * @Descripttion: 账户管理
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 10:30:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 19:24:44
 */
export default [{
    path: '',
    name: "safe",
    meta: {
        title: "安全设置"
    },
    component: resolve => require(['@components/uc/Safe'], resolve),
}, {
    path: 'safe',
    name: "safe",
    meta: {
        title: "安全设置"
    },
    component: resolve => require(['@components/uc/Safe'], resolve),
}, {
    path: 'account',
    name: "account",
    meta: {
        title: "收款方式"
    },
    component: resolve => require(['@components/uc/Account'], resolve),
}, {
    path: 'myextension',
    name: "myextension",
    meta: {
        title: "我的推广"
    },
    component: resolve => require(['@components/uc/MyExtension'], resolve),
}, {
    path: 'feeLevel',
    name: "feeLevel",
    meta: {
        title: "手续费等级"
    },
    component: resolve => require(['@components/uc/FeeLevel.vue'], resolve),
}, {
    path: 'realname',
    name: "realname",
    meta: {
        title: "身份认证"
    },
    component: resolve => require(['@components/uc/realname.vue'], resolve),
}]