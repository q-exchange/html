/*
 * @Descripttion: 谷歌验证器开关的路由
 * @version: 0.0.1
 * @Author: 张志强
 * @Date: 2019-09-07 09:08:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-07 09:15:04
 */
export default [{
        path: "/closeGoogleval",
        name: "closegoogleVali",
        meta: {
            title: "关闭谷歌验证器"
        },
        component: resolve => require(['@page/google/CloseGoogleVali.vue'], resolve)
    },
    {
        path: "/openGoogleVali",
        name: "resetgooglevali",
        meta: {
            title: "开启谷歌验证器"
        },
        component: resolve => require(['@page/google/ResetGoogleVali.vue'], resolve)
    },
]