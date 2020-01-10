/*
 * @Descripttion: 暂时废弃的路由 挖矿
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 19:50:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-07 09:16:08
 */
export default [{
        path: 'trade',
        // component: trade,
        component: resolve => require(['../components/uc/MinTrade'], resolve),
    }, {
        path: 'invitingmining',
        // component: invitingmining,
        component: resolve => require(['../components/uc/InvitingMin'], resolve),
    }, {
        path: 'paydividends', //持币分红
        component: resolve => require(['../components/uc/PayDividends'], resolve),
    }, {
        path: 'blc', //锁仓
        // component: meblc,
        component: resolve => require(['../components/uc/Blc'], resolve),
    }, {
        path: '/blc', //币理财
        component: resolve => require(['../pages/blc/Bilicai'], resolve)
    },
    {
        path: '/bjc', //币竞猜
        component: resolve => require(['../pages/bjc/Bijingcai'], resolve)
    },
]