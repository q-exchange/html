/*
 * @Descripttion: 
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 10:04:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 10:09:44
 */
export default [{
        path: '/notice',
        name: "notice",
        meta: {
            title: "公告列表",
        },
        component: resolve => require(['@page/cms/Notice'], resolve)
    },
    {
        path: '/notice/index',
        name: "noticeIndex",
        meta: {
            title: "公告详情"
        },
        component: resolve => require(['@page/cms/NoticeItem'], resolve)
    },
];